import 'package:intl/intl.dart';

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
  final DateTime createdAt;
  final DateTime? pickupTime;
  final DateTime? deliverTime;

  Order({
    required this.id,
    required this.status,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.clientFirstName,
    required this.clientLastName,
    required this.createdAt,
    required this.pickupTime,
    required this.deliverTime,
  });

  String _formatDate(DateTime dateTime) =>
      DateFormat("dd MMM, ''${(dateTime.year % 100)}").format(dateTime);

  String getPickupTime() => pickupTime == null ? "" : _formatDate(pickupTime!);

  String getDeliverTime() =>
      deliverTime == null ? "" : _formatDate(deliverTime!);

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
      createdAt: DateTime.parse(json['createdAt']),
      pickupTime: json['pickupTime'] == null
          ? null
          : DateTime.parse(json['pickupTime']),
      deliverTime: json['deliverTime'] == null
          ? null
          : DateTime.parse(json['deliverTime']),
    );
  }
}
