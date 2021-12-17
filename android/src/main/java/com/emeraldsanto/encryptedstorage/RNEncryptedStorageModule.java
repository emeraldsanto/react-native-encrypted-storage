package com.emeraldsanto.encryptedstorage;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKey;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.ReadableMap;

public class RNEncryptedStorageModule extends ReactContextBaseJavaModule {

    private static final String NATIVE_MODULE_NAME = "RNEncryptedStorage";

    private SharedPreferences sharedPreferences;
    private MasterKey masterKey;

    private String getStorageName(ReadableMap options) {
      String bundleId = this.getReactApplicationContext().getPackageName();
      String storageName = options.hasKey("storageName") ?
        options.getString("storageName") : bundleId;
      return storageName;
    }

    private void createSharedPreferences(ReadableMap options) {
      ReactContext reactContext = this.getReactApplicationContext();
      String storageName = this.getStorageName(options);

      try {
        this.sharedPreferences = EncryptedSharedPreferences.create(
          reactContext,
          storageName,
          this.masterKey,
          EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
          EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        );
      } catch (Exception ex) {
        Log.e(NATIVE_MODULE_NAME, "Failed to create encrypted shared preferences! Failing back to standard SharedPreferences", ex);
        this.sharedPreferences = reactContext.getSharedPreferences(storageName, Context.MODE_PRIVATE);
      }
    }

    public RNEncryptedStorageModule(ReactApplicationContext context) {
        super(context);

        try {
          this.masterKey = new MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build();
        } catch (Exception ex) {
          Log.e(NATIVE_MODULE_NAME, "Failed to create MasterKey", ex);
        }
    }

    @Override
    public String getName() {
        return RNEncryptedStorageModule.NATIVE_MODULE_NAME;
    }

    @ReactMethod
    public void setItem(String key, String value, ReadableMap options, Promise promise) {
        this.createSharedPreferences(options);

        if (this.sharedPreferences == null) {
            promise.reject(new NullPointerException("Could not initialize SharedPreferences"));
            return;
        }

        SharedPreferences.Editor editor = this.sharedPreferences.edit();
        editor.putString(key, value);
        boolean saved = editor.commit();

        if (saved) {
            promise.resolve(value);
        }

        else {
            promise.reject(new Exception(String.format("An error occurred while saving %s", key)));
        }
    }

    @ReactMethod
    public void getItem(String key, ReadableMap options, Promise promise) {
        this.createSharedPreferences(options);

        if (this.sharedPreferences == null) {
            promise.reject(new NullPointerException("Could not initialize SharedPreferences"));
            return;
        }

        String value = this.sharedPreferences.getString(key, null);

        promise.resolve(value);
    }

    @ReactMethod
    public void removeItem(String key, ReadableMap options, Promise promise) {
        this.createSharedPreferences(options);

        if (this.sharedPreferences == null) {
            promise.reject(new NullPointerException("Could not initialize SharedPreferences"));
            return;
        }

        SharedPreferences.Editor editor = this.sharedPreferences.edit();
        editor.remove(key);
        boolean saved = editor.commit();

        if (saved) {
            promise.resolve(key);
        }

        else {
            promise.reject(new Exception(String.format("An error occured while removing %s", key)));
        }
    }

    @ReactMethod
    public void clear(ReadableMap options, Promise promise) {
        this.createSharedPreferences(options);

        if (this.sharedPreferences == null) {
            promise.reject(new NullPointerException("Could not initialize SharedPreferences"));
            return;
        }

        SharedPreferences.Editor editor = this.sharedPreferences.edit();
        editor.clear();
        boolean saved = editor.commit();

        if (saved) {
            promise.resolve(null);
        }

        else {
            promise.reject(new Exception("An error occured while clearing SharedPreferences"));
        }
    }
}
