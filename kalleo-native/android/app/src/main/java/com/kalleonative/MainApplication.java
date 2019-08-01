package com.kalleonative;

import android.app.Application;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.oblador.vectoricons.VectorIconsPackage;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.appsee.reactnative.AppseeReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.kalleonative.kalleobridge.KalleoBridgePackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.segment.analytics.Analytics;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeContacts(),
            new VectorIconsPackage(),
            new FIRAnalyticsPackage(),
            new AppseeReactPackage(),
          new ReactNativePushNotificationPackage(),
          new ReactNativeConfigPackage(),
          new KalleoBridgePackage(),
          new RNImmediatePhoneCallPackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // Create an analytics client with the given context and Segment write key.
    Analytics analytics = new Analytics.Builder(getApplicationContext(), "LF9tXnU6Owo61VgxNVnQI9xGYgVG1SkA")
      // Enable this to record certain application events automatically!
      .trackApplicationLifecycleEvents()
      // Enable this to record screen views automatically!
      .recordScreenViews()
      .build();

    // Set the initialized instance as a globally accessible instance.
    Analytics.setSingletonInstance(analytics);

    // Facebook SDK
    FacebookSdk.sdkInitialize(getApplicationContext());

    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
  }
}
