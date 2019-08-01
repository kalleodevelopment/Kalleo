# Projects

1. kalleo-native: React Native app
2. kalleo-app-server: Meteor App
3. kalleo-community-api: Express Server
4. kalleo-postgres-sync

# iOS Certificates 
VoIP Services for com.kalleoapp.kalleo - This can be downloaded from Kalleo Communications LLC. Apple developer account. If you do not have access to this account, please ask Kristy.

# ngrok

Provides a secure URL to your localhost server.

** You can skip this step if you already have ngrok set up ** 

1. Download [ngrok](https://ngrok.com/download).

2. Move executable to any folder of your choice. Since it is not project specific, I keep mine on my Desktop for easy access.

3. Connect your account by adding your auth token

    ```
    ./ngrok authtoken [auth token]
    ```
4. Edit your ngrok (`~/.ngrok2/.ngrok.yml`) config file to set up kalleo-app-server and kalleo-community-api tunnels.

    Example ngrok Config
    
    ```yml
    authtoken: [auth token]
    tunnels:
      kalleo-server:
        proto: http
        addr: 3000
      kalleo-community:
        proto: http
        addr: 3030
    ```
    
5. Open a terminal window and change directories to where you stored ngrok and start the tunnels

    ```
    ./ngrok start kalleo-server kalleo-community-api
    ```

## Caveats

1. Each time you restart ngrok a new URL will be generated for you. This will require you to update each environment file and Twilio (see [Twilio](#twilio)) 
    
# Twilio
  
Each kalleo user is assigned a separate Twilio phone number to forward their cell phone number to. Each Twilio number is configured with a webhook (Voice URL) that is pointed to the kalleo server.

For local development and testing purposes, each developer should purchase a single phone number and configure the Voice URL to their ngrok URL.

When purchasing a new number for local development the "Friendly Name" should be set to **LOCAL: Forwarding Number [NUMBER] ([DEVELOPER NAME])** so the team can identify who is using what number.

# Environment Variables

Environment variables for all repo's live at the root of the project in a `.env` file. These are not tracked by Git, please reach out to another developer on the team to get. 

The following environment variables need to be updated before you can run the project locally.

## kalleo-native

| Variable                     | Description            
|:-------------                |:-------------
| `GRAPHQL_ENDPOINT`           | `kalleo-app-server` GraphQL URL - should be set to the ngrok URL with the GraphQL path (e.g. `https://[generate ngrok url].ngrok.io/graphql`)
| `SUBSCRIPTION_WEBSOCKET_URL` | Websocket URL for your GraphQL server (e.g `wss://[generate ngrok url].ngrok.io/subscriptions`)

## kalleo-app-server

| Variable                              | Description            
|:-------------                         |:-------------
| `DEV_ROOT_URL`                        | `kalleo-app-server` ngrok URL (e.g. `https://[generate ngrok url].ngrok.io`)
| `FEEDBACK_EMAIL_RECIPIENT`            | Email address to receive feedback emails (for local development this should be set to the developers email address)
| `KALLEO_COMMUNITY_URI`                | `kalleo-community-api` GraphQL URL - should be set to the ngrok URL with the GraphQL path (e.g. `https://[generate ngrok url].ngrok.io/graphql`)
| `TWILIO_TEST_FORWARDING_PHONE_NUMBER` | Twilio phone number configured to `kalleo-app-server` ngrok URL (see [Twilio](#twilio))

## kalleo-community-api

| Variable       | Description
|:----------     |:-----------
| `DEV_ROOT_URL` | `kalleo-community-api` ngrok URL (e.g. `https://[generate ngrok url].ngrok.io`)

# Inital Project Setup

Run `./setup.sh` from the root directory

# And finally... running kalleo!

kalleo uses [concurrently](https://www.npmjs.com/package/concurrently) to run multiple commands concurrently. Run the following command at the root of the project.

```
yarn start
```

This script will start Mongo, the Meteor server, React Native, and the community API. Each command is color-coded in the terminal window so you identify where the output is coming from.

&nbsp;

# Project Setup Roadmap

- [ ] Install MongoDB instructions
- [ ] Set up service like Vault to encrypt env files to make it easier when onboarding new team members
- [ ] Run locally on iOS
- [ ] Run locally on Android

