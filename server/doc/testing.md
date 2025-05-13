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
