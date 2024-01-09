import 'package:intl/intl.dart';
import 'package:mobile/core/models/deliverer.dart';

import 'address.dart';

enum Status {
  waitingForDeliverer,
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
  final String? clientValidationCode;
  final String receiverFirstname;
  final String receiverLastname;
  final Deliverer? deliverer;
  final DateTime createdAt;
  final DateTime? pickupTime;
  final DateTime? deliverTime;
  final String? complaintId;

  Order({
    required this.id,
    required this.status,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.clientFirstName,
    required this.clientLastName,
    required this.clientValidationCode,
    required this.receiverFirstname,
    required this.receiverLastname,
    required this.deliverer,
    required this.createdAt,
    required this.pickupTime,
    required this.deliverTime,
    required this.complaintId,
  });

  String _formatDate(DateTime dateTime) =>
      DateFormat("dd MMM, ''${(dateTime.year % 100)}").format(dateTime);

  String getPickupTime() => pickupTime == null ? "" : _formatDate(pickupTime!);

  String getDeliverTime() =>
      deliverTime == null ? "" : _formatDate(deliverTime!);

  String get clientFullName =>
      "${clientLastName.toUpperCase()} $clientFirstName";

  String get receiverFullName =>
      "${receiverLastname.toUpperCase()} $receiverFirstname";

  Status get nextStatus {
    if (status == Status.waitingForDeliverer) {
      return Status.waitingForPickUp;
    }

    if (status == Status.waitingForPickUp) {
      return Status.delivering;
    }

    return Status.delivered;
  }

  bool get isDelivered =>
      status == Status.delivered || status == Status.canceled;

  bool get canSendComplaint =>
      complaintId == null &&
      (status == Status.delivered || status == Status.canceled);

  static Status stringToStatus(String status) {
    switch (status) {
      case 'WAITING_FOR_DELIVERER':
        return Status.waitingForDeliverer;
      case 'WAITING_FOR_PICK_UP':
        return Status.waitingForPickUp;
      case 'DELIVERING':
        return Status.delivering;
      case 'DELIVERED':
        return Status.delivered;
      default:
        return Status.canceled;
    }
  }

  static String statusToString(Status status) {
    switch (status) {
      case Status.waitingForDeliverer:
        return "WAITING_FOR_DELIVERER";
      case Status.waitingForPickUp:
        return "WAITING_FOR_PICK_UP";
      case Status.delivering:
        return "DELIVERING";
      case Status.delivered:
        return "DELIVERED";
      case Status.canceled:
        return "CANCELLED";
    }
  }

  Order copyWith({
    String? id,
    Status? status,
    Address? pickupAddress,
    Address? deliveryAddress,
    String? clientFirstName,
    String? clientLastName,
    String? clientValidationCode,
    String? receiverFirstname,
    String? receiverLastname,
    Deliverer? deliverer,
    DateTime? createdAt,
    DateTime? pickupTime,
    DateTime? deliverTime,
    String? complaintId,
  }) {
    return Order(
      id: id ?? this.id,
      status: status ?? this.status,
      pickupAddress: pickupAddress ?? this.pickupAddress,
      deliveryAddress: deliveryAddress ?? this.deliveryAddress,
      clientFirstName: clientFirstName ?? this.clientFirstName,
      clientLastName: clientLastName ?? this.clientLastName,
      clientValidationCode: clientValidationCode ?? this.clientValidationCode,
      deliverer: deliverer ?? this.deliverer,
      createdAt: createdAt ?? this.createdAt,
      pickupTime: pickupTime ?? this.pickupTime,
      deliverTime: deliverTime ?? this.deliverTime,
      receiverFirstname: receiverFirstname ?? this.receiverFirstname,
      receiverLastname: receiverLastname ?? this.receiverLastname,
      complaintId: complaintId ?? this.complaintId,
    );
  }

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      status: stringToStatus(json['status']),
      pickupAddress: Address.fromJson(json['pickupAddress']),
      deliveryAddress: Address.fromJson(json['deliveryAddress']),
      clientFirstName: json['user']['firstname'],
      clientLastName: json['user']['lastname'],
      clientValidationCode: json['user']['validationCode'],
      receiverFirstname: json['receiverFirstname'],
      receiverLastname: json['receiverLastname'],
      deliverer: json['deliverer'] == null
          ? null
          : Deliverer.fromJson(json['deliverer']),
      createdAt: DateTime.parse(json['createdAt']),
      pickupTime: json['pickupTime'] == null
          ? null
          : DateTime.parse(json['pickupTime']),
      deliverTime: json['deliverTime'] == null
          ? null
          : DateTime.parse(json['deliverTime']),
      complaintId: json['complaintId'],
    );
  }
}
