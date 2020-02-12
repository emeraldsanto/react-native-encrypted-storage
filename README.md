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

- Special note for iOS using `cocoapods`, run:

```bash
$ cd ios && pod install && cd ..
```

## Usage

This module exposes three (3) native functions to `store`, `retrieve` and `remove` a value. They can be used like so:

### Import

```js
import EncryptedStorage from 'react-native-encrypted-storage';
```

### Storing a value

```js
const storeUserSession = async () => {
    const success = await EncryptedStorage.store('user_session', {
        username : 'emeraldsanto',
        age : 21,
        languages : ['fr', 'en', 'de'],
        token : 'ACCESS_TOKEN'
    });
    
    if (success === true) {
        // Congrats! You've just stored your first value!
    } 
    
    else {
        // There was an error on the native side
    }
}
```

### Retrieving a value

```js
const retrieveUserSession = async () => {
    const session = await EncryptedStorage.retrieve("user_session");
    
    if (session !== undefined) {
        // Congrats! You've just retrieved your first value!
    }
}
```

### Removing a value

```js
const removeUserSession = async () => {
    const success = await EncryptedStorage.remove('user_session');
    
    if (success === true) {
        // Congrats! You've just removed your first value!
        const previousValue = await EncryptedStorage.retrieve('user_session');
        console.log(previousValue); // undefined
    }
}
```

## License

MIT
