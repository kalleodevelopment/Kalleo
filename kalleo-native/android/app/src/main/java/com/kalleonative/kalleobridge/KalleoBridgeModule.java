//  Created by react-native-create-bridge

package com.kalleonative.kalleobridge;

import java.util.HashMap;

import android.app.Activity;
import android.support.annotation.Nullable;
import android.util.Log;
import android.support.v4.content.LocalBroadcastManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.iid.FirebaseInstanceId;

import com.twilio.voice.Call;
import com.twilio.voice.CallException;
import com.twilio.voice.CallInvite;
import com.twilio.voice.RegistrationException;
import com.twilio.voice.RegistrationListener;
import com.twilio.voice.Voice;

public class KalleoBridgeModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {
    public static final String REACT_CLASS = "KalleoBridge";
    public static final String TAG = "KalleoBridge";
    private static ReactApplicationContext reactContext = null;

    private static String accessToken = "Access Token";

    private boolean isReceiverRegistered = false;
    private VoiceBroadcastReceiver voiceBroadcastReceiver;

    public static final String INCOMING_CALL_INVITE = "INCOMING_CALL_INVITE";
    public static final String ACTION_INCOMING_CALL = "ACTION_INCOMING_CALL";
    public static final String ACTION_FCM_TOKEN = "ACTION_FCM_TOKEN";
    public static final String BACKGROUND_LAUNCH = "BACKGROUND_LAUNCH";

    private CallInvite activeCallInvite;
    private Call activeCall;
    private RegistrationListener registrationListener = registrationListener();
    private Call.Listener callListener = callListener();

    private AudioManager audioManager;
    private int savedAudioMode = AudioManager.MODE_INVALID;

    private static RingtonePlayer player;

    private Boolean callAccepted = false;

    private Boolean launchFromBackground = false;

    public KalleoBridgeModule(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);
        reactContext = context;

        reactContext.addActivityEventListener(this);
        reactContext.addLifecycleEventListener(this);

        voiceBroadcastReceiver = new VoiceBroadcastReceiver();
        registerReceiver();

        audioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
        player = new RingtonePlayer(reactContext);
    }

    @Override
    public String getName() {
        // Tell React the name of the module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        return REACT_CLASS;
    }

    @Override
    public void onHostResume() {
        Log.d(TAG,"Host Resume");
        getCurrentActivity().setVolumeControlStream(AudioManager.STREAM_VOICE_CALL);
        registerReceiver();
    }

    @Override
    public void onHostPause() {
        Log.d(TAG, "Host Pause");
        // We don't want to unregisterReceiver because we want app to listen to incoming call in background.
        // unregisterReceiver();
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {}

    public void onNewIntent(Intent intent) {
        // This is called only when the App is in the foreground
        Log.d(TAG, "onNewIntent " + intent.getExtras());
        handleIncomingCallIntent(intent);
    }

    private void registerReceiver() {
        if (!isReceiverRegistered) {
            IntentFilter intentFilter = new IntentFilter();
            intentFilter.addAction(ACTION_INCOMING_CALL);
            LocalBroadcastManager.getInstance(reactContext).registerReceiver(voiceBroadcastReceiver, intentFilter);
            isReceiverRegistered = true;
        }
    }

    private void unregisterReceiver() {
        if (isReceiverRegistered) {
            LocalBroadcastManager.getInstance(reactContext).unregisterReceiver(voiceBroadcastReceiver);
            isReceiverRegistered = false;
        }
    }

    private RegistrationListener registrationListener() {
        return new RegistrationListener() {
            @Override
            public void onRegistered(String accessToken, String fcmToken) {
                Log.d(TAG, "Successfully registered FCM " + fcmToken);
            }

            @Override
            public void onError(RegistrationException error, String accessToken, String fcmToken) {
                String message = String.format("Registration Error: %d, %s", error.getErrorCode(), error.getMessage());
                Log.e(TAG, message);
            }
        };
    }

    private Call.Listener callListener() {
        return new Call.Listener() {
            @Override
            public void onConnected(Call call) {
                setAudioFocus(true);
                Log.d(TAG, "Connected");
                activeCall = call;
                HashMap<String, String> map = new HashMap<>();
                map.put("status", "1");
                map.put("callerId", getCallerId(call.getFrom()));
                sendData("Connected", map);
            }

            @Override
            public void onDisconnected(Call call, CallException error) {
                setAudioFocus(false);
                callAccepted = false;
                activeCall = null;
                Log.d(TAG, "Disconnected");
                HashMap<String, String> map = new HashMap<>();
                map.put("status", "1");
                if (error != null) {
                    String message = String.format("Call Error: %d, %s", error.getErrorCode(), error.getMessage());
                    Log.e(TAG, message);
                    map.put("error", message);
                }
                sendData("Disconnected", map);
            }
        };
    }

    @Override
    public void onHostDestroy() {
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        // A method for emitting from the native side to JS
        // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    private class VoiceBroadcastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(ACTION_INCOMING_CALL)) {
                handleIncomingCallIntent(intent);
            } else {
                Log.e(TAG, "received broadcast unhandled action " + action);
            }
        }
    }

    private void handleIncomingCallIntent(Intent intent) {
        if (intent != null && intent.getAction() != null) {
            if (intent.getAction().equals(ACTION_INCOMING_CALL)) {
                activeCallInvite = intent.getParcelableExtra(INCOMING_CALL_INVITE);
                launchFromBackground = intent.getBooleanExtra(BACKGROUND_LAUNCH, false);
                if (activeCallInvite != null && (activeCallInvite.getState() == CallInvite.State.PENDING)) {
                    callAccepted = false;
                    HashMap<String, String> map = new HashMap<>();
                    map.put("callerId", getCallerId(activeCallInvite.getFrom()));
                    map.put("twilioSid", activeCallInvite.getCallSid());
                    sendData("IncomingCall", map);
                    player.playRingtone();
                    if (getReactApplicationContext().getCurrentActivity() != null) {
                        Window window = getReactApplicationContext().getCurrentActivity().getWindow();
                        window.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);
                        window.addFlags(WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
                    }
                } else {
                    player.stopRingtone();
                    if (activeCall == null) {
                        if (activeCallInvite != null) {
                            if (!callAccepted) {
                                HashMap<String, String> map = new HashMap<>();
                                map.put("status", "1");
                                sendData("Disconnected", map);
                            }
                        }
                    }
                }
            } else if (intent.getAction().equals(ACTION_FCM_TOKEN)) {
                registerForCallInvites();
            }
        }
    }

    /*
     * Register your FCM token with Twilio to receive incoming call invites
     *
     * If a valid google-services.json has not been provided or the FirebaseInstanceId has not been
     * initialized the fcmToken will be null.
     *
     * In the case where the FirebaseInstanceId has not yet been initialized the
     * VoiceFirebaseInstanceIDService.onTokenRefresh should result in a LocalBroadcast to this
     * activity which will attempt registerForCallInvites again.
     *
     */
    private void registerForCallInvites() {
        final String fcmToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG,"registerFor");
        if (fcmToken != null) {
            Log.i(TAG, "Registering with FCM");
            Voice.register(getReactApplicationContext(), accessToken, fcmToken, registrationListener);
        }
    }

    private void setAudioFocus(boolean setFocus) {
        if (audioManager != null) {
            if (setFocus) {
                savedAudioMode = audioManager.getMode();
                // Request audio focus before making any device switch.
                audioManager.requestAudioFocus(null, AudioManager.STREAM_VOICE_CALL,
                        AudioManager.AUDIOFOCUS_GAIN_TRANSIENT);

                /*
                 * Start by setting MODE_IN_COMMUNICATION as default audio mode. It is
                 * required to be in this mode when playout and/or recording starts for
                 * best possible VoIP performance. Some devices have difficulties with speaker mode
                 * if this is not set.
                 */
                audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
            } else {
                audioManager.setMode(savedAudioMode);
                audioManager.abandonAudioFocus(null);
            }
        }
    }

    private void sendData(String event, HashMap<String, String> map) {
        WritableNativeMap data = new WritableNativeMap();
        for (HashMap.Entry<String, String> entry : map.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            data.putString(key, value);
        }
        emitDeviceEvent(event, data);
    }

    @ReactMethod
    public void initiateNative(String token) {
        accessToken = token;
        registerForCallInvites();
    }

    @ReactMethod
    public void answer() {
        callAccepted = true;
        player.stopRingtone();
        activeCallInvite.accept(reactContext, callListener);
    }

    @ReactMethod
    public void hangUp() {
        callAccepted = false;
        if (activeCall != null) {
            activeCall.disconnect();
            activeCall = null;
        }
        removeActivity();
    }

    @ReactMethod
    public void reject() {
        callAccepted = false;
        player.stopRingtone();
        if (activeCallInvite != null) {
            activeCallInvite.reject(getReactApplicationContext());
        }
        HashMap<String, String> map = new HashMap<>();
        map.put("status", "1");
        sendData("Disconnected", map);
        removeActivity();
    }

    @ReactMethod
    public void toggleSpeaker() {
        if (audioManager.isSpeakerphoneOn()) {
            audioManager.setSpeakerphoneOn(false);
        } else {
            audioManager.setSpeakerphoneOn(true);
        }
    }

    @ReactMethod
    public void toggleMute() {
        if (audioManager.isMicrophoneMute()) {
            audioManager.setMicrophoneMute(false);
        } else {
            audioManager.setMicrophoneMute(true);
        }
    }

    private void removeActivity() {
        if (launchFromBackground) {
            getCurrentActivity().finish();
        }
    }

    private String getCallerId(String from) {
        String callerId = from.replace("client:","");
        callerId = callerId.replace("_"," ");
        return callerId;
    }
}
