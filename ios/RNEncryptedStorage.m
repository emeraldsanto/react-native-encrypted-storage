//
//  RNEncryptedStorage.m
//  Starter
//
//  Created by Yanick Bélanger on 2020-02-09.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "RNEncryptedStorage.h"
#import <Security/Security.h>
#import <React/RCTLog.h>

void rejectPromise(NSString *message, NSError *error, RCTPromiseRejectBlock rejecter)
{
    NSString* errorCode = [NSString stringWithFormat:@"%ld", error.code];
    NSString* errorMessage = [NSString stringWithFormat:@"RNEncryptedStorageError: %@", message];

    rejecter(errorCode, errorMessage, error);
}

@implementation RNEncryptedStorage

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setItem:(NSString *)key withValue:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData* dataFromValue = [value dataUsingEncoding:NSUTF8StringEncoding];
    
    if (dataFromValue == nil) {
        NSError* error = [NSError errorWithDomain:[[NSBundle mainBundle] bundleIdentifier] code:0 userInfo: nil];
        rejectPromise(@"An error occured while parsing value", error, reject);
        return;
    }
    
    // Prepares the insert query structure
    NSDictionary* storeQuery = @{
        (__bridge id)kSecClass : (__bridge id)kSecClassGenericPassword,
        (__bridge id)kSecAttrAccount : key,
        (__bridge id)kSecValueData : dataFromValue
    };
    
    // Deletes the existing item prior to inserting the new one
    SecItemDelete((__bridge CFDictionaryRef)storeQuery);
    
    OSStatus insertStatus = SecItemAdd((__bridge CFDictionaryRef)storeQuery, nil);
    
    if (insertStatus == noErr) {
        resolve(value);
    }
    
    else {
        NSError* error = [NSError errorWithDomain:[[NSBundle mainBundle] bundleIdentifier] code:insertStatus userInfo: nil];
        rejectPromise(@"An error occured while saving value", error, reject);   
    }
}

RCT_EXPORT_METHOD(getItem:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSDictionary* getQuery = @{
        (__bridge id)kSecClass : (__bridge id)kSecClassGenericPassword,
        (__bridge id)kSecAttrAccount : key,
        (__bridge id)kSecReturnData : (__bridge id)kCFBooleanTrue,
        (__bridge id)kSecMatchLimit : (__bridge id)kSecMatchLimitOne
    };
    
    CFTypeRef dataRef = NULL;
    OSStatus getStatus = SecItemCopyMatching((__bridge CFDictionaryRef)getQuery, &dataRef);
    
    if (getStatus == errSecSuccess) {
        NSString* storedValue = [[NSString alloc] initWithData: (__bridge NSData*)dataRef encoding: NSUTF8StringEncoding];
        resolve(storedValue);
    }

    else if (getStatus == errSecItemNotFound) {
        resolve(nil);
    }
    
    else {
        NSError* error = [NSError errorWithDomain: [[NSBundle mainBundle] bundleIdentifier] code:getStatus userInfo:nil];
        rejectPromise(@"An error occured while retrieving value", error, reject);
    }
}

RCT_EXPORT_METHOD(removeItem:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSDictionary* removeQuery = @{
        (__bridge id)kSecClass : (__bridge id)kSecClassGenericPassword,
        (__bridge id)kSecAttrAccount : key,
        (__bridge id)kSecReturnData : (__bridge id)kCFBooleanTrue
    };
    
    OSStatus removeStatus = SecItemDelete((__bridge CFDictionaryRef)removeQuery);
    
    if (removeStatus == noErr) {
        resolve(key);
    }
    
    else {
        NSError* error = [NSError errorWithDomain:[[NSBundle mainBundle] bundleIdentifier] code:removeStatus userInfo: nil];
        rejectPromise(@"An error occured while removing value", error, reject);
    }
}

RCT_EXPORT_METHOD(clear:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
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
    
    resolve(nil);
}
@end