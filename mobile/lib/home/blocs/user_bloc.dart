import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/core/services/api/api_service.dart';

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
        emit(state.copyWith(status: UserStatus.error, user: null));
      }
    });

    on<UserUpdateAvailability>((event, emit) async {
      emit(state.copyWith(user: state.user?.copyWith(isActive: event.isActive)));

      try {
        final success = await ApiService.instance.updateDelivererAvailability(event.isActive);

        if (success) {
          emit(state.copyWith(status: UserStatus.success));
        } else {
          emit(state.copyWith(status: UserStatus.error));
        }
      } catch (e) {
        emit(state.copyWith(status: UserStatus.error));
      }
    });

  }
}
