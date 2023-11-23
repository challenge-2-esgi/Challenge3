import 'package:flutter/material.dart';
import 'package:mobile/core/services/api/api_service.dart';
import 'package:mobile/core/services/storage_service.dart';
import 'package:provider/provider.dart';

class ApiProvider {
  final ApiService _apiService = ApiService(storageService: StorageService());

  ApiProvider();

  ApiService get apiService => _apiService;
}

extension ProvideExtension on BuildContext {
  ApiService get apiService => Provider.of<ApiProvider>(this).apiService;
}
