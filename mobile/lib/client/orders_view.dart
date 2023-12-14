import 'package:badges/badges.dart' as badges;
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/client/blocs/order_bloc.dart';
import 'package:mobile/client/order/order_status_dialog.dart';
import 'package:mobile/client/order_item.dart';
import 'package:mobile/shared/custom_error_widget.dart';

class OrdersView extends StatelessWidget {
  const OrdersView({super.key});

  void _showPopup(BuildContext context) {
    showDialog(
      context: context,
      builder: (innerContext) {
        return BlocProvider.value(
          value: context.read<OrderBloc>(),
          child: BlocBuilder<OrderBloc, OrderState>(
            builder: (context, state) =>
                OrderStatusDialog(selectedStatuses: state.selectedStatuses),
          ),
        );
      },
    );
  }

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
            if (state.status == OrderStateStatus.loading) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }

            if (state.status == OrderStateStatus.success) {
              return Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 20,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Mes Colis",
                          style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        badges.Badge(
                          position: badges.BadgePosition.topEnd(
                            top: 2,
                            end: 2,
                          ),
                          showBadge: state.selectedStatuses.isNotEmpty,
                          badgeContent: Text(
                            "${state.selectedStatuses.length}",
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          child: IconButton(
                            onPressed: () {
                              _showPopup(context);
                            },
                            icon: const Icon(
                              Icons.tune_sharp,
                              size: 25,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  state.filteredOrders.isEmpty
                      ? const SizedBox(
                          height: 400,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.find_in_page_rounded,
                                color: Colors.grey,
                                size: 60,
                              ),
                              SizedBox(height: 8),
                              Text(
                                "Aucun colis trouvé.",
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        )
                      : Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(
                              left: 10,
                              right: 10,
                            ),
                            child: ListView.builder(
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: OrderItem(
                                    order: state.filteredOrders[index],
                                  ),
                                );
                              },
                              itemCount: state.filteredOrders.length,
                            ),
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
