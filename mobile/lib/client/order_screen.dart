import 'package:flutter/material.dart';
import 'package:mobile/core/models/order.dart';

class OrderScreen extends StatelessWidget {
  static const routeName = "order_details";

  static navigateTo(BuildContext context, {required Order order}) {
    Navigator.of(context).pushNamed(routeName, arguments: order);
  }

  Order order;

  OrderScreen({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BackButton(),
            Column(
              children: [
                Text('informations sur la commande'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
