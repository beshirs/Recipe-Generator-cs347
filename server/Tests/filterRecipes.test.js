//tests to makes sure it finds correct recipes based on ingredient
const filterRecipes = require('../utils/filterRecipes');

test('filters recipes by ingredient', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' },
    { Title: 'Beef Stew', Cleaned_Ingredients: 'beef, carrots' }
  ];

  const result = filterRecipes(recipes, 'chicken');
  expect(result).toEqual([
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ]);
});

//tests to make sure it correctly handles when there is no match(empty)
test('returns empty if no recipes match', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, 'beef');
  expect(result).toEqual([]);
});

//tests for case insensitivity
test('matches ingredients regardless of case', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, 'CHICKEN');
  expect(result).toEqual([{ Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }]);
});

//tests for empty list
test('returns empty array if ingredient is empty', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, '');
  expect(result).toEqual([]);
});

//tests for null input
test('returns empty array if ingredient is null', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, null);
  expect(result).toEqual([]);
});

test('filters recipes by ingredient', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' },
    { Title: 'Beef Stew', Cleaned_Ingredients: 'beef, carrots' }
  ];

  const result = filterRecipes(recipes, 'chicken');
  expect(result).toEqual([
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ]);
});

//tests to make sure it correctly handles when there is no match(empty)
test('returns empty if no recipes match', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, 'beef');
  expect(result).toEqual([]);
});

//tests for case insensitivity
test('matches ingredients regardless of case', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, 'CHICKEN');
  expect(result).toEqual([{ Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }]);
});

//tests for empty list
test('returns empty array if ingredient is empty', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, '');
  expect(result).toEqual([]);
});

//tests for null input
test('returns empty array if ingredient is null', () => {
  const recipes = [
    { Title: 'Chicken Soup', Cleaned_Ingredients: 'chicken, broth' }
  ];
  const result = filterRecipes(recipes, null);
  expect(result).toEqual([]);
});
