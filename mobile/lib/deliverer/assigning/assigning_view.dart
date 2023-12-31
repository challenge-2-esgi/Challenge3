import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/core/services/sse_service.dart';
import 'package:mobile/deliverer/assigning/order_item.dart';
import 'package:mobile/home/blocs/user_bloc.dart';

class AssigningView extends StatefulWidget {
  const AssigningView({super.key});

  @override
  State<AssigningView> createState() => _AssigningViewState();
}

class _AssigningViewState extends State<AssigningView> {
  List<Order> _orders = [];

  @override
  void initState() {
    super.initState();
    if (context.read<UserBloc>().state.user!.isActive == true) {
      ApiService.instance.getAvailableOrders().then(
        (orders) {
          setState(() {
            _orders = orders;
          });
          SseService.instance.subscribe(
            SseEvent.newOrder,
            (data) {
              setState(() {
                _orders = [Order.fromJson(data), ..._orders];
              });
            },
          );
        },
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
    return BlocListener<UserBloc, UserState>(
      listener: (context, state) {
        if (state.user!.isActive == false) {
          SseService.instance.close();
        }
      },
      child: ListView.builder(
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(
              vertical: 10,
              horizontal: 2.0,
            ),
            child: OrderItem(
              order: _orders[index],
              onRefuse: (order) {
                setState(() {
                  _orders = _orders
                      .where((element) => element.id != order.id)
                      .toList();
                });
              },
              onAccept: (order) {},
            ),
          );
        },
        itemCount: _orders.length,
      ),
    );
  }
}
