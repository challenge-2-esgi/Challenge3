import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/core/models/order.dart';

class OrderDetails extends StatelessWidget {
  final Order order;

  const OrderDetails({super.key, required this.order});

  Widget _buildInfo(String title, String subtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 4.0),
        Text(
          subtitle,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w400,
          ),
        ),
      ],
    );
  }

  Widget _buildIconStatus(String status, IconData icon) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Icon(
          icon,
          size: 30,
        ),
        const SizedBox(
          width: 16.0,
        ),
        Text(
          status,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        )
      ],
    );
  }

  Widget _buildStatus(Status status) {
    switch (status) {
      case Status.waitingForDeliverer:
        return _buildIconStatus(
            'En attente de livreur', Icons.schedule_outlined);
      case Status.waitingForPickUp:
        return _buildIconStatus(
            'En attente de récupération', Icons.schedule_outlined);
      case Status.delivering:
        return _buildIconStatus(
            'En cours de livraison', Icons.local_shipping_rounded);
      case Status.delivered:
        return _buildIconStatus('Livré', CupertinoIcons.check_mark_circled);
      case Status.canceled:
        return _buildIconStatus('Annulé', CupertinoIcons.multiply_circle);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildStatus(order.status),
          const SizedBox(height: 32.0),
          _buildInfo(
            "Client",
            order.clientFullName,
          ),
          const SizedBox(height: 16.0),
          _buildInfo(
            "Destinataire",
            order.receiverFullName,
          ),
          const SizedBox(height: 16.0),
          _buildInfo(
            "Addresse de récupération",
            order.pickupAddress.pretty,
          ),
          const SizedBox(height: 16.0),
          _buildInfo(
            "Addresse de livraison",
            order.deliveryAddress.pretty,
          ),
        ],
      ),
    );
  }
}
