part of 'auth_bloc.dart';

sealed class AuthEvent {}

class AuthTokenLoaded extends AuthEvent {}

class AuthLogin extends AuthEvent {
  final String token;

  AuthLogin({required this.token});
}

class AuthLogout extends AuthEvent {}
