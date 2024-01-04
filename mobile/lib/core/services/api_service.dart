import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/core/models/location.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/core/services/storage_service.dart';

class ApiService {
  static ApiService? _instance;

  static ApiService get instance {
    if (_instance != null) _instance!;
    _instance = ApiService._internal();
    return _instance!;
  }

  ApiService._internal();

  final Dio _client = Client._buildClient(StorageService.instance);

  Future<String> login(String email, String password) async {
    try {
      var response = await _client.post(
        "/login",
        data: {'email': email, 'password': password},
      );
      return response.data['token'];
    } on Exception catch (e) {
      log("error on login user\n${e.toString()}");
      throw Exception(e);
    }
  }

  Future<void> registerClient({
    required String firstname,
    required String lastname,
    required String email,
    required String password,
    required String role,
  }) async {
    try {
      await _client.post(
        "/users",
        data: {
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "password": password,
          "role": role,
        },
      );
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<void> registerDeliverer({
    required String firstname,
    required String lastname,
    required String email,
    required String password,
    required String phone,
    required String role,
  }) async {
    try {
      await _client.post(
        "/deliverers",
        data: {
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "password": password,
          "phone": phone,
          "role": role,
        },
      );
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
      final response = await _client.get("/users/current/orders");
      return response.data.map<Order>((e) => Order.fromJson(e)).toList();
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<void> addOrder(Map<String, dynamic> json) async {
    try {
      await _client.post("/orders", data: json);
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<void> updateDelivererAvailability(
    String delivererId,
    bool isActive,
  ) async {
    try {
      await _client.patch(
        "/deliverers/$delivererId",
        data: {'isActive': isActive},
      );
    } on Exception catch (e) {
      log("error on updating deliverer availability\n${e.toString()}");
      throw Exception(e);
    }
  }

  Future<List<Order>> getAvailableOrders() async {
    try {
      final response = await _client.get("/orders");
      final List<Order> orders =
          response.data.map<Order>((e) => Order.fromJson(e)).toList();
      orders.sort(
        (a, b) => b.createdAt.compareTo(a.createdAt),
      );
      return orders;
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<void> assignToOrder(String orderId) async {
    try {
      await _client.post("/orders/$orderId/assign");
    } on Exception catch (e) {
      log("error on assigning order ${e.toString()}");
      throw Exception(e);
    }
  }

  Future<void> updateDelivererLocation(
      String delivererId, Location location) async {
    try {
      await _client.patch(
        "/deliverers/$delivererId",
        data: location.toJson(),
      );
    } on Exception catch (e) {
      log("error on updating deliverer location\n${e.toString()}");
      throw Exception(e);
    }
  }
}

class Client {
  static final String _baseUrl = dotenv.env["BACK_URL"] ?? "";
  static const _nonAuthorizationPaths = ['/login'];
  static const _registrationPaths = ["/users", "/deliverers"];

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
          if (_registrationPaths.any(options.path.startsWith) &&
              options.method == "POST") {
            return handler.next(options);
          }

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
