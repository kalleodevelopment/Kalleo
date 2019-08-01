/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTPushNotificationManager.h>
#import <Analytics/SEGAnalytics.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <Firebase/Firebase.h>
#import <Rollbar/Rollbar.h>

@implementation AppDelegate

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"KalleoNative"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  self.voipRegistry = [[PKPushRegistry alloc] initWithQueue:dispatch_get_main_queue()];
  self.voipRegistry.delegate = self;
  self.voipRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];

  [self configureCallKit];

  // Segment Analytics
  SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"DUp5Zcj66PDKGHXtPjDuVBRN0dpTryw7"];
  configuration.trackApplicationLifecycleEvents = YES; // Enable this to record certain application events automatically!
  configuration.recordScreenViews = YES; // Enable this to record screen views automatically!
  [SEGAnalytics setupWithConfiguration:configuration];
  // Segment Analytics End

  // Facebook Analtyics
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  // Google Analytics
  [FIRApp configure];


  // Rollbar
  [Rollbar initWithAccessToken:@"98b25d6b97294e1b81abb186c5ee1b66"];

  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  NSLog(@"User Info : %@",notification.request.content.userInfo);
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

#pragma mark - PKPushRegistryDelegate
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(NSString *)type {
  NSLog(@"pushRegistry:didUpdatePushCredentials:forType:");

  if ([type isEqualToString:PKPushTypeVoIP]) {
    self.deviceTokenString = [credentials.token description];
    [[NSUserDefaults standardUserDefaults] setValue:self.deviceTokenString forKey:@"deviceToken"];
    [[NSUserDefaults standardUserDefaults] synchronize];
  }
}

- (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type {
  NSLog(@"pushRegistry:didInvalidatePushTokenForType:");
}

- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(NSString *)type {
  NSLog(@"pushRegistry:didReceiveIncomingPushWithPayload:forType:");
  [[TwilioVoice sharedInstance] handleNotification:payload.dictionaryPayload
                                          delegate:self];
}

- (void)configureCallKit {
  CXProviderConfiguration *configuration = [[CXProviderConfiguration alloc] initWithLocalizedName:@"kalleo"];
  configuration.maximumCallGroups = 1;
  configuration.maximumCallsPerCallGroup = 1;
  UIImage *callkitIcon = [UIImage imageNamed:@"iconMask80"];
  configuration.iconTemplateImageData = UIImagePNGRepresentation(callkitIcon);

  _callKitProvider = [[CXProvider alloc] initWithConfiguration:configuration];
  [_callKitProvider setDelegate:self queue:nil];

  _callKitCallController = [[CXCallController alloc] init];
}

- (void)dealloc {
  if (self.callKitProvider) {
    [self.callKitProvider invalidate];
  }
}

#pragma mark - TVONotificationDelegate
- (void)callInviteReceived:(TVOCallInvite *)callInvite {
  NSLog(@"callInviteReceived:");

  [Rollbar infoWithMessage:@"callInviteReceived"];

  if (self.callInvite && self.callInvite == TVOCallInviteStatePending) {
    NSLog(@"Already a pending incoming call invite.");

    [Rollbar infoWithMessage:@"Already a pending incoming call invite."];

    NSLog(@"  >> Ignoring call from %@", callInvite.from);
    return;
  } else if (self.call) {
    NSLog(@"Already an active call.");

    [Rollbar infoWithMessage:@"Already a pending incoming call invite."];

    NSLog(@"  >> Ignoring call from %@", callInvite.from);
    return;
  }

  self.callInvite = callInvite;

  [self reportIncomingCallFrom:callInvite.from withUUID:callInvite.uuid withSID:callInvite.callSid];
}

- (void)callInviteCanceled:(TVOCallInvite *)callInvite {
  NSLog(@"callInviteCanceled:");

  [self performEndCallActionWithUUID:callInvite.uuid];

  self.callInvite = nil;
}

- (void)notificationError:(NSError *)error {
  NSLog(@"notificationError: %@", [error localizedDescription]);
}

#pragma mark - TVOCallDelegate
- (void)callDidConnect:(TVOCall *)call {
  NSLog(@"callDidConnect:");

  NSString *callerId = [self getCallerId:call.from];
  NSString *callSid = call.sid;

  [Rollbar infoWithMessage:@"Call did connect" data:@{@"callerId": callerId, @"callSid": callSid}];

  NSDictionary *callInfo = @{@"from":callerId};
  [[NSNotificationCenter defaultCenter] postNotificationName:@"Connected"
                                                      object:self
                                                    userInfo:callInfo];
  self.call = call;
}

- (void)callDidDisconnect:(TVOCall *)call {
  NSLog(@"callDidDisconnect:");
  [self performEndCallActionWithUUID:call.uuid];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"Disconnected" object:self];
  self.call = nil;
}

