# UI automated tests
This project contains code for user interface (UI) automated tests made
 with Node.js, Selenium, Mocha and Chai for the login feature of [this website](https://www.saucedemo.com/). 
 The project follows a simplified version of the [screenplay pattern implemented by the Serenity/JS test automation
 framework](https://serenity-js.org/handbook/design/screenplay-pattern.html).
 Tests can run locally on Unix based systems, like Linux or macOS, and Windows. A screenshot will be saved
 automatically if a test fails. Test cases are described in the `test_cases.txt` file.

## Requirements

You must have Google Chrome 92, Firefox 60 or higher, Node.js 16.7.0 and npm 7.20.3
 installed on your system to run the tests.

## Instructions to run the tests
1. On the directory you pulled this project off, install the required dependencies with
 `npm i`.
1. To run the tests with Chrome, run `npm run test:chrome`.
1. To run the tests with Firefox, run `npm run test:firefox`.
1. To generate an XML report after the test execution, run `npm run test:xml`. The default browser
is Chrome, but if you want to generate a report running the tests with Firefox, configure the 
`npm_config_browser=` variable with `firefox`. The full command will be `npm_config_browser=firefox npm run test:xml`.