part of 'auth_bloc.dart';

enum AuthStatus {
  initial,
  loading,
  success,
}

enum AuthScreen {
  login,
  register,
}

class AuthState {
  final AuthStatus status;
  final bool isAuthenticated;
  final AuthScreen screen;

  AuthState({
    this.status = AuthStatus.initial,
    this.isAuthenticated = false,
    this.screen = AuthScreen.login,
  });

  AuthState copyWith({
    AuthStatus? status,
    bool? isAuthenticated,
    AuthScreen? screen,
  }) {
    return AuthState(
      status: status ?? this.status,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      screen: screen ?? this.screen,
    );
  }
}
