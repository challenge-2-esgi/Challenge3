part of 'user_bloc.dart';

sealed class UserEvent {}

class UserLoaded extends UserEvent {}

class UserUpdateAvailability extends UserEvent {
  final String delivererId;
  final bool isActive;

  UserUpdateAvailability({required this.delivererId, required this.isActive});
}
