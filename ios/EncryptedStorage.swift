import Foundation
import Security

@objc(EncryptedStorage)
class EncryptedStorage: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
	
	@objc(getAllKeys:withRejecter:)
	func getAllKeys(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
		let query = [
			kSecClass as String: kSecClassGenericPassword,
			kSecMatchLimit as String: kSecMatchLimitAll,
			kSecReturnAttributes as String: true,
			kSecReturnRef as String: true
		] as CFDictionary
		
		var items_ref: CFTypeRef?
		let status = SecItemCopyMatching(query, &items_ref)
		
		guard status != errSecItemNotFound else {
			return resolve([])
		}
		
		guard status == errSecSuccess else {
			return reject(NSOSStatusErrorDomain, String(describing: status), nil)
		}
		
		var x: [String] = []
		
		(items_ref as! Array<Dictionary<String, Any>>).forEach { t in
			x.append(t[kSecAttrAccount as String] as! String)
		}
		
		resolve(x)
	}
	
	@objc(multiGet:withResolver:withRejecter:)
	func multiGet(keys: NSArray, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
		let values: NSMutableArray = NSMutableArray()
		
		for key in keys {
			let query = [
				kSecClass : kSecClassGenericPassword,
				kSecAttrAccount : key,
				kSecReturnData : kCFBooleanTrue!,
				kSecMatchLimit : kSecMatchLimitOne
			] as CFDictionary
			
			var valueRef: CFTypeRef?;
			let status = SecItemCopyMatching(query, &valueRef);
			
			if (status == errSecItemNotFound) {
				values.add(NSNull())
			} else if (status == errSecSuccess) {
				let valueAsString = String(data: valueRef as! Data, encoding: .utf8)
				values.add(valueAsString!)
			} else {
				reject(NSOSStatusErrorDomain, String(describing: status), nil)
				return
			}
		}
		
		resolve(values)
	}
	
	@objc(multiSet:withResolver:withRejecter:)
	func multiSet(items: NSArray, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
		for tuple in items {
			let key = (tuple as! NSArray)[0] as! String
			let value = (tuple as! NSArray)[1] as! String
			
			let query = [
				kSecClass as String: kSecClassGenericPassword,
				kSecAttrAccount as String: key,
				kSecValueData as String: value.data(using: .utf8)!
			] as CFDictionary
			
			SecItemDelete(query)
			let status = SecItemAdd(query, nil)
			
			if (status != errSecSuccess) {
				reject(NSOSStatusErrorDomain, String(describing: status), nil)
				return
			}
		}
		
		resolve(nil)
	}
}
