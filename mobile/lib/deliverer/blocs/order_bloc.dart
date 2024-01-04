import 'dart:developer';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/api_service.dart';

part 'order_event.dart';

part 'order_state.dart';

class OrderBloc extends Bloc<OrderEvent, OrderState> {
  OrderBloc() : super(OrderInitial()) {
    on<OrdersLoaded>((event, emit) async {
      emit(OrdersLoading());
      try {
        final orders = await ApiService.instance.getOrders();
        emit(OrdersLoadSuccess(orders: orders));
      } catch (e) {
        log(e.toString());
        emit(OrdersLoadError());
      }
    });
  }
}
