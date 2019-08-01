//  Created by react-native-create-bridge

#import "KalleoBridge.h"
#import "AppDelegate.h"

@implementation KalleoBridge
@synthesize bridge = _bridge;

- (void) registerTwilioAccessToken:(NSString *) token
{
  NSString *deviceToken = [[NSUserDefaults standardUserDefaults] valueForKey:@"deviceToken"];
  
  [[TwilioVoice sharedInstance] registerWithAccessToken:token
                                  deviceToken:deviceToken
                                   completion:^(NSError *error) {
                                     if (error) {
                                       NSLog(@"An error occurred while registering: %@", [error localizedDescription]);
                                     }
                                     else {
                                       NSLog(@"Successfully registered for VoIP push notifications.");
                                     }
                                   }];
}

- (void)didConnected:(NSNotification *)notification {
  NSDictionary *userInfo = notification.userInfo;
  NSString *from = [userInfo objectForKey:@"from"];
  [self emitMessageToRN:@"Connected" : @{@"status": @1, @"callerId": from}];
}

- (void)didDisconnected:(NSNotification *)notification {
  [self emitMessageToRN:@"Disconnected" : @{@"status": @1}];
}

- (void)didReceiveIncomingCall:(NSNotification *)notification {
  NSLog(@"Fire didReceiveIncomingCall");
  NSDictionary *userInfo = notification.userInfo;
  NSString *from = [userInfo objectForKey:@"from"];
  NSString *sid = [userInfo objectForKey:@"sid"];
  NSLog(@"from: %@", from);
  NSLog(@"sid: %@", sid);
  [self emitMessageToRN:@"IncomingCall" : @{@"callerId": from, @"twilioSid": sid}];
}

- (void)startObserving
{
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(didConnected:)
                                               name:@"Connected"
                                             object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(didDisconnected:)
                                               name:@"Disconnected"
                                             object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(didReceiveIncomingCall:)
                                               name:@"didReceiveIncomingCall"
                                             object:nil];
}

#pragma mark - Native Module

// Export a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html
RCT_EXPORT_MODULE();

// Export methods to a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html

// initiateNative functionality
RCT_EXPORT_METHOD(initiateNative: (NSString *) token)
{
  NSLog(@"plugin initialize");
  [[TwilioVoice sharedInstance] setLogLevel:TVOLogLevelVerbose];
  [self registerTwilioAccessToken:token];
  [self startObserving];
}

// Hang Up Call
RCT_EXPORT_METHOD(hangUp)
{
  AppDelegate *appDelegate=( AppDelegate* )[UIApplication sharedApplication].delegate;
  
  if (appDelegate.call && appDelegate.call.state == TVOCallStateConnected) {
    [appDelegate.call disconnect];
  }
}

// Toggle Speaker
RCT_EXPORT_METHOD(toggleSpeaker)
{
  NSError *error = nil;
  AVAudioSession *session = [AVAudioSession sharedInstance];
  AVAudioSessionRouteDescription *currentRoute = [session currentRoute];

  for (AVAudioSessionPortDescription *output in currentRoute.outputs) {
    if([output.portType isEqualToString:@"Speaker"]) {
        [session  overrideOutputAudioPort:AVAudioSessionPortOverrideNone error:&error];
    } else {
        [session  overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:&error];
    }
  }
}

// Toggle Mute
RCT_EXPORT_METHOD(toggleMute)
{
  AppDelegate *appDelegate=( AppDelegate* )[UIApplication sharedApplication].delegate;
  
  if (appDelegate.call && appDelegate.call.state == TVOCallStateConnected) {
    if(appDelegate.call.isMuted) {
      appDelegate.call.muted = false;
    } else {
      appDelegate.call.muted = true;
    }
  }
}

// List all your events here
// https://facebook.github.io/react-native/releases/next/docs/native-modules-ios.html#sending-events-to-javascript
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"IncomingCall", @"Connected", @"Disconnected"];
}

#pragma mark - Private methods

// Implement methods that you want to export to the native module
- (void) emitMessageToRN: (NSString *)eventName :(NSDictionary *)params {
  // The bridge eventDispatcher is used to send events from native to JS env
  // No documentation yet on DeviceEventEmitter: https://github.com/facebook/react-native/issues/2819
  [self sendEventWithName: eventName body: params];
}

@end
