package com.kalleonative.kalleobridge;

import android.app.ActivityManager;
import android.content.Intent;
import android.view.WindowManager;

import static android.content.Context.ACTIVITY_SERVICE;

import com.facebook.react.bridge.ReactApplicationContext;
import com.kalleonative.MainActivity;
import com.twilio.voice.CallInvite;

import java.util.List;


public class ApplicationManager {

    public int getApplicationImportance(ReactApplicationContext context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(ACTIVITY_SERVICE);
        if (activityManager == null) {
            return 0;
        }
        List<ActivityManager.RunningAppProcessInfo> processInfos = activityManager.getRunningAppProcesses();
        if (processInfos == null) {
            return 0;
        }

        for (ActivityManager.RunningAppProcessInfo processInfo : processInfos) {
            if (processInfo.processName.equals(context.getApplicationInfo().packageName)) {
                return processInfo.importance;
            }
        }
        return 0;
    }

    public Intent getLaunchIntent(ReactApplicationContext context, CallInvite callInvite) {
        Intent launchIntent = new Intent(context, MainActivity.class);

        int launchFlag = Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP;

        launchIntent.setAction(KalleoBridgeModule.ACTION_INCOMING_CALL)
                .addFlags(
                        launchFlag +
                                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED +
                                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD +
                                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON +
                                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                );

        if (callInvite != null) {
            launchIntent.putExtra(KalleoBridgeModule.INCOMING_CALL_INVITE, callInvite);
        }
        return launchIntent;
    }
}
