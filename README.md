# Cypress-Drill4J example integration

This repository demonstrates how to enable Drill4J statistics collection during Cypress tests runs.
> Note that this example does not cover how to enable statistics collection for frontend JavaScript execution

It is based on default cypress installation.

## Changes overview

Package `@drill4j/js-auto-test-agent` is a thin API wrapper that communicates with Drill4J backend

All Drill4J intergration code is placed in `cypress/support/drill-integration.js` file.

1. In `before` hook instance of `@drill4j/js-auto-test-agent` is created. That starts a test "session" that serves as a container for all tests in Drill4J admin panel.

2. In `beforeEach` hook `cy.intercept` is used to inject `drill-session-id` and `drill-test-name` headers, which allow Drill4J Java Agent to recognize requests coming from the specific test runs.

3. In `afterEach` hook info about each test name, duration and status is sent to Drill4J admin backend.

4. In `after` hook `@drill4j/js-auto-test-agent` instance is terminated, which finishes a test session in Drill4J environment.

## How to run the example

> Prerequisites: [Node](https://nodejs.org/en/) and [Docker](https://www.docker.com/) are installed

1. Install dependencies

    ```terminal
    npm install
    ```

2. Run Drill4J services

    ```terminal
    docker-compose -f drill-services.yml up -d
    ```

3. Run and register the Scala sample application

    4.1 Run

      ```terminal
      docker-compose -f scala-spring-app.yml up -d
      ```

    4.2 Open Drill4J Admin Panel at [localhost:8091](http://localhost:8091)

    4.3 Login as guest

    4.4 Press "Register"

    4.5 Click through Step 1 and Step 2. **Make sure to enable** test2code plugin at Step 3

5. Run Cypress and launch tests

  ```
  ./node_modules/.bin/cypress open
  ```

6. Check Drill4J Admin Panel at [localhost:8091](http://localhost:8091) to see coverage
