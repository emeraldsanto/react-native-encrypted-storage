# React Native Encrypted Storage
React Native wrapper around SharedPreferences and Keychain to provide a secure alternative to [Async Storage](https://github.com/react-native-community/async-storage).

## Why ?

[Async Storage](https://github.com/react-native-community/async-storage) is great but it lacks security. This is less than ideal when storing sensitive data such as access tokens, payment information and so on. This module aims to solve this problem by providing a wrapper around Android's `SharedPreferences` and iOS' `Keychain`, complete with support for TypeScript.

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
$ cd ios && pod install && cd ..
```

## Usage

This module exposes three native functions to `setItem`, `getItem` and `removeItem` a value. They can be used like so:

### Import

```js
import EncryptedStorage from 'react-native-encrypted-storage';
```

### Storing a value

```js
const storeUserSession = async () => {
    try {
        await EncryptedStorage.setItem('user_session', JSON.stringify({
            username : 'emeraldsanto',
            age : 21,
            languages : ['fr', 'en', 'de'],
            token : 'ACCESS_TOKEN'
        }));

        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
    }
}
```

### Retrieving a value

```js
const retrieveUserSession = async () => {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== null) {
            // Congrats! You've just retrieved your first value!
        }
    } catch (error) {
        // There was an error on the native side
    }
}
```

### Removing a value

```js
const removeUserSession = async () => {
    try {
        await EncryptedStorage.removeItem('user_session');
        // Congrats! You've just removed your first value!
    } catch (error) {
        // There was an error on the native side
    }
}
```

## License

MIT
