import 'dart:developer';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/core/services/api_service.dart';

part 'user_event.dart';

part 'user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(UserState()) {
    on<UserLoaded>((event, emit) async {
      emit(UserState(status: UserStatus.loading));
      try {
        final user = await ApiService.instance.getLoggedInUser();
        emit(state.copyWith(status: UserStatus.success, user: user));
      } catch (e) {
        log("error on loading user ${e.toString()}");
        emit(state.copyWith(status: UserStatus.error, user: null));
      }
    });

    on<UserUpdateAvailability>((event, emit) async {
      emit(state.copyWith(delivererStatus: DelivererStatus.loading));
      try {
        await ApiService.instance
            .updateDelivererAvailability(event.delivererId, event.isActive);
        emit(
          state.copyWith(
            delivererStatus: DelivererStatus.success,
            user: state.user?.copyWith(isActive: event.isActive),
          ),
        );
      } catch (e) {
        emit(state.copyWith(delivererStatus: DelivererStatus.error));
      }
    });
  }
}
