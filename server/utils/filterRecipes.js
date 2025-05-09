function filterRecipes(recipes, ingredient) {
    if (!ingredient || ingredient.trim() === '') {
      return [];
    }
    
    const lowerCaseIngredient = ingredient.toLowerCase();
  
    return recipes.filter(recipe =>
      recipe['Cleaned_Ingredients']?.toLowerCase().includes(lowerCaseIngredient)
    );
  }
  
  module.exports = filterRecipes;
  