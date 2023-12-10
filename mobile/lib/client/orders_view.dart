import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/client/blocs/order_bloc.dart';
import 'package:mobile/client/order_item.dart';
import 'package:mobile/shared/custom_error_widget.dart';
import 'package:mobile/theme/app_theme.dart';

class OrderView extends StatelessWidget {
  const OrderView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => OrderBloc()
        ..add(
          OrdersLoaded(),
        ),
      child: SafeArea(
        child: BlocBuilder<OrderBloc, OrderState>(
          builder: (context, state) {
            if (state is OrdersLoading || state is OrderInitial) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }

            if (state is OrdersLoadSuccess) {
              return state.orders.isEmpty
                  ? Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.warning_rounded,
                          color: context.theme.colors.primary,
                          size: 48,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          "aucune commande",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: context.theme.colors.primary,
                          ),
                        ),
                      ],
                    )
                  : Column(
                      children: [
                        Expanded(
                          child: ListView.builder(
                            itemBuilder: (context, index) {
                              return Padding(
                                padding: const EdgeInsets.all(10),
                                child: OrderItem(order: state.orders[index]),
                              );
                            },
                            itemCount: state.orders.length,
                          ),
                        ),
                      ],
                    );
            }

            return const Center(
              child: CustomErrorWidget(),
            );
          },
        ),
      ),
    );
  }
}
