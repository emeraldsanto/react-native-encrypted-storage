package com.emeraldsanto.encryptedstorage

import android.content.SharedPreferences
import android.content.res.Resources
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class RNEncryptedStorageModule(context : ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    companion object {
        const val NATIVE_MODULE_NAME = "RNEncryptedStorage";
        const val SHARED_PREFERENCES_FILENAME = "RN_ENCRYPTED_STORAGE_SHARED_PREF";
    }

    private val sharedPreferences : SharedPreferences;

    init {
        this.sharedPreferences = EncryptedSharedPreferences.create(
            RNEncryptedStorageModule.SHARED_PREFERENCES_FILENAME,
            MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC),
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        );
    }

    override fun getName(): String {
        return RNEncryptedStorageModule.NATIVE_MODULE_NAME
    }

    @ReactMethod
    fun setItem(key : String, value : String, promise : Promise) {
        val editor = this.sharedPreferences.edit();
        editor.putString(key, value);
        val saved = editor.commit();

        if (saved) {
            promise.resolve(value);
        }

        else {
            promise.reject(Exception("An error occured while saving $key"));
        }
    }

    @ReactMethod
    fun getItem(key : String, promise : Promise) {
        val value = this.sharedPreferences.getString(key, "");

        if (value.isNullOrEmpty()) {
            promise.reject(Resources.NotFoundException("An error occured while retrieving $key"));
        }

        else {
            promise.resolve(value);
        }
    }

    @ReactMethod
    fun removeItem(key : String, promise : Promise) {
        val editor = this.sharedPreferences.edit();
        editor.remove(key);
        val saved = editor.commit();

        if (saved) {
            promise.resolve(key);
        }

        else {
            promise.reject(Exception("An error occured while removing $key"));
        }
    }
}