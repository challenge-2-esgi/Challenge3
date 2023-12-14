class Address {
  final int streetNumber;
  final String street;
  final int zipCode;
  final String city;
  final String country;

  Address({
    required this.streetNumber,
    required this.street,
    required this.zipCode,
    required this.city,
    required this.country,
  });

  @override
  String toString() {
    return "$streetNumber $street \n$zipCode $city $country";
  }

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      streetNumber: json['streetNumber'],
      street: json['street'],
      zipCode: json['zipCode'],
      city: json['city'],
      country: json['country'],
    );
  }
}
