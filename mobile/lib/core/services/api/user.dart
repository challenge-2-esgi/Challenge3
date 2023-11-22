import 'package:dio/dio.dart';
import 'package:mobile/core/services/storage_service.dart';

class User {
  final Dio client;
  final StorageService storage;

  const User({required this.client, required this.storage});

  Future<void> login(String email, String password) async {
    try {
      var response = await client.post(
        "/login",
        data: {'email': email, 'password': password},
      );
      await storage.storeToken(response.data['token']);
    } on Exception catch (e) {
      throw Exception(e);
    }
  }
}
