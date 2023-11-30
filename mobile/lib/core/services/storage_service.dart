import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  static StorageService? _instance;

  static get instance {
    if (_instance != null) _instance!;
    _instance = StorageService._internal();
    return _instance!;
  }

  StorageService._internal();

  static const _tokenKey = "token";
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Future<void> storeToken(String token) =>
      _storage.write(key: _tokenKey, value: token);

  Future<void> removeToken() => _storage.delete(key: _tokenKey);

  Future<String?> getToken() => _storage.read(key: _tokenKey);
}
