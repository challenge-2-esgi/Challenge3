import 'package:flutter/material.dart';
import 'package:mobile/client/map_view.dart';
import 'package:mobile/client/order/order_item_tracking.dart';
import 'package:mobile/core/models/location.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/sse_service.dart';

class OrderScreenArguments {
  final Order order;
  final Function() onClose;

  OrderScreenArguments({required this.order, required this.onClose});
}

class OrderScreen extends StatefulWidget {
  static const routeName = "order_details";

  static navigateTo(BuildContext context, OrderScreenArguments arguments) {
    Navigator.of(context).pushNamed(routeName, arguments: arguments);
  }

  Order order;
  Function() onClose;

  OrderScreen({super.key, required this.order, required this.onClose});

  @override
  State<OrderScreen> createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  Location? _delivererLocation;
  late Order _order;

  @override
  void initState() {
    super.initState();
    _order = widget.order.copyWith();
    if (widget.order.deliverer != null) {
      _delivererLocation = Location(
        latitude: widget.order.deliverer!.latitude,
        longitude: widget.order.deliverer!.longitude,
      );
    }

    if (widget.order.status == Status.waitingForPickUp ||
        widget.order.status == Status.delivering) {
      SseService.instance.subscribe(
        SseEvent.orderLocation,
        (data) {
          setState(() {
            _delivererLocation = Location.fromJson(data);
          });
        },
        {"orderId": widget.order.id},
      );

      SseService.instance.subscribe(
        SseEvent.orderStatus,
        (data) {
          setState(() {
            _order = widget.order
                .copyWith(status: Order.stringToStatus(data['status']));
          });
        },
        {"orderId": widget.order.id},
      );
    }
  }

  @override
  void dispose() {
    SseService.instance.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            MapView(
              source: widget.order.pickupAddress,
              target: widget.order.deliveryAddress,
              shipper: _delivererLocation,
            ),
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Container(
                color: Colors.white.withOpacity(0.8),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back),
                      onPressed: () {
                        widget.onClose();
                        Navigator.maybePop(context);
                      },
                    ),
                    const Text(
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
                child: OrderItemTracking(order: _order),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
