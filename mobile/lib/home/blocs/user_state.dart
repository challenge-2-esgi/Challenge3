part of 'user_bloc.dart';

enum UserStatus {
  initial,
  loading,
  success,
  error,
}

enum DelivererStatus {
  initial,
  loading,
  success,
  error,
}

class UserState {
  final UserStatus status;
  final DelivererStatus delivererStatus;
  final User? user;

  UserState({
    this.status = UserStatus.initial,
    this.delivererStatus = DelivererStatus.initial,
    this.user,
  });

  UserState copyWith(
      {UserStatus? status, DelivererStatus? delivererStatus, User? user}) {
    return UserState(
      status: status ?? this.status,
      delivererStatus: delivererStatus ?? this.delivererStatus,
      user: user ?? this.user,
    );
  }
}
