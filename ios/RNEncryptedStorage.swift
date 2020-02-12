//
//  RNEncryptedStorage.swift
//  EncryptedStorage
//
//  Created by Yanick Bélanger on 2020-02-11.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Security

@objc(RNEncryptedStorage)
class RNEncryptedStorage: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
  @objc func store(_ key : String, value : String, resolver resolve : RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    guard let dataFromValue = value.data(using: .utf8, allowLossyConversion: false) else {
      return reject("Error parsing value for key \(key)", nil, nil);
    }
    
    // Prepares the insert query structure
    let storeQuery : [String : Any] = [
      kSecClass as String : kSecClassGenericPassword,
      kSecAttrAccount as String : key,
      kSecValueData as String : dataFromValue
    ];
    
    // Deletes the existing item prior to inserting the new one
    SecItemDelete(storeQuery as CFDictionary);
    
    let status = SecItemAdd(storeQuery as CFDictionary, nil);
    
    if (status == noErr) {
      resolve(value);
    }
    
    else {
      reject("An error occured while saving \(key)", nil, nil);
    }
  }
  
  @objc
  func retrieve(_ key : String, resolver resolve : RCTPromiseResolveBlock, rejecter reject : RCTPromiseRejectBlock) {
    let retrieveQuery : [String : Any] = [
      kSecClass as String : kSecClassGenericPassword,
      kSecAttrAccount as String : key,
      kSecReturnData as String : kCFBooleanTrue!,
      kSecMatchLimit as String : kSecMatchLimitOne
    ];
    
    var dataRef : AnyObject? = nil;
    
    let status = SecItemCopyMatching(retrieveQuery as CFDictionary, &dataRef);
    
    if (status == noErr) {
      let stringValue = String(data : (dataRef as! Data?)!, encoding: .utf8)!;
      resolve(stringValue);
    }
    
    else {
      reject("An error occured while retrieving \(key)", nil, nil);
    }
  }
  
  @objc
  func remove(_ key : String, resolver resolve : RCTPromiseResolveBlock, rejecter reject : RCTPromiseRejectBlock) {
    let removeQuery : [String : Any] = [
      kSecClass as String : kSecClassGenericPassword,
      kSecAttrAccount as String : key,
      kSecReturnData as String : kCFBooleanTrue!
    ];
    
    let status = SecItemDelete(removeQuery as CFDictionary);
    
    if (status == noErr) {
      resolve(key);
    }
    
    else {
      reject("An error occured while removing \(key)", nil, nil);
    }
  }
}

