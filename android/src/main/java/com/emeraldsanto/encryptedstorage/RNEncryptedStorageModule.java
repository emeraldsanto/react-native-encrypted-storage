package com.emeraldsanto.encryptedstorage;

import android.content.SharedPreferences;
import android.content.res.Resources;
import android.util.Log;

import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKeys;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNEncryptedStorageModule extends ReactContextBaseJavaModule {

    private static String NATIVE_MODULE_NAME = "RNEncryptedStorage";
    private static String SHARED_PREFERENCES_FILENAME = "RN_ENCRYPTED_STORAGE_SHARED_PREF";

    private SharedPreferences sharedPreferences;

    public RNEncryptedStorageModule(ReactApplicationContext context) {
        super(context);

        try {
            this.sharedPreferences = EncryptedSharedPreferences.create(
                RNEncryptedStorageModule.SHARED_PREFERENCES_FILENAME,
                MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC),
                context,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            );
        }

        catch (Exception ex) {
            Log.w(RNEncryptedStorageModule.NATIVE_MODULE_NAME, String.format("Could not initialize SharedPreferences - %s", ex.getLocalizedMessage()));
        }
    }

    @Override
    public String getName() {
        return RNEncryptedStorageModule.NATIVE_MODULE_NAME;
    }

    @ReactMethod
    public void setItem(String key, String value, Promise promise) {
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
            promise.reject(new Exception(String.format("An error occured while saving %s", key)));
        }
    }

    @ReactMethod
    public void getItem(String key, Promise promise) {
        if (this.sharedPreferences == null) {
            promise.reject(new NullPointerException("Could not initialize SharedPreferences"));
            return;
        }

        String value = this.sharedPreferences.getString(key, "");

        if (value == null || value.isEmpty()) {
            promise.reject(new Resources.NotFoundException(String.format("An error occured while retrieving %s", key)));
        }

        else {
            promise.resolve(value);
        }
    }

    @ReactMethod
    public void removeItem(String key, Promise promise) {
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
}
