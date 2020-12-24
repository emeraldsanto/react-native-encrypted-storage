package com.emeraldsanto.encryptedstorage;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@RunWith(AndroidJUnit4.class)
public class RNEncryptedStorageModuleUnitTest {
    private RNEncryptedStorageModule module;

    @Before
    public void setUp() {
        module = new RNEncryptedStorageModule(new ReactApplicationContext(InstrumentationRegistry.getInstrumentation().getTargetContext()));
        module.clear(mock(Promise.class));
    }

    @Test
    public void shouldGetAndSet() {
        Promise promise1 = mock(Promise.class);
        module.getItem("test", promise1);
        verify(promise1).resolve(null);

        Promise promise2 = mock(Promise.class);
        module.setItem("test", "asd", promise2);
        verify(promise2).resolve("asd");

        Promise promise3 = mock(Promise.class);
        module.getItem("test", promise3);
        verify(promise3).resolve("asd");
    }

    @Test
    public void shouldRemove() {
        Promise promise1 = mock(Promise.class);
        module.setItem("test", "asd", promise1);
        verify(promise1).resolve("asd");

        Promise promise2 = mock(Promise.class);
        module.getItem("test", promise2);
        verify(promise2).resolve("asd");

        Promise promise3 = mock(Promise.class);
        module.removeItem("test", promise3);
        verify(promise3).resolve("test");

        Promise promise4 = mock(Promise.class);
        module.getItem("test", promise4);
        verify(promise4).resolve(null);
    }

    @Test
    public void shouldClear() {
        Promise promise1 = mock(Promise.class);
        module.setItem("test", "asd", promise1);
        verify(promise1).resolve("asd");

        Promise promise2 = mock(Promise.class);
        module.getItem("test", promise2);
        verify(promise2).resolve("asd");

        Promise promise3 = mock(Promise.class);
        module.clear(promise3);
        verify(promise3).resolve(null);

        Promise promise4 = mock(Promise.class);
        module.getItem("test", promise4);
        verify(promise4).resolve(null);
    }

    @Test
    public void shouldKeepValuesWhenRecreated() {
        Promise promise1 = mock(Promise.class);
        module.setItem("test", "asd", promise1);
        verify(promise1).resolve("asd");

        module = new RNEncryptedStorageModule(new ReactApplicationContext(InstrumentationRegistry.getInstrumentation().getTargetContext()));

        Promise promise2 = mock(Promise.class);
        module.getItem("test", promise2);
        verify(promise2).resolve("asd");
    }
}
