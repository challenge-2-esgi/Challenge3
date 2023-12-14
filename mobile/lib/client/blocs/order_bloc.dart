import 'dart:developer';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/api/api_service.dart';

part 'order_event.dart';

part 'order_state.dart';

class OrderBloc extends Bloc<OrderEvent, OrderState> {
  OrderBloc() : super(OrderState(orders: [], selectedStatuses: [])) {
    on<OrdersLoaded>((event, emit) async {
      try {
        final orders = await ApiService.instance.getOrders();
        orders.sort(
          (a, b) => b.createdAt.compareTo(a.createdAt),
        );
        emit(
          state.copyWith(
            status: OrderStateStatus.success,
            orders: orders,
            selectedStatuses: [Status.waitingForPickUp],
          ),
        );
      } catch (e) {
        log(e.toString());
        emit(
          OrderState(
            status: OrderStateStatus.error,
            orders: [],
            selectedStatuses: [],
          ),
        );
      }
    });

    on<OrdersFiltered>((event, emit) {
      if (state.selectedStatuses.contains(event.status)) {
        emit(
          state.copyWith(
            selectedStatuses: List.of(state.selectedStatuses)
                .where((element) => element != event.status)
                .toList(),
          ),
        );
      } else {
        emit(
          state.copyWith(
            selectedStatuses: [...state.selectedStatuses, event.status],
          ),
        );
      }
    });
  }
}
