## Testing

To guarantee the quality of our product, we are writing unit tests with wide coverage. Since our project uses Node.js, we are using **Jest**, a JavaScript testing framework for unit tests. Our goal is to test a range of scenarios including valid inputs, edge cases, and manual use cases where needed.

We are currently focusing on testing features like searching for recipes by ingredient. In the future, we plan to expand to additional features such as bookmarking and saving recipes.

---

### Testing Tools Used

- **Jest**: JavaScript testing framework for Node.js
- Configured using `jest.config.js`
- Tests are placed in `filterRecipes.test.js` under the `utils/` folder

---

### Location of Tests

- Filtering Logic: `utils/filterRecipes.js`
- Jest Tests: `utils/filterRecipes.test.js`
- Config: `jest.config.js`

---

### Running the Tests

To run all tests, first ensure dependencies are installed:

```bash
npm install


### Implemented Automated Tests
These tests are defined in filterRecipes.test.js:

filters recipes by ingredient
Confirms filtering logic returns the correct recipe when an ingredient is present.

returns empty if no recipes match
Verifies an empty array is returned if no recipes match the provided ingredient.

matches ingredients regardless of case
Checks that input is treated in a case-insensitive manner.

returns empty array if ingredient is empty
Ensures an empty string input returns an empty array.

returns empty array if ingredient is null
Ensures a null input is handled safely by returning an empty array.

📝 List of Unimplemented Tests (Planned Future Tests)
We plan to add the following tests to increase our coverage:

API Endpoint Tests:

 Verify that /api/search returns the correct filtered recipes based on the query.

 Verify that /api/search returns an empty array when no query is provided.

 Verify that /api/recipes returns the full list of recipes from the database.

Frontend/UI Tests:

 Test that recipe cards render correctly after fetching from the API.

 Verify that the filtering options on the recipes page work as expected.

Additional Functionality:

 Tests for the bookmark/save functionality.

 Tests for dietary filter features (vegan, gluten-free, etc.) when implemented.

 Validation for the data cleaning process (if/when we replace CSV with MongoDB).

🧍 Manual Testing Script
Until we fully automate front-end testing, manual tests are defined as follows:

Search Feature Manual Test
Open your browser and navigate to:

bash
Copy
Edit
http://localhost:3500/search
Enter an ingredient (e.g., chicken) in the input field and click Search.

Verify that you are redirected to /searchResult and that the correct recipe results are displayed.

Enter an ingredient in uppercase (e.g., CHICKEN) and verify the results remain consistent (confirming case insensitivity).

Enter an invalid ingredient (e.g., asdf) and ensure that no results are shown.

Submit an empty input to verify that the application does not crash and returns no results.

Recipes Page Manual Test
Navigate to:

bash
Copy
Edit
http://localhost:3500/recipes
Verify that all recipes load as expected.

If any filtering options are implemented, test that applying a filter correctly refines the recipe list.
