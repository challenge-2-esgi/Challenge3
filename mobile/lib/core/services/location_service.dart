import 'dart:async';

import 'package:geolocator/geolocator.dart';
import 'package:mobile/core/models/location.dart';

class LocationService {
  static LocationService? _instance;

  static LocationService get instance {
    if (_instance != null) _instance;
    _instance = LocationService._internal();
    return _instance!;
  }

  LocationService._internal();

  static const LocationSettings _locationSettings = LocationSettings(
    accuracy: LocationAccuracy.high,
    distanceFilter: 1, // number of meters
  );

  StreamSubscription<Position>? _positionStream;

  Future<bool> _hasPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return false;
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      return false;
    }

    return true;
  }

  Future<bool> requestPermission() async {
    final isPermissionGranted = await _hasPermission();

    if (!isPermissionGranted) {
      await Geolocator.requestPermission();
      return await _hasPermission();
    }

    return true;
  }

  Future<Location?> getCurrentLocation() async {
    final isPermissionGranted = await _hasPermission();

    if (!isPermissionGranted) {
      return null;
    }

    final position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
    return Location(latitude: position.latitude, longitude: position.longitude);
  }

  void listen(Function(Location location) onLocation) {
    _positionStream =
        Geolocator.getPositionStream(locationSettings: _locationSettings)
            .listen(
      (Position? position) {
        if (position != null) {
          onLocation(
            Location(
              latitude: position.latitude,
              longitude: position.longitude,
            ),
          );
        }
      },
    );
  }

  void cancel() {
    if (_positionStream != null) {
      _positionStream?.cancel();
    }
  }
}
