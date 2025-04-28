const app = require('./app')

test('Home page loads correctly', () => {
    expect(app.add('1')).toBe("This is the main page");
  });

test('404 Error', () => {
    expect(app.add('1')).toBe("Page not found");
  });

test('About page loads correctly', () => {
    expect(app.add('1')).toBe("This is the about page");
  });

test('Recipe page loads correctly', () => {
    expect(app.add('1')).toBe("recipes-sample.csv");
  });