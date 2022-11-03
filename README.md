# React Native Encrypted Storage
React Native wrapper around SharedPreferences and Keychain to provide a secure alternative to [Async Storage](https://github.com/react-native-community/async-storage).

## Why ?

[Async Storage](https://github.com/react-native-community/async-storage) is great but it lacks security. This is less than ideal when storing sensitive data such as access tokens, payment information and so on. This module aims to solve this problem by providing a wrapper around Android's `EncryptedSharedPreferences` and iOS' `Keychain`, complete with support for TypeScript.

## Version Requirements

- Android API 21+ (5.0)
- iOS 2.0

## Installation

### Via `yarn`

```bash
$ yarn add react-native-encrypted-storage
```

### Via `npm`

```bash
$ npm install react-native-encrypted-storage
```

## Linking

- React Native 0.60+

Since version 0.60, React Native supports auto linking. This means no additional step is needed on your end.

- React Native <= 0.59

```bash
$ react-native link react-native-encrypted-storage
```

Special note for iOS using `cocoapods`, run:

```bash
$ npx pod-install
```

## Usage

This module exposes four (4) native functions to store, retrieve, remove and clear values. They can be used like so:

### Import

```js
import EncryptedStorage from 'react-native-encrypted-storage';
```

### Storing a value

```js
async function storeUserSession() {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                age : 21,
                token : "ACCESS_TOKEN",
                username : "emeraldsanto",
                languages : ["fr", "en", "de"]
            })
        );

        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
    }
}
```

### Retrieving a value

```js
async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== undefined) {
            // Congrats! You've just retrieved your first value!
        }
    } catch (error) {
        // There was an error on the native side
    }
}
```

### Removing a value

```js
async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
    }
}
```

### Clearing all previously saved values

```js
async function clearStorage() {
    try {
        await EncryptedStorage.clear();
        // Congrats! You've just cleared the device storage!
    } catch (error) {
        // There was an error on the native side
    }
}
```

### Error handling

Take the `removeItem` example, an error can occur when trying to remove a value which does not exist, or for any other reason. This module forwards the native iOS Security framework error codes to help with debugging.

```js
async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
        // There was an error on the native side
        // You can find out more about this error by using the `error.code` property
        console.log(error.code); // ex: -25300 (errSecItemNotFound)
    }
}
```

### Storage options

You can pass a set of **options** as the previous to last parameter of `setItem`, `getItem`, `removeItem` or `clear` functions:

```js
await EncryptedStorage.removeItem('user_session', {
  storageName: 'userStorage',
});
```

The following options are supported:

- `keychainAccessibility` (**iOS only**)

  Control item availability relative to the lock state of the device. If the attribute ends with the string `ThisDeviceOnly`, the item can be restored to the same device that created a backup, but it isn’t migrated when restoring another device’s backup data. [Read more](https://developer.apple.com/documentation/security/keychain_services/keychain_items/restricting_keychain_item_accessibility?language=objc)

  Default value: `kSecAttrAccessibleAfterFirstUnlock`

- `storageName`

  A string for identifying a set of storage items. Should not contain path separators. Uses [kSecAttrService](https://developer.apple.com/documentation/security/ksecattrservice?language=objc) on iOS and [fileName](https://developer.android.com/reference/kotlin/androidx/security/crypto/EncryptedSharedPreferences?hl=en#create) on Android.

  Default value: App's bundle id

## Note regarding `Keychain` persistence

You'll notice that the iOS `Keychain` is not cleared when your app is uninstalled, this is the expected behaviour. However, if you do want to achieve a different behaviour, you can use the below snippet to clear the `Keychain` on the first launch of your app.

```objc
// AppDelegate.m

/**
 Deletes all Keychain items accessible by this app if this is the first time the user launches the app
 */
static void ClearKeychainIfNecessary() {
    // Checks wether or not this is the first time the app is run
    if ([[NSUserDefaults standardUserDefaults] boolForKey:@"HAS_RUN_BEFORE"] == NO) {
        // Set the appropriate value so we don't clear next time the app is launched
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"HAS_RUN_BEFORE"];

        NSArray *secItemClasses = @[
            (__bridge id)kSecClassGenericPassword,
            (__bridge id)kSecClassInternetPassword,
            (__bridge id)kSecClassCertificate,
            (__bridge id)kSecClassKey,
            (__bridge id)kSecClassIdentity
        ];

        // Maps through all Keychain classes and deletes all items that match
        for (id secItemClass in secItemClasses) {
            NSDictionary *spec = @{(__bridge id)kSecClass: secItemClass};
            SecItemDelete((__bridge CFDictionaryRef)spec);
        }
    }
}

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Add this line to call the above function
    ClearKeychainIfNecessary();

    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"APP_NAME" initialProperties:nil];

    rootView.backgroundColor = [UIColor colorWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;

    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];

    return YES;
}

// ...

@end
```

# Limitations

There seems to be some confusion around the maximum size of items that can be stored, especially on iOS. According to this [StackOverflow question](https://stackoverflow.com/questions/13488793/is-there-any-length-limit-of-string-stored-in-keychain), the actual Keychain limit is much lower than what it should theoretically be. This does not affect Android as the `EncryptedSharedPreferences` API relies on the phone's storage, via XML files.

## License

MIT
