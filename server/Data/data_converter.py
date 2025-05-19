import json
import ast
import re

def convert_json_format(input_file, output_file):
    # Read input file line by line (each line is a JSON object)
    recipes = []
    with open(input_file, 'r') as file:
        for line in file:
            if line.strip():  # Skip empty lines
                recipes.append(json.loads(line))
    
    transformed_recipes = []
    
    # Define default values and mappings for categories and cuisines
    default_values = {
        "category": "Main Dish",
        "cuisine": "American",
        "prepTime": 15,
        "cookTime": 30,
        "totalTime": 45,
        "servings": 4
    }
    
    # Category detection keywords
    category_keywords = {
        "Side Dish": ["potato", "potatoes", "side"],
        "Dessert": ["cake", "cookie", "sweet", "dessert", "chocolate"],
        "Appetizer": ["appetizer", "starter", "snack"],
        "Breakfast": ["breakfast", "omelette", "pancake"],
        "Drink": ["cocktail", "drink", "toddy", "bourbon", "wine", "cider", "margarita", "sherry"],
        "Pasta": ["pasta", "macaroni", "spaghetti", "noodle"],
        "Salad": ["salad", "slaw"],
        "Soup": ["soup", "stew"],
    }
    
    # Cuisine detection keywords
    cuisine_keywords = {
        "Italian": ["italian", "pasta", "pizza", "parmigiano", "marinara"],
        "Mexican": ["mexican", "taco", "tortilla", "salsa", "tequila"],
        "Asian": ["asian", "soy sauce", "ginger", "miso", "sesame"],
        "Indian": ["indian", "curry", "masala", "haleem", "dal"],
        "French": ["french", "baguette", "croissant"],
        "Mediterranean": ["mediterranean", "olive oil", "feta"],
        "Southern": ["southern", "grits", "biscuit"],
    }
    
    for recipe in recipes:
        title = recipe.get("Title", "")
        ingredients_str = recipe.get("Cleaned_Ingredients", recipe.get("Ingredients", "[]"))
        instructions = recipe.get("Instructions", "")
        image_name = recipe.get("Image_Name", "")
        
        # Parse ingredients from string representation of list to actual list
        try:
            ingredients = ast.literal_eval(ingredients_str)
        except (SyntaxError, ValueError):
            # If parsing fails, make a basic attempt to extract items
            ingredients = [ing.strip() for ing in ingredients_str.strip("[]").split("',") if ing.strip()]
            ingredients = [ing.strip("' ") for ing in ingredients]
        
        # Split instructions into steps
        instruction_steps = []
        for step in re.split(r'\n+', instructions):
            if step.strip():
                instruction_steps.append(step.strip())
        
        # Determine category based on keywords
        category = default_values["category"]  # Default
        title_and_ingredients = title.lower() + " " + " ".join(str(i).lower() for i in ingredients)
        
        for cat, keywords in category_keywords.items():
            if any(keyword in title_and_ingredients for keyword in keywords):
                category = cat
                break
                
        # Determine cuisine based on keywords
        cuisine = default_values["cuisine"]  # Default
        for cuis, keywords in cuisine_keywords.items():
            if any(keyword in title_and_ingredients for keyword in keywords):
                cuisine = cuis
                break
        
        # Generate tags
        tags = []
        # Add category as tag
        tags.append(category.lower())
        
        # Add cuisine as tag if not American
        if cuisine != "American":
            tags.append(cuisine.lower())
            
        # Add ingredient-based tags
        common_ingredients = ["chicken", "beef", "pork", "fish", "vegetable", "pasta", 
                             "potato", "rice", "cheese", "tomato", "herb", "spicy"]
        
        for ingredient in common_ingredients:
            if ingredient in title_and_ingredients:
                tags.append(ingredient)
                
        # Add method tags
        cooking_methods = ["roast", "grill", "bake", "fry", "saute", "slow cook", "simmer"]
        for method in cooking_methods:
            if method in instructions.lower():
                tags.append(method.replace(" ", ""))
                
        # Add dietary tags
        if all(meat not in title_and_ingredients for meat in ["chicken", "beef", "pork", "lamb", "turkey", "fish"]):
            tags.append("vegetarian")
            
        # Add special tags for drinks
        if category == "Drink":
            tags.append("cocktail")
            if "bourbon" in title_and_ingredients:
                tags.append("bourbon")
            if "tequila" in title_and_ingredients:
                tags.append("tequila")
        
        # Create the transformed recipe object
        transformed_recipe = {
            "_id": recipe.get("_id", {"$oid": ""}),
            "recipeId": int(recipe.get("", 0)) + 1,  # Use the empty key value as recipeId
            "title": title,
            "category": category,
            "cuisine": cuisine,
            "prepTime": default_values["prepTime"],
            "cookTime": default_values["cookTime"],
            "totalTime": default_values["prepTime"] + default_values["cookTime"],
            "servings": default_values["servings"],
            "ingredients": ingredients,
            "instructions": instruction_steps,
            "imageName": image_name,
            "tags": list(set(tags))  # Remove duplicates
        }
        
        transformed_recipes.append(transformed_recipe)
    
    # Write the transformed recipes to the output file
    with open(output_file, 'w') as file:
        json.dump(transformed_recipes, file, indent=2)
    
    print(f"Transformation complete! {len(transformed_recipes)} recipes processed.")
    print(f"Output saved to {output_file}")

# Example usage
if __name__ == "__main__":
    convert_json_format("recipes.json", "transformed_recipes.json")