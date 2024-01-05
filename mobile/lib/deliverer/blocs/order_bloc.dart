import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/api_service.dart';

part 'order_event.dart';

part 'order_state.dart';

class OrderBloc extends Bloc<OrderEvent, OrderState> {
  OrderBloc() : super(OrderState(orders: [], isDelivering: false)) {
    on<OrdersLoaded>((event, emit) async {
      try {
        final orders = await ApiService.instance.getOrders();
        orders.sort(
          (a, b) => b.createdAt.compareTo(a.createdAt),
        );

        final ongoingOrders = orders
            .where((element) =>
                element.status == Status.waitingForPickUp ||
                element.status == Status.delivering)
            .toList();

        emit(
          state.copyWith(
            status: OrderStateStatus.success,
            orders: orders,
            ongoingOrder:
                ongoingOrders.isEmpty ? null : ongoingOrders.elementAt(0),
            isDelivering: ongoingOrders.isNotEmpty,
          ),
        );
      } catch (e) {
        emit(
          OrderState(
            status: OrderStateStatus.error,
            orders: [],
            ongoingOrder: null,
            isDelivering: false,
          ),
        );
      }
    });

    on<OrderAssigned>((event, emit) {
      emit(
        state.copyWith(
          ongoingOrder: event.order.copyWith(status: Status.waitingForPickUp),
          isDelivering: true,
          orders: [
            event.order.copyWith(status: Status.waitingForPickUp),
            ...state.orders
          ],
        ),
      );
    });

    on<OrderStepValidated>((event, emit) async {
      emit(state.copyWith(stepStatus: OrderStepStatus.loading));

      if (state.ongoingOrder == null) {
        emit(state.copyWith(stepStatus: OrderStepStatus.error));
      } else {
        try {
          await ApiService.instance.updateOrderStatus(
            event.order.id,
            event.order.nextStatus,
          );

          final orders = state.orders
              .where((element) => element.id != event.order.id)
              .toList();

          emit(
            state.copyWith(
              stepStatus: OrderStepStatus.success,
              ongoingOrder: state.ongoingOrder!.copyWith(
                status: event.order.nextStatus,
              ),
              orders: [
                state.ongoingOrder!.copyWith(
                  status: event.order.nextStatus,
                ),
                ...orders,
              ],
            ),
          );
        } catch (e) {
          emit(state.copyWith(stepStatus: OrderStepStatus.error));
        }
      }
    });

    on<OrderDelivered>(
      (event, emit) => emit(
        state.copyWith(isDelivering: false),
      ),
    );
  }
}
