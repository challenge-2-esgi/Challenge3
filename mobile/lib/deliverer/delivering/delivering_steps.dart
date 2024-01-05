import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/theme/app_theme.dart';

class DeliveringSteps extends StatelessWidget {
  static const _iconSize = 54.0;
  static const _statusIconSize = 32.0;

  final Order order;
  List<_PositionedStep> _steps = [];

  DeliveringSteps({super.key, required this.order}) {
    _steps = [
      _PositionedStep(
        label: "En attente de récupération",
        icon: Icons.schedule_outlined,
        completed: order.status == Status.delivering ||
            order.status == Status.delivered ||
            order.status == Status.canceled,
      ),
      _PositionedStep(
        label: "En cours de livraison",
        icon: Icons.local_shipping_outlined,
        completed:
            order.status == Status.delivered || order.status == Status.canceled,
      ),
      _PositionedStep(
        label: order.status == Status.canceled ? "Annulé" : "Livré",
        icon: order.status == Status.canceled
            ? CupertinoIcons.multiply_circle
            : CupertinoIcons.check_mark_circled,
        completed:
            order.status == Status.delivered || order.status == Status.canceled,
      ),
    ];
  }

  Widget _buildIcon({
    required IconData icon,
    required Color? color,
    double? left,
    double? right,
    double? top,
    double? bottom,
  }) {
    return Positioned(
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Icon(
            Icons.circle,
            size: _iconSize,
            color: color,
          ),
          Icon(
            icon,
            size: _statusIconSize,
            color: Colors.white,
          ),
        ],
      ),
    );
  }

  Widget _buildLine({
    required double width,
    required Color? color,
    double? left,
    double? right,
    double? top,
    double? bottom,
  }) {
    return Positioned(
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      child: Container(
        height: 4.0,
        width: width,
        color: color,
      ),
    );
  }

  Widget _buildSteps(BuildContext context) {
    List<Widget> widgets = [];
    for (var i = 0; i < _steps.length; i++) {
      if (i < _steps.length - 1) {
        widgets.add(
          _buildLine(
            width: MediaQuery.of(context).size.width / _steps.length +
                _iconSize / 2,
            color: _steps[i].completed
                ? context.theme.colors.primary
                : Colors.grey.withOpacity(0.8),
            top: _iconSize / 2,
            left: i == 0
                ? _iconSize / 2
                : (MediaQuery.of(context).size.width / _steps.length +
                        _iconSize / 2) *
                    i,
          ),
        );
      }

      widgets.add(
        _buildIcon(
          icon: _steps[i].icon,
          color:
              _steps[i].completed ? context.theme.colors.primary : Colors.grey,
          left: i == 0 || i == _steps.length - 1
              ? null
              : (MediaQuery.of(context).size.width / _steps.length +
                      _iconSize / 2 -
                      8) *
                  i,
          right: i == _steps.length - 1 ? 0 : null,
        ),
      );
    }

    return Stack(
      children: [...widgets],
    );
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: _iconSize,
      child: _buildSteps(context),
    );
  }
}

class _PositionedStep {
  final String label;
  final IconData icon;
  final bool completed;

  _PositionedStep({
    required this.label,
    required this.icon,
    required this.completed,
  });
}
