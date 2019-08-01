package com.kalleonative.kalleobridge;

import android.media.MediaPlayer;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by chuongle on 8/4/17.
 */

public class RingtonePlayer {

    private static ReactApplicationContext reactContext = null;
    private static MediaPlayer player;

    public RingtonePlayer(ReactApplicationContext context) {
        reactContext = context;
        player = MediaPlayer.create(reactContext, Settings.System.DEFAULT_RINGTONE_URI);
    }

    public void playRingtone() {
        if(player != null) {
            player.start();
        } else {
            player = MediaPlayer.create(reactContext, Settings.System.DEFAULT_RINGTONE_URI);
            player.start();
        }
    }

    public void stopRingtone() {
        if(player != null) {
            player.stop();
            player.release();
            player = null;
        }
    }
}
