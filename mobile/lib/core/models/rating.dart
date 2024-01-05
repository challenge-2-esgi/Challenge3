class Rating {
  final String id;
  final String clientId;
  final String delivererId;
  final String orderId;
  final int rating;

  Rating({
    required this.id,
    required this.clientId,
    required this.delivererId,
    required this.orderId,
    required this.rating,
  });

  factory Rating.fromJson(Map<String, dynamic> json) {
    return Rating(
      id: json['id'],
      clientId: json['client']?['id'] ?? json['clientId'],
      delivererId: json['deliverer']?['id'] ?? json['delivererId'],
      orderId: json['orderId'],
      rating: json['rating'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'clientId': clientId,
      'delivererId': delivererId,
      'orderId': orderId,
      'rating': rating,
    };
  }
}
