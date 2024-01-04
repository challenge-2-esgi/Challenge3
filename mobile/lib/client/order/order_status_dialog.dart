import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/client/blocs/order_bloc.dart';
import 'package:mobile/core/models/order.dart';

class OrderStatusDialog extends StatelessWidget {
  final List<Status> selectedStatuses;

  const OrderStatusDialog({super.key, required this.selectedStatuses});

  String _statusToString(Status status) {
    switch (status) {
      case Status.waitingForPickUp:
        return "En attente de livreur";
      case Status.delivering:
        return "En cours de livraison";
      case Status.delivered:
        return "Livré";
      default:
        return "Annulé";
    }
  }

  Widget _buildPopupMenuItem(OrderBloc orderBloc, Status status) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Checkbox(
          value: selectedStatuses.contains(status),
          onChanged: (bool? value) {
            orderBloc.add(OrdersFiltered(status: status));
          },
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(4),
            ),
          ),
        ),
        GestureDetector(
          child: Text(
            _statusToString(status),
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
          onTap: () {
            orderBloc.add(OrdersFiltered(status: status));
          },
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final orderBloc = context.read<OrderBloc>();
    return AlertDialog(
      alignment: Alignment.topRight,
      contentPadding: const EdgeInsets.all(0),
      content: Container(
        height: 220,
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(
            Radius.circular(8.0),
          ),
        ),
        child: Column(
          children: [
            _buildPopupMenuItem(orderBloc, Status.waitingForPickUp),
            _buildPopupMenuItem(orderBloc, Status.delivering),
            _buildPopupMenuItem(orderBloc, Status.delivered),
            _buildPopupMenuItem(orderBloc, Status.canceled),
          ],
        ),
      ),
    );
  }
}
