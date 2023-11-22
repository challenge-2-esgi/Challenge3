import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  static const _tokenKey = "token";
  final FlutterSecureStorage _storage;

  StorageService() : _storage = const FlutterSecureStorage();

  storeToken(String token) => _storage.write(key: _tokenKey, value: token);

  removeToken() => _storage.delete(key: _tokenKey);

  getToken() => _storage.read(key: _tokenKey);
}
