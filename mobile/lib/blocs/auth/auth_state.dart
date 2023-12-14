part of 'auth_bloc.dart';

enum AuthStatus {
  initial,
  loading,
  success,
}

class AuthState {
  final AuthStatus status;
  final bool isAuthenticated;

  AuthState({this.status = AuthStatus.initial, this.isAuthenticated = false});

  AuthState copyWith({AuthStatus? status, bool? isAuthenticated}) {
    return AuthState(
      status: status ?? this.status,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}
