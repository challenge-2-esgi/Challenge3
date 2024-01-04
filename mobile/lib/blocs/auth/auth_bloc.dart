import 'dart:developer';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/services/storage_service.dart';

part 'auth_event.dart';

part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthState()) {
    on<AuthTokenLoaded>(
      (event, emit) async {
        emit(AuthState(status: AuthStatus.loading, isAuthenticated: false));

        try {
          final token = await StorageService.instance.getToken();
          emit(
            state.copyWith(
                status: AuthStatus.success, isAuthenticated: token != null),
          );
        } catch (e) {
          log(e.toString());
        }
      },
    );

    on<AuthLogin>(
      (event, emit) async {
        await StorageService.instance.storeToken(event.token);
        emit(
          state.copyWith(status: AuthStatus.initial, isAuthenticated: true),
        );
      },
    );

    on<AuthLogout>(
      (event, emit) async {
        await StorageService.instance.removeToken();
        emit(
          state.copyWith(status: AuthStatus.initial, isAuthenticated: false),
        );
      },
    );

    on<AuthScreenChanged>(
      (event, emit) {
        emit(
          state.copyWith(screen: event.screen),
        );
      },
    );
  }
}
