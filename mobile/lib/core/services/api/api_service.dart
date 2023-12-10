import 'package:dio/dio.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/core/services/storage_service.dart';

class ApiService {
  static ApiService? _instance;

  static get instance {
    if (_instance != null) _instance!;
    _instance = ApiService._internal();
    return _instance!;
  }

  ApiService._internal();

  final _client = Client._buildClient(StorageService.instance);

  Future<String> login(String email, String password) async {
    try {
      var response = await _client.post(
        "/login",
        data: {'email': email, 'password': password},
      );
      return response.data['token'];
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<User> getLoggedInUser() async {
    try {
      final response = await _client.get("/users/current");
      return User.fromJson(response.data);
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<List<Order>> getOrders() async {
    try {
      final response = await _client.get("/orders");
      return response.data.map<Order>((e) => Order.fromJson(e)).toList();
    } on Exception catch (e) {
      throw Exception(e);
    }
  }
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
