class Address {
  final String streetNumber;
  final String street;
  final String zipCode;
  final String city;
  final String country;
  final double latitude;
  final double longitude;

  Address({
    required this.streetNumber,
    required this.street,
    required this.zipCode,
    required this.city,
    required this.country,
    required this.latitude,
    required this.longitude,
  });

  String get geoapify => "$streetNumber $street, $zipCode $city, $country";
  String get pretty => "$streetNumber $street \n$city, $country";

  bool isValidGeoapifyAddress() =>
      streetNumber.isNotEmpty &&
      street.isNotEmpty &&
      zipCode.isNotEmpty &&
      city.isNotEmpty &&
      country.isNotEmpty;

  @override
  String toString() {
    return "$streetNumber $street \n$zipCode $city $country";
  }

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      streetNumber: json['streetNumber'].toString(),
      street: json['street'],
      zipCode: json['zipCode'].toString(),
      city: json['city'],
      country: json['country'],
      latitude: double.parse(json['latitude']),
      longitude: double.parse(json['longitude']),
    );
  }

  factory Address.fromGeoapify(Map<String, dynamic> json) {
    return Address(
      streetNumber: json['housenumber'] ?? "",
      street: json['street'] ?? "",
      zipCode: json['postcode'] ?? "",
      city: json['city'] ?? "",
      country: json['country'] ?? "",
      latitude: json['lat'],
      longitude: json['lon'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "streetNumber": streetNumber,
      "street": street,
      "zipCode": zipCode,
      "city": city,
      "country": country,
      "latitude": latitude,
      "longitude": longitude,
    };
  }
}
