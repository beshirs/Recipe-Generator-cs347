function filterRecipes(recipes, ingredient) {
    if (!ingredient) return [];
    ingredient = ingredient.toLowerCase();
    return recipes.filter(recipe =>
      recipe.Cleaned_Ingredients.toLowerCase().includes(ingredient)
    );
  }
  
  module.exports = filterRecipes;
  