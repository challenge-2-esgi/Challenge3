import 'package:flutter/material.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/theme/app_theme.dart';

class OrderItem extends StatelessWidget {
  final Order order;

  const OrderItem({super.key, required this.order});

  String _statusToString(Status status) {
    switch (status) {
      case Status.waitingForDeliverer:
        return "En attente de livreur";
      case Status.waitingForPickUp:
        return "En attente de récupération";
      case Status.delivering:
        return "En cours de livraison";
      case Status.delivered:
        return "Livré";
      default:
        return "Annulé";
    }
  }

  Color? _statusToColor(BuildContext context, Status status) {
    switch (status) {
      case Status.waitingForDeliverer:
      case Status.waitingForPickUp:
        return Colors.grey;
      case Status.delivering:
        return Colors.lightGreen;
      case Status.delivered:
        return context.theme.colors.success;
      default:
        return context.theme.colors.danger;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: context.theme.colors.white,
        borderRadius: BorderRadius.circular(4.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5), // Light color
            spreadRadius: 1,
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  "${order.clientFirstName} ${order.clientLastName}",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const Icon(
                Icons.arrow_forward_ios_outlined,
                size: 20,
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            "${order.deliveryAddress}",
            style: const TextStyle(
                // fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Icon(
                Icons.circle,
                size: 20,
                color: _statusToColor(context, order.status),
              ),
              const SizedBox(width: 4),
              Text(
                _statusToString(order.status),
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
