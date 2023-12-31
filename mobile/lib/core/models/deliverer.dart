class Deliverer {
  final String id;
  final bool isActive;
  final String phone;
  final double? latitude;
  final double? longitude;

  Deliverer({
    required this.id,
    required this.isActive,
    required this.phone,
    required this.latitude,
    required this.longitude,
  });

  factory Deliverer.fromJson(Map<String, dynamic> json) {
    return Deliverer(
      id: json['id'],
      isActive: json['isActive'],
      phone: json['phone'],
      latitude:
          json['latitude'] == null ? null : double.parse(json['latitude']),
      longitude:
          json['longitude'] == null ? null : double.parse(json['longitude']),
    );
  }
}
