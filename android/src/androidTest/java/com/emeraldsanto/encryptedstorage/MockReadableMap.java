package com.emeraldsanto.encryptedstorage;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

class MockReadableMap implements ReadableMap {
  @Override
  public boolean getBoolean(@NonNull String name) {
    return false;
  }

  @Override
  public double getDouble(@NonNull String name) {
    return 0;
  }

  @Override
  public int getInt(@NonNull String name) {
    return 0;
  }

  @Override
  public boolean hasKey(@NonNull String name) {
    return name.equals("storageName");
  }

  @Override
  public boolean isNull(@NonNull String name) {
    return false;
  }

  @Nullable
  @Override
  public String getString(@NonNull String name) {
    if (name.equals("storageName")) {
      return "mock.storage.name";
    }
    return null;
  }

  @Nullable
  @Override
  public ReadableArray getArray(@NonNull String name) {
    return null;
  }

  @Nullable
  @Override
  public ReadableMap getMap(@NonNull String name) {
    return null;
  }

  @NonNull
  @Override
  public Dynamic getDynamic(@NonNull String name) {
    return null;
  }

  @NonNull
  @Override
  public ReadableType getType(@NonNull String name) {
    return null;
  }

  @NonNull
  @Override
  public Iterator<Map.Entry<String, Object>> getEntryIterator() {
    return null;
  }

  @NonNull
  @Override
  public ReadableMapKeySetIterator keySetIterator() {
    return null;
  }

  @NonNull
  @Override
  public HashMap<String, Object> toHashMap() {
    return null;
  }
}
