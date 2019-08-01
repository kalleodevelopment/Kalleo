# kalleo App Server

GraphQL server for [kalleo mobile app](https://github.com/poetic/kalleo-native). Powered by Meteor, Mongo, and Apollo. 

## Installation/Configuration

1. Install [Meteor](https://www.meteor.com/install) if you don't have it already.

2. Clone the repo:

   ```
   git clone git@github.com:poetic/kalleo-app-server.git
   cd kalleo-app-server
   ```

3. Install dependencies:

   ```
   meteor npm install
   ```

4. IMPORTANT: Ask one of the developers to send you the `.env` and `settings-dev.json` files to place at the project root for environment configuration. Most processes will not work without these.

## Start Up

1. Start the [kalleo Community](https://github.com/poetic/kalleo-community-api) server.

2. Start the app server:

   ```
   npm run dev
   ```

## Project Structure

```
client/
  main.html                         HTML template for client
  main.js                           Entry point for client
imports/
  client/
    apollo/                         Apollo client and mutations
    components/                     React components
    containers/                     React/Redux containers
    helpers/                        Miscellaneous client helpers
    redux/                          Redux actions, reducers, and store
    styles/                         CSS styles
    config.js                       Client configuration
    index.js                        Client startup (render React app)
  server/
    auth/                           Authentication with JWT, Mongo, and Twilio
    community/                      Apollo connection to kalleo Community API
    content/                        Hardcoded content (e.g., text messages)
    db/                             Mongo models, mutations, and queries
    email/                          Email service
    graphql/                        GraphQL types, mutations, queries, pubsub, helpers, etc.
    logging/                        Logging and error handling with winston and Rollbar
    phone/                          Phone route handlers, activation/deactivation, and Twilio tools
    seeding/                        Database seeding
    config.js                       Server configuration
    index.js                        Server startup (connect to DB, create GraphQL servers, and define routes)
server/
  main.js                           Entry point for server
```

## Authentication

The GraphQL server uses [jwt-mongo-sms](https://github.com/poetic-labs/jwt-mongo-sms) for authenticating requests.
