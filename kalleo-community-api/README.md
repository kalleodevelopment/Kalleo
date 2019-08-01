# kalleo Community API

Public API used by [kalleo mobile app](https://www.kalleoapp.com/) for retrieving spam phone number information. Powered by Express, Mongo, and Apollo.

## Installation/Configuration

1. Clone the repo:

   ```
   git clone git@github.com:poetic/kalleo-community-api.git
   cd kalleo-community-api
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. IMPORTANT: Ask one of the developers to send you a `.env` file to place at the project root for environment configuration. Most processes will not work without this.

## Start Up

1. Start the Mongo database:

   ```
   mongod
   ```

2. Start the Node server in a separate terminal:

   ```
   npm run dev
   ```

## Project Structure

```
src/
  auth/                           Authentication with JWT, Mongo, and Twilio
  carriers/                       Phone carrier retrieval (via Google Sheet CSV)
  content/                        Hardcoded content (e.g., text messages)
  db/                             Mongo models, mutations, and queries
  graphql/                        GraphQL types, mutations, queries, resolver maps, helpers, etc.
  listings/                       Listings CRUD, identification, and lookups
  logging/                        Logging and error handling with winston and Rollbar
  config.js                       Server configuration
  index.js                        Entry point for server
```
