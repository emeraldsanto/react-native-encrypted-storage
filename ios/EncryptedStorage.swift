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
}
