import 'package:flutter/material.dart';
import 'package:mobile/core/services/storage_service.dart';

class AuthProvider extends ChangeNotifier {
  final StorageService storageService;
  bool _isAuthenticated = false;

  AuthProvider({required this.storageService}) {
    init();
  }

  bool get isAuthenticated => _isAuthenticated;

  Future<void> init() async {
    var token = await storageService.getToken();
    _isAuthenticated = token != null;
  }

  Future<void> login(String token) async {
    await storageService.storeToken(token);
    _isAuthenticated = true;
    notifyListeners();
  }

  Future<void> logout() async {
    await storageService.removeToken();
    _isAuthenticated = false;
    notifyListeners();
  }
}
