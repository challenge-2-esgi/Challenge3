part of 'order_bloc.dart';

sealed class OrderEvent {}

class OrdersLoaded extends OrderEvent {}

class OrdersFiltered extends OrderEvent {
  final Status status;

  OrdersFiltered({required this.status});
}
