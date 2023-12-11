import 'address.dart';

enum Status {
  waitingForPickUp,
  delivering,
  delivered,
  canceled,
}

class Order {
  final String id;
  final Address pickupAddress;
  final Address deliveryAddress;
  final Status status;
  final String clientFirstName;
  final String clientLastName;

  Order({
    required this.id,
    required this.status,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.clientFirstName,
    required this.clientLastName,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      status: (() {
        if (json['status'] == 'WAITING_FOR_PICK_UP') {
          return Status.waitingForPickUp;
        }
        if (json['status'] == 'DELIVERING') {
          return Status.delivering;
        }
        if (json['status'] == 'DELIVERED') {
          return Status.delivered;
        }

        return Status.canceled;
      }()),
      pickupAddress: Address.fromJson(json['pickupAddress']),
      deliveryAddress: Address.fromJson(json['deliveryAddress']),
      clientFirstName: json['user']['firstname'],
      clientLastName: json['user']['lastname'],
    );
  }
}
