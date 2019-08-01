package com.kalleonative.kalleobridge.fcm;

import android.app.ActivityManager;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import com.kalleonative.kalleobridge.ApplicationManager;
import com.twilio.voice.CallInvite;
import com.twilio.voice.MessageException;
import com.twilio.voice.MessageListener;
import com.twilio.voice.Voice;

import com.kalleonative.kalleobridge.KalleoBridgeModule;

import java.util.Map;

// Inspired by https://github.com/hoxfon/react-native-twilio-programmable-voice

public class VoiceFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = "VoiceFCMService";
    private ApplicationManager applicationManager;

    @Override
    public void onCreate() {
        super.onCreate();
        applicationManager = new ApplicationManager();
    }

    /**
     * Called when message is received.
     *
     * @param remoteMessage Object representing the message received from Firebase Cloud Messaging.
     */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "Received onMessageReceived()");
        Log.d(TAG, "Bundle data: " + remoteMessage.getData());
        Log.d(TAG, "From: " + remoteMessage.getFrom());

        // Check if message contains a data payload.
        if (remoteMessage.getData().size() > 0) {
            Map<String, String> data = remoteMessage.getData();
            Voice.handleMessage(this, data, new MessageListener() {
                @Override
                public void onCallInvite(final CallInvite callInvite) {
                    Handler handler = new Handler(Looper.getMainLooper());
                    handler.post(new Runnable() {
                        public void run() {
                            ReactInstanceManager mReactInstanceManager = ((ReactApplication) getApplication()).getReactNativeHost().getReactInstanceManager();
                            ReactContext context = mReactInstanceManager.getCurrentReactContext();

                            if (context != null) {
                                boolean launch_background = false;
                                int appImportance = applicationManager.getApplicationImportance((ReactApplicationContext) context);
                                Intent launchIntent = applicationManager.getLaunchIntent((ReactApplicationContext) context, callInvite);
                                if (appImportance != ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                                    launchIntent.putExtra(KalleoBridgeModule.BACKGROUND_LAUNCH, true);
                                    context.startActivity(launchIntent);
                                    launch_background = true;
                                }
                                VoiceFirebaseMessagingService.this.sendCallInviteToActivity((ReactApplicationContext) context, callInvite, launch_background);
                            } else {
                                // Otherwise wait for construction, then handle the incoming call
                                mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                                    public void onReactContextInitialized(ReactContext context) {
                                        Intent launchIntent = applicationManager.getLaunchIntent((ReactApplicationContext) context, callInvite);
                                        context.startActivity(launchIntent);
                                        VoiceFirebaseMessagingService.this.sendCallInviteToActivity((ReactApplicationContext) context, callInvite, true);
                                    }
                                });
                                if (!mReactInstanceManager.hasStartedCreatingInitialContext()) {
                                    // Construct it in the background
                                    Log.d(TAG, "Create react instance in the background");
                                    mReactInstanceManager.createReactContextInBackground();
                                }
                            }
                        }
                    });
                }

                @Override
                public void onError(MessageException messageException) {
                    Log.e(TAG, messageException.getLocalizedMessage());
                }
            });
        }
    }


    /*
     * Send the CallInvite to the VoiceActivity
     */
    private void sendCallInviteToActivity(ReactApplicationContext context, CallInvite callInvite, boolean launch_background) {
        Intent intent = new Intent(KalleoBridgeModule.ACTION_INCOMING_CALL);
        intent.putExtra(KalleoBridgeModule.INCOMING_CALL_INVITE, callInvite);
        intent.putExtra(KalleoBridgeModule.BACKGROUND_LAUNCH, launch_background);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }
}
