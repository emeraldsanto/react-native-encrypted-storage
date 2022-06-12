#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(EncryptedStorage, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAllKeys:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(multiGet:(NSArray)keys withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(multiSet:(NSArray)items withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(multiRemove:(NSArray)keys withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clear:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

@end
