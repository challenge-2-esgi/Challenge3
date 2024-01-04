import 'dart:async';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/core/services/storage_service.dart';
import 'package:mobile/core/sse/sse_client.dart';

enum SseEvent {
  orderLocation,
  orderStatus,
  newOrder,
}

class SseService {
  static SseService? _instance;

  static SseService get instance {
    if (_instance != null) _instance;
    _instance = SseService._internal();
    return _instance!;
  }

  SseService._internal();

  final String _baseUrl = dotenv.env["BACK_URL"] ?? "";

  Uri _buildUri(
    SseEvent event,
    Map<String, dynamic>? params,
  ) {
    switch (event) {
      case SseEvent.orderStatus:
        return Uri.parse("$_baseUrl/notifications/order-status")
            .replace(queryParameters: params);
      case SseEvent.orderLocation:
        return Uri.parse("$_baseUrl/notifications/order-location")
            .replace(queryParameters: params);
      case SseEvent.newOrder:
        return Uri.parse("$_baseUrl/notifications/new-order");
      default:
        return Uri();
    }
  }

  Future<void> subscribe(
      SseEvent sseEvent, Function(Map<String, dynamic> data) onData,
      {Map<String, dynamic>? queryParams}) async {
    SseClient.subscribeToSSE(
      uri: _buildUri(sseEvent, queryParams),
      headers: {
        "Accept": "text/event-stream",
        "Cache-Control": "no-cache",
        "Authorization": "Bearer ${await StorageService.instance.getToken()}",
      },
    ).listen((sseModel) {
      if (!sseModel.isDataEmpty()) {
        onData(sseModel.transformDataToMap());
      }
    });
  }

  close() {
    SseClient.unsubscribeFromSSE();
  }
}
