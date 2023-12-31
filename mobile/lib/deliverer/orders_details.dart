import 'package:flutter/material.dart';
import 'package:mobile/core/models/order.dart';

class OrderDetailsPage extends StatelessWidget {
  final Order order;

  const OrderDetailsPage({Key? key, required this.order}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Détails de la commande'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.3),
                spreadRadius: 2,
                blurRadius: 5,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              _buildDetailRow(
                  'Client', '${order.clientFirstName} ${order.clientLastName}'),
              _buildDetailRow('Statut', _getStatusString(order.status)),
              _buildDetailRow(
                  'Adresse de récupération', order.pickupAddress.toString()),
              _buildDetailRow(
                  'Adresse de livraison', order.deliveryAddress.toString(),
                  isLastItem: true),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailRow(String title, String value,
      {bool isLastItem = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          child: Text(
            title,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            value,
            style: const TextStyle(fontSize: 16),
          ),
        ),
        if (!isLastItem)
          const Divider(height: 16, thickness: 1, color: Colors.grey),
      ],
    );
  }

  String _getStatusString(Status status) {
    switch (status) {
      case Status.waitingForDeliverer:
        return 'En attente de livreur';
      case Status.waitingForPickUp:
        return 'En attente de récupération';
      case Status.delivering:
        return 'En cours de livraison';
      case Status.delivered:
        return 'Livré';
      case Status.canceled:
        return 'Annulé';
    }
  }
}
