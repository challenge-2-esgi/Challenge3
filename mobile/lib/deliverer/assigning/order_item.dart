import 'package:flutter/material.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/theme/app_theme.dart';

class OrderItem extends StatefulWidget {
  final Order order;
  final Function(Order order) onRefuse;
  final Function(Order order) onAccept;

  const OrderItem({
    super.key,
    required this.order,
    required this.onRefuse,
    required this.onAccept,
  });

  @override
  State<OrderItem> createState() => _OrderItemState();
}

class _OrderItemState extends State<OrderItem> {
  bool _assigning = false;

  _showError(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        content: Text(
          message,
          style: const TextStyle(
            color: Colors.redAccent,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text(
              'OK',
              style: TextStyle(
                color: Colors.redAccent,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  _showSuccess() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        content: Text(
          "Operation réussit",
          style: TextStyle(
            color: context.theme.colors.success,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'OK',
              style: TextStyle(
                color: context.theme.colors.success,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _acceptOrder(Order order) async {
    setState(() {
      _assigning = true;
    });
    try {
      await ApiService.instance.assignToOrder(order.id);
      // TODO show delivering screen
      _showSuccess();
    } on Exception {
      _showError("Une erreur est survenue.\nVeuillez réessayer ultérieurement");
    } finally {
      setState(() {
        _assigning = false;
      });
    }
  }

  Widget _buildIconAddress(IconData icon, String address) {
    return Row(
      children: [
        Icon(
          icon,
          size: 25.0,
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

  Widget _buildLine(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 32.0),
      child: Column(
        children: [
          Icon(
            Icons.circle,
            color: context.theme.colors.black,
            size: 10.0,
          ),
          for (var i = 0; i < 5; i++) ...[
            Container(
              height: 5.0,
              width: 2.0,
              color: context.theme.colors.black,
            ),
            if (i < 4)
              const SizedBox(
                height: 2.0,
              ),
          ],
          Icon(
            Icons.circle_outlined,
            color: context.theme.colors.black,
            size: 10.0,
          ),
        ],
      ),
    );
  }

  Widget _buildTextButton({
    required String text,
    required Function() onPressed,
    Color? backgroundColor,
    Color? color,
    bool loading = false,
  }) {
    return TextButton(
      style: ButtonStyle(
        backgroundColor: MaterialStatePropertyAll(backgroundColor),
      ),
      onPressed: onPressed,
      child: loading
          ? const SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(
                color: Colors.white,
              ),
            )
          : Text(
              text,
              style: TextStyle(color: color),
            ),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildIconAddress(
            Icons.place_outlined,
            widget.order.pickupAddress.pretty,
          ),
          _buildLine(context),
          _buildIconAddress(
            Icons.outlined_flag_rounded,
            widget.order.deliveryAddress.pretty,
          ),
          const SizedBox(
            height: 5.0,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              _buildTextButton(
                text: "Refuser",
                onPressed: () => widget.onRefuse(widget.order),
                backgroundColor: context.theme.colors.danger,
                color: Colors.white,
              ),
              const SizedBox(
                width: 15.0,
              ),
              _buildTextButton(
                text: "Accepter",
                onPressed: () => _acceptOrder(widget.order),
                backgroundColor: context.theme.colors.primary,
                color: Colors.white,
                loading: _assigning,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
