import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/core/models/address.dart';

class Point {
  final double? longitude;
  final double? latitude;

  Point({
    required this.longitude,
    required this.latitude,
  });

  bool isNotDefined() => longitude == null || latitude == null;
}

class GeoapifyService {
  static GeoapifyService? _instance;

  static GeoapifyService get instance {
    if (_instance != null) _instance;
    _instance = GeoapifyService._internal();
    return _instance!;
  }

  GeoapifyService._internal();

  final _apiKey = dotenv.env['GEOAPIFY_KEY'];
  static const _autocomplete = "/geocode/autocomplete";

  static const _routematrix = "/routematrix";
  static const _routematrixMode = "medium_truck";

  final Dio dio = Dio(
    BaseOptions(
      baseUrl: "https://api.geoapify.com/v1",
      contentType: 'application/json',
    ),
  );

  Future<List<Address>> autoComplete(String text) async {
    if (text.isEmpty) {
      return List.empty();
    }

    try {
      final response = await dio.get(
        _autocomplete,
        queryParameters: {
          "text": text,
          "format": "json",
          "lang": "fr",
          "apiKey": _apiKey,
        },
      );

      return List<Address>.from(response.data['results'].map<Address>(
        (e) => Address.fromGeoapify(e),
      )).where((element) => element.isValidGeoapifyAddress()).toList();
    } on Exception catch (e) {
      throw Exception(e);
    }
  }

  Future<double> getDistance(Point source, Point target) async {
    if (source.isNotDefined() || target.isNotDefined()) {
      return 0.0;
    }

    try {
      final response = await dio.post(
        _routematrix,
        data: {
          "mode": _routematrixMode,
          "sources": [
            {
              "location": [
                source.longitude,
                source.latitude,
              ]
            },
          ],
          "targets": [
            {
              "location": [
                target.longitude,
                target.latitude,
              ]
            },
          ],
        },
        queryParameters: {
          "apiKey": _apiKey,
        },
      );

      return response.data['sources_to_targets'][0][0]['distance'].toDouble();
    } on Exception catch (e) {
      throw Exception(e);
    }
  }
}
