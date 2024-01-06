import 'package:flutter/material.dart';
import 'package:mobile/core/models/complaint.dart';
import 'package:mobile/theme/app_theme.dart';

class ComplaintItem extends StatelessWidget {
  final Complaint complaint;

  const ComplaintItem({super.key, required this.complaint});

  String _statusToString(ComplaintStatus status) {
    switch (status) {
      case ComplaintStatus.pending:
        return "En attente de traitement";
      case ComplaintStatus.processing:
        return "En cours de traitement";
      default:
        return "Terminée";
    }
  }

  Color? _statusToColor(BuildContext context, ComplaintStatus status) {
    switch (status) {
      case ComplaintStatus.pending:
      case ComplaintStatus.processing:
        return Colors.grey;
      default:
        return context.theme.colors.success;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: context.theme.colors.white,
        borderRadius: BorderRadius.circular(10.0),
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
              Icon(
                Icons.circle,
                size: 20,
                color: _statusToColor(context, complaint.status),
              ),
              const SizedBox(width: 8.0),
              Text(
                _statusToString(complaint.status),
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ],
          ),
          const SizedBox(
            height: 20.0,
          ),
          const Text("Numéro du colis"),
          Text(
            complaint.orderSku,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(
            height: 20.0,
          ),
          Text(
            complaint.subject,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          const SizedBox(
            height: 8.0,
          ),
          Text(
            complaint.content,
            style: const TextStyle(
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
