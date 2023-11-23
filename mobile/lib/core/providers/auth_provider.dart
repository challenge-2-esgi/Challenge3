import 'package:flutter/material.dart';
import 'package:mobile/core/services/storage_service.dart';
import 'package:provider/provider.dart';

class AuthProvider extends ChangeNotifier {
  final StorageService _storageService;
  bool _isAuthenticated = false;

  AuthProvider({required StorageService storageService})
      : _storageService = storageService {
    init();
  }

  bool get isAuthenticated => _isAuthenticated;

  Future<void> init() async {
    var token = await _storageService.getToken();
    _isAuthenticated = token != null;
  }

  Future<void> login(String token) async {
    await _storageService.storeToken(token);
    _isAuthenticated = true;
    notifyListeners();
  }

  Future<void> logout() async {
    await _storageService.removeToken();
    _isAuthenticated = false;
    notifyListeners();
  }
}

extension AuthProviderExtension on BuildContext {
  AuthProvider get authProvider => Provider.of(this);
}

extension AuthProviderNoListenExtension on BuildContext {
  AuthProvider get authProviderNoListen => Provider.of(this, listen: false);
}
