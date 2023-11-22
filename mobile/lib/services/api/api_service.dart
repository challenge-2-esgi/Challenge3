import 'package:dio/dio.dart';
import 'package:mobile/services/api/user.dart';
import 'package:mobile/services/storage_service.dart';

class ApiService {
  static const _baseUrl = "http://10.0.2.2:3001";
  static const _nonAuthorizationPaths = ['/login'];

  static final Dio _dio = _buildDio();
  static final StorageService _storage = StorageService();

  final User user;

  ApiService() : user = User(client: _dio, storage: _storage);

  static _buildDio() {
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
                'Bearer ${await _storage.getToken()}';
          }
          return handler.next(options);
        },
      ),
    );

    return dio;
  }
}