- (void)call:(TVOCall *)call didFailWithError:(NSError *)error {
  NSString *callSid = call.sid;

  [Rollbar criticalWithMessage:@"Call failed with error" data:@{@"error": error, @"call": callSid}];

  NSLog(@"call:didFailWithError: %@", [error localizedDescription]);

  [self performEndCallActionWithUUID:call.uuid];

  self.call = nil;
}

#pragma mark - CXProviderDelegate
- (void)providerDidReset:(CXProvider *)provider {
  NSLog(@"providerDidReset:");
}

- (void)providerDidBegin:(CXProvider *)provider {
  NSLog(@"providerDidBegin:");
}

- (void)provider:(CXProvider *)provider didActivateAudioSession:(AVAudioSession *)audioSession {
  NSLog(@"provider:didActivateAudioSession:");

  [[TwilioVoice sharedInstance] startAudioDevice];
}

- (void)provider:(CXProvider *)provider didDeactivateAudioSession:(AVAudioSession *)audioSession {
  NSLog(@"provider:didDeactivateAudioSession:");

  [[TwilioVoice sharedInstance] audioSessionDeactivated];
}

- (void)provider:(CXProvider *)provider timedOutPerformingAction:(CXAction *)action {
  NSLog(@"provider:timedOutPerformingAction:");
}

- (void)provider:(CXProvider *)provider performAnswerCallAction:(CXAnswerCallAction *)action {
  NSLog(@"provider:performAnswerCallAction:");

  // RCP: Workaround from https://forums.developer.apple.com/message/169511 suggests configuring audio in the
  //      completion block of the `reportNewIncomingCallWithUUID:update:completion:` method instead of in
  //      `provider:performAnswerCallAction:` per the WWDC examples.
  // [[TwilioVoice sharedInstance] configureAudioSession];

  self.call = [self.callInvite acceptWithDelegate:self];
  if (self.call) {
    self.call.uuid = [action callUUID];
  }

  self.callInvite = nil;

  [action fulfill];
}

- (void)provider:(CXProvider *)provider performEndCallAction:(CXEndCallAction *)action {
  NSLog(@"provider:performEndCallAction:");

  [[TwilioVoice sharedInstance] stopAudioDevice];

  if (self.callInvite && self.callInvite.state == TVOCallInviteStatePending) {
    [self.callInvite reject];
    self.callInvite = nil;
  } else if (self.call) {
    [self.call disconnect];
  }

  [action fulfill];
}

- (void)reportIncomingCallFrom:(NSString *) from withUUID:(NSUUID *)uuid withSID:(NSString *)sid {
  NSString *callerId = [self getCallerId:from];
  CXHandle *callHandle = [[CXHandle alloc] initWithType:CXHandleTypeGeneric value:callerId];

  CXCallUpdate *callUpdate = [[CXCallUpdate alloc] init];
  callUpdate.remoteHandle = callHandle;
  callUpdate.supportsDTMF = YES;
  callUpdate.supportsHolding = NO;
  callUpdate.supportsGrouping = NO;
  callUpdate.supportsUngrouping = NO;
  callUpdate.hasVideo = NO;

  [self.callKitProvider reportNewIncomingCallWithUUID:uuid update:callUpdate completion:^(NSError *error) {
    if (!error) {
      NSLog(@"Incoming call successfully reported.");

      [Rollbar infoWithMessage:@"Incoming call successfully reported" data:@{@"callerId": callerId, @"sid": sid}];

      NSDictionary *callInfo = @{@"from":callerId,@"sid": sid};

      [[NSNotificationCenter defaultCenter] postNotificationName:@"didReceiveIncomingCall"
                                                          object:self
                                                        userInfo:callInfo];

      // RCP: Workaround per https://forums.developer.apple.com/message/169511
      [[TwilioVoice sharedInstance] configureAudioSession];
    }
    else {
      NSLog(@"Failed to report incoming call successfully: %@.", [error localizedDescription]);
    }
  }];
}

- (NSString *) getCallerId:(NSString *) from {
  NSString *callerId = [from stringByReplacingOccurrencesOfString:@"client:" withString:@""];
  callerId = [callerId stringByReplacingOccurrencesOfString:@"_" withString:@" "];
  return callerId;
}
- (void)performEndCallActionWithUUID:(NSUUID *)uuid {
  if (uuid == nil) {
    return;
  }

  CXEndCallAction *endCallAction = [[CXEndCallAction alloc] initWithCallUUID:uuid];
  CXTransaction *transaction = [[CXTransaction alloc] initWithAction:endCallAction];

  [self.callKitCallController requestTransaction:transaction completion:^(NSError *error) {
    if (error) {
      NSLog(@"EndCallAction transaction request failed: %@", [error localizedDescription]);
    }
    else {
      NSLog(@"EndCallAction transaction request successful");
    }
  }];
}


@end
