import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/client/order_screen.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/theme/app_theme.dart';

class OrderItem extends StatelessWidget {
  final Order order;

  const OrderItem({super.key, required this.order});

  Widget _buildDateAddress(BuildContext context, String date, String city,
      {bool alignEnd = false}) {
    return Column(
      crossAxisAlignment:
          alignEnd ? CrossAxisAlignment.end : CrossAxisAlignment.start,
      children: [
        Text(
          date,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.grey,
          ),
        ),
        const SizedBox(
          height: 4,
        ),
        SizedBox(
          width: city.length >= 25 ? 120 : null,
          child: Text(
            city,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
            overflow: TextOverflow.ellipsis,
          ),
        )
      ],
    );
  }

  List<Widget> _buildTracking(BuildContext context) {
    const circleIcon = Icon(
      Icons.circle,
      size: 20,
      color: Colors.grey,
    );
    final line = Container(
      color: Colors.grey,
      height: 2,
    );
    final deliveryIcon = Stack(
      alignment: Alignment.center,
      children: [
        Icon(
          Icons.circle,
          size: 50,
          color: context.theme.colors.primary,
        ),
        Icon(
          Icons.local_shipping_outlined,
          size: 25,
          color: context.theme.colors.white,
        )
      ],
    );

    if (order.status == Status.delivered || order.status == Status.canceled) {
      return [
        circleIcon,
        Expanded(
          child: line,
        ),
        Stack(
          alignment: Alignment.center,
          children: [
            Icon(
              Icons.circle,
              size: 45,
              color:
                  order.status == Status.delivered ? Colors.green : Colors.red,
            ),
            Icon(
              order.status == Status.delivered
                  ? CupertinoIcons.check_mark_circled
                  : CupertinoIcons.multiply_circle,
              size: 22,
              color: context.theme.colors.white,
            ),
          ],
        ),
      ];
    }

    if (order.status == Status.delivering) {
      return [
        circleIcon,
        Expanded(
          child: Stack(
            alignment: Alignment.center,
            children: [
              line,
              deliveryIcon,
            ],
          ),
        ),
        circleIcon,
      ];
    }

    return [
      const Stack(
        alignment: Alignment.center,
        children: [
          Icon(
            Icons.circle,
            size: 45,
            color: Colors.grey,
          ),
          Icon(
            Icons.schedule_outlined,
            size: 22,
            color: Colors.white,
          ),
        ],
      ),
      Expanded(
        child: line,
      ),
      circleIcon,
    ];
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        OrderScreen.navigateTo(context, order: order);
      },
      child: Container(
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
            Row(
              children: [
                Expanded(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.person_pin_circle_sharp,
                        size: 30,
                        color: context.theme.colors.primary,
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      const Text(
                        "John Doe",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                const Icon(
                  Icons.arrow_forward_ios_outlined,
                  size: 20,
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildDateAddress(
                  context,
                  order.getPickupTime(),
                  order.pickupAddress.city,
                ),
                _buildDateAddress(
                  context,
                  order.getDeliverTime(),
                  order.deliveryAddress.city,
                  alignEnd: true,
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ..._buildTracking(context),
              ],
            )
          ],
        ),
      ),
    );
  }
}
