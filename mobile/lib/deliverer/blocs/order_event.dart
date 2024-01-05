part of 'order_bloc.dart';

sealed class OrderEvent {}

class OrdersLoaded extends OrderEvent {}

class OrderAssigned extends OrderEvent {
  final Order order;

  OrderAssigned({required this.order});
}

class OrderStepValidated extends OrderEvent {
  final Order order;

  OrderStepValidated({required this.order});
}

class OrderDelivered extends OrderEvent {}
