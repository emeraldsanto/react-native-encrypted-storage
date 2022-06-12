package com.reactnativeencryptedstorage

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.facebook.react.bridge.*

class EncryptedStorageModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  companion object {
    private val NATIVE_MODULE_NAME = "EncryptedStorage"
    private val SHARED_PREFERENCES_FILENAME = "RN_ENCRYPTED_STORAGE_SHARED_PREF"
  }

  private var sharedPreferences: SharedPreferences

  init {
    try {
      val key = MasterKey.Builder(reactContext)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()

      this.sharedPreferences = EncryptedSharedPreferences.create(
        reactContext,
        SHARED_PREFERENCES_FILENAME,
        key,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
      );
    } catch (ex: Exception) {
      Log.e(
        NATIVE_MODULE_NAME,
        "Failed to create encrypted shared preferences! Failing back to standard SharedPreferences",
        ex
      );

      this.sharedPreferences =
        reactContext.getSharedPreferences(SHARED_PREFERENCES_FILENAME, Context.MODE_PRIVATE);
    }
  }

  override fun getName(): String {
    return NATIVE_MODULE_NAME
  }

  @ReactMethod
  fun getAllKeys(promise: Promise) {
    try {
      val allKeys: WritableArray = WritableNativeArray();

      this.sharedPreferences.all.keys.forEach {
        allKeys.pushString(it)
      }

      promise.resolve(allKeys);
    } catch (ex: Exception) {
      promise.reject(ex);
    }
  }
}
