import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/theme/app_theme.dart';

class OrderItemTracking extends StatelessWidget {
  final Order order;
  List<_TrackingStep> _steps = [];
  final double _spacerHeight = 25.0;

  OrderItemTracking({super.key, required this.order}) {
    _steps = [
      _TrackingStep(
        label: "Retiré",
        dateTime: order.pickupTime,
        completed: order.status != Status.waitingForPickUp,
      ),
      _TrackingStep(
        label: "En route",
        dateTime: null,
        completed:
            order.status == Status.delivered || order.status == Status.canceled,
      ),
      _TrackingStep(
        label: order.status == Status.canceled ? "Annulé" : "Livré",
        dateTime: order.status == Status.canceled ? null : order.deliverTime,
        completed:
            order.status == Status.delivered || order.status == Status.canceled,
      ),
    ];
  }

  Widget _buildIconAddress(IconData icon, String address) {
    return Row(
      children: [
        Icon(
          icon,
          size: 30,
        ),
        const SizedBox(
          width: 10.0,
        ),
        Text(
          address,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Column _buildLine(BuildContext context) {
    List<Widget> widgets = [];
    for (var i = 0; i < _steps.length; i++) {
      widgets.add(
        Icon(
          Icons.circle,
          color: (() {
            if (i == _steps.length - 1 && order.status == Status.delivered) {
              return context.theme.colors.success;
            }
            if (i == _steps.length - 1 && order.status == Status.canceled) {
              return Colors.red;
            }
            return _steps[i].completed
                ? context.theme.colors.primary
                : Colors.grey;
          })(),
          size: 20,
        ),
      );
      if (i < _steps.length - 1) {
        widgets.add(
          Container(
            height: _spacerHeight,
            width: 3,
            margin: const EdgeInsets.only(left: 8),
            decoration: BoxDecoration(
              color: (() {
                return _steps[i].completed
                    ? context.theme.colors.primary
                    : Colors.grey;
              })(),
              borderRadius: const BorderRadius.all(
                Radius.circular(4.0),
              ),
            ),
          ),
        );
      }
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [...widgets],
    );
  }

  Column _buildSteps() {
    List<Widget> widgets = [];
    for (var i = 0; i < _steps.length; i++) {
      widgets.add(
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              _steps[i].label,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 4.0),
              child: Text(
                _steps[i].getDate(),
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.bold,
                  color: Colors.black54,
                ),
              ),
            ),
          ],
        ),
      );
      if (i < _steps.length - 1) {
        widgets.add(
          SizedBox(
            height: _spacerHeight + 5,
          ),
        );
      }
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [...widgets],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: context.theme.colors.white,
        borderRadius: BorderRadius.circular(15.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5), // Light color
            spreadRadius: 1,
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildIconAddress(Icons.place_outlined, order.pickupAddress.pretty),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildLine(context),
                  const SizedBox(
                    width: 10.0,
                  ),
                  _buildSteps(),
                ],
              ),
            ),
            _buildIconAddress(
                Icons.outlined_flag_rounded, order.deliveryAddress.pretty),
          ],
        ),
      ),
    );
  }
}

class _TrackingStep {
  final String label;
  final DateTime? dateTime;
  final bool completed;

  _TrackingStep({
    required this.label,
    required this.dateTime,
    required this.completed,
  });

  String getDate() => dateTime == null
      ? ""
      : DateFormat("dd MMM, ''${(dateTime!.year % 100)} à HH'h':mm")
          .format(dateTime!);
}
