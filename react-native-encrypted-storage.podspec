require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-encrypted-storage"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  React Native wrapper around SharedPreferences and Keychain to provide a secure alternative to Async Storage
                   DESC
  s.swift_version = "5.0"
  s.homepage     = "https://github.com/emeraldsanto/react-native-encrypted-storage"
  s.license      = "MIT"
  s.authors      = { "Yanick" => "yanick.belanger@yahoo.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/emeraldsanto/react-native-encrypted-storage.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
end

