part of 'order_bloc.dart';

enum OrderStateStatus {
  loading,
  success,
  error,
}

class OrderState {
  final OrderStateStatus status;
  final List<Order> orders;
  final List<Status> selectedStatuses;

  OrderState({
    this.status = OrderStateStatus.loading,
    required this.orders,
    required this.selectedStatuses,
  });

  List<Order> get filteredOrders {
    if (selectedStatuses.isEmpty) {
      return orders;
    }

    return orders
        .where((element) => selectedStatuses.contains(element.status))
        .toList();
  }

  OrderState copyWith({
    OrderStateStatus? status,
    List<Order>? orders,
    List<Status>? selectedStatuses,
  }) {
    return OrderState(
      status: status ?? this.status,
      orders: orders ?? this.orders,
      selectedStatuses: selectedStatuses ?? this.selectedStatuses,
    );
  }
}
