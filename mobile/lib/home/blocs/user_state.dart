part of 'user_bloc.dart';

enum UserStatus {
  initial,
  loading,
  success,
  error,
}

class UserState {
  final UserStatus status;
  final User? user;

  UserState({this.status = UserStatus.initial, this.user});

  UserState copyWith({UserStatus? status, User? user}) {
    return UserState(
      status: status ?? this.status,
      user: user ?? this.user,
    );
  }
}
