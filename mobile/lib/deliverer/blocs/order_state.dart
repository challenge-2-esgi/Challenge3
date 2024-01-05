part of 'order_bloc.dart';

enum OrderStateStatus {
  loading,
  success,
  error,
}

enum OrderStepStatus {
  loading,
  success,
  error,
}

class OrderState {
  final OrderStateStatus status;
  final OrderStepStatus stepStatus;
  final List<Order> orders;
  final Order? ongoingOrder;
  final bool isDelivering;

  OrderState({
    this.status = OrderStateStatus.loading,
    this.stepStatus = OrderStepStatus.success,
    this.ongoingOrder,
    required this.orders,
    required this.isDelivering,
  });

  OrderState copyWith({
    OrderStateStatus? status,
    OrderStepStatus? stepStatus,
    List<Order>? orders,
    Order? ongoingOrder,
    bool? isDelivering,
  }) {
    return OrderState(
      status: status ?? this.status,
      stepStatus: stepStatus ?? this.stepStatus,
      orders: orders ?? this.orders,
      ongoingOrder: ongoingOrder ?? this.ongoingOrder,
      isDelivering: isDelivering ?? this.isDelivering,
    );
  }
}
