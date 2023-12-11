part of 'user_bloc.dart';

sealed class UserEvent {}

class UserLoaded extends UserEvent {}

class UserUpdateAvailability extends UserEvent {
  final bool isActive;

  UserUpdateAvailability({required this.isActive});
}
