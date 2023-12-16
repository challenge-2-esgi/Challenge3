import 'package:flutter/material.dart';
import 'package:mobile/client/map_view.dart';
import 'package:mobile/client/order/order_item_tracking.dart';
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
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            MapView(
              source: order.pickupAddress,
              target: order.deliveryAddress,
            ),
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Container(
                color: Colors.white.withOpacity(0.8),
                child: const Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    BackButton(),
                    Text(
                      "Suivre mon colis",
                      style: TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: OrderItemTracking(order: order),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
