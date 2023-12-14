part of 'order_bloc.dart';

sealed class OrderState {}

class OrderInitial extends OrderState {}

class OrdersLoading extends OrderState {}

class OrdersLoadSuccess extends OrderState {
  final List<Order> orders;

  OrdersLoadSuccess({required this.orders});
}

class OrdersLoadError extends OrderState {}
