# Overview

Note that i haven't used any permanent data store within the applicaion.

## Getting started

1. This project requires node engine > `14.xx.xx`
1. Run `yarn install`
1. Populate a `.env` file with necessary environment variables, refer `.env.example`. (Optional)
1. Run `yarn dev` to start development

## Environment variables

| Variable                           | Default       | Description                                                                                        |
| ---------------------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                         | `development` | Environment of the application, accapted values are `development`, `production`, `staging`, `test` |
| `MAX_POSIBLE_ANSWERS_PER_QUESTION` | `10`          | This field is added for demonstration purposes                                                     |

## Scripts in package.json

-   `start` Will spin-up the server in production mode.
-   `build` Builds the project for production mode.
-   `build:dev` Builds the project for development with hotmodule replacement
-   `dev` Starts dev server + watch for files to restart on changes
-   `watch` Runs webapck in watch mode (mostly used by `dev` script)
-   `nodemon` Runs the dev server. it's used by `dev` script.
-   `lint` Exports eslint command and requries a file/dir path to lint
-   `test` Runs jest tests
-   `test:watch` Runs jest tests in watch mode

## Deployment

This application keeps data within its state. Therefore, it cannot be scaled horizontally. The application has to be extended to use an external datastore in order to mkae it scalable.

Since the application utilizes repository pattern, developers can easily add an external datastore by just changing the repository class.

## Endpoints

| Endpoint                   | Method | Request                                                                           | Example Response                                                                                                                                                                                                                                                | Description                      |
| -------------------------- | ------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `/health`                  | GET    |                                                                                   |                                                                                                                                                                                                                                                                 | Returns service readiness data   |
| `/survey`                  | POST   | `{ "question": "What is your fav color", "answers": [ "red", "green", "blue" ] }` | `{ "surveyId": "9220e83f-172c-4853-8718-4b32e6b3adfb", "question": "What is your fav color", "answers": [ { "answerId": 0, "value": "red" }, { "answerId": 1, "value": "green" }, { "answerId": 2, "value": "blue" } ] }`                                       | Creates a survey                 |
| `/survey/:surveyId`        | GET    |                                                                                   | `{ "surveyId": "9220e83f-172c-4853-8718-4b32e6b3adfb", "question": "What is your fav color", "answers": [ { "answerId": 0, "value": "red" }, { "answerId": 1, "value": "green" }, { "answerId": 2, "value": "blue" } ] }`                                       | Get survey data                  |
| `/survey/:surveyId/answer` | POST   | `{ "answerId": 2 }`                                                               | `{ "message": "Your answer has been recorded!" }`                                                                                                                                                                                                               | Provides an answer to a survey   |
| `/survey/:surveyId/result` | GET    |                                                                                   | `{ "surveyId": "9220e83f-172c-4853-8718-4b32e6b3adfb", "question": "What is your fav color", "result": [ { "answerId": 0, "value": "red", "result": 0 }, { "answerId": 1, "value": "green", "result": 0 }, { "answerId": 2, "value": "blue", "result": 1 } ] }` | Get survey data with its results |

## Tech Debts

-   Add bunyan logger, and update services/logger.
-   Add neccessery logs throught the application.
-   Add more unit tests to improve coverage.
-   Add badges for test status, test coverage and application version.

## Todo

-   Add a datastore. Idealy MongoDB or Redis.
-   Add Swagger/OpenAPI as an API document.
