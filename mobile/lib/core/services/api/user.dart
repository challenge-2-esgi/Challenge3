import 'package:dio/dio.dart';

class User {
  final Dio client;

  const User({required this.client});

  Future<String> login(String email, String password) async {
    try {
      var response = await client.post(
        "/login",
        data: {'email': email, 'password': password},
      );
      return response.data['token'];
    } on Exception catch (e) {
      throw Exception(e);
    }
  }
}
