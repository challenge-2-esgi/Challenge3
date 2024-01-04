import 'package:mobile/core/models/address.dart';

class Location {
  final double latitude;
  final double longitude;

  Location({required this.latitude, required this.longitude});

  factory Location.fromAddress(Address address) {
    return Location(latitude: address.latitude, longitude: address.longitude);
  }

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      latitude: double.parse(json['latitude']),
      longitude: double.parse(json['longitude']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "latitude": latitude,
      "longitude": longitude,
    };
  }
}
