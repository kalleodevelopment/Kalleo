[![Build Status](https://travis-ci.com/poetic/kalleo-native.svg?token=PYcRj3Zqb2D6A4pLqBZX&branch=master)](https://travis-ci.com/poetic/kalleo-native)

# kalleo-native

React Native app for kalleo. [Server](https://github.com/poetic/kalleo-app-server) powered by Meteor, GraphQL, and Apollo.

## Folder Structure

```
android/
ios/
index.ios.js            // entry point for iOS
index.android.js        // entry point for Android
src/
  components/
    ComponentName/
      redux/
        index.js
        mapStateToProps.js
        mapDispatchToProps.js
      index.js
      styles.js         // specific to components
  config/               // Configurations for GraphQL, Push Notifications etc.
  containers/           // Redux containers -- Boyscouting & moving Redux into component directory
  constants/
  fonts/
  graphql/              // GraphQL Queries, Mutations, and Subscriptions
  helpers/
  images/
  redux/                // Reducers and actions
  routes/               // Navigation
  styles/
    colors.js
    container.js        // styles that should be applied to containers
```


## Getting Started

1. Install [React Native](http://facebook.github.io/react-native/)

2. Clone Repo

  ```
  g clone git@github.com:poetic/kalleo-native.git
  cd kalleo-native
  ```

3. Visit [kalleo Official Project Setup](https://github.com/poetic/kalleo-app-server/wiki/Project-Setup) for additional setup instructions

## Versioning

### Version Number

Following the guidelines outlined in [Semantic Versioning 2.0.](http://semver.org/)

> Given a version number MAJOR.MINOR.PATCH, increment the:
> > MAJOR version when you make incompatible API changes,
> &nbsp;
>
> > MINOR version when you add functionality in a backwards-compatible manner, and
> &nbsp;
>
> > PATCH version when you make backwards-compatible bug fixes.

### Build Number

A version can have one or more builds. Each build number should be incremdented by 1.

### Git Tags - OUTDATED

Each build will need to be tagged to the appropriate version and build numbers. Staging tags should be added on the `development` branch. Production tags should be added to the `master` branch.

## Environments

kalleo uses [react-native-config](https://github.com/luggit/react-native-config) to handle environment variables. All enviornment variables are defined in `.env.[environment-name]`. Android is ready to go with out any additional changes. When running on iOS you will need to select the correct schema for the desired environment.

### Local

`.env.local`

iOS Scheme: KalleoNative - Local

### Staging

`.env.staging`

iOS Scheme: KalleoNative - Staging

### Production

`.env.production`

iOS Scheme: KalleoNative - Production

## Run on iOS

1. Open Xcode project

  ```
   open ios/KalleoNative.xcodeproj
  ```

2. Select the target schema for the environment you want to run.

3. Select the device you want to test on.

  Note: if you want to run on your device and not the simulator you must have the provisioning profiles downloaded from your [Apple Developer]() account.

4. Click run button (&#9658;) or press &#x2318;-r

## Run on Android

1. Open project in Android Studio

2. Click run button (&#9658;) or press &#x2318;-r

3. Select the emulator you want to run or have an Android device plugged in via USB

## Developer Menu

React Native gives developers a handy menu to enable/disable features like Hot Code Reloading.

### iOS

To open while running on a device simulator hit &#x2318;-d

To open while running on your device, shake the device

### Android

To open while running on a the emulator hit &#x2318;-m

## Roadmap

- [ ] Show examples of git tagging for repo
