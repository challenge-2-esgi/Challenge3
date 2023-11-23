import 'package:dio/dio.dart';
import 'package:mobile/core/services/api/user.dart';
import 'package:mobile/core/services/storage_service.dart';

class ApiService {
  final User _user;

  ApiService({required StorageService storageService})
      : _user = User(client: Client._buildClient(storageService));

  User get user => _user;
}

class Client {
  static const _baseUrl = "http://10.0.2.2:3001";
  static const _nonAuthorizationPaths = ['/login'];

  static _buildClient(StorageService storageService) {
    final dio = Dio(
      BaseOptions(
        baseUrl: _baseUrl,
        contentType: 'application/json; charset=UTF-8',
        connectTimeout: const Duration(seconds: 5),
        receiveTimeout: const Duration(seconds: 3),
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          if (!_nonAuthorizationPaths.any(options.path.startsWith)) {
            options.headers['Authorization'] =
                'Bearer ${await storageService.getToken()}';
          }
          return handler.next(options);
        },
      ),
    );
    return dio;
  }
}