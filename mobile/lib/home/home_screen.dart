import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/home/blocs/user_bloc.dart';
import 'package:mobile/home/client/client_home_screen.dart';
import 'package:mobile/home/deliverer/deliverer_home_screen.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = "home";

  static navigateTo(BuildContext context) {
    Navigator.of(context).pushNamed(routeName);
  }

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => UserBloc()..add(UserLoaded()),
      child: BlocBuilder<UserBloc, UserState>(
        builder: (context, state) {
          if (state.status == UserStatus.initial ||
              state.status == UserStatus.loading) {
            return const Scaffold(
              body: SafeArea(
                child: Center(
                  child: CircularProgressIndicator(),
                ),
              ),
            );
          }

          if (state.status == UserStatus.success) {
            final user = state.user;
            if (user != null) {
              switch (user.role) {
                case 'CLIENT':
                  return const ClientHomeScreen();
                case 'DELIVERER':
                  return const DelivererHomeScreen();
              }
            }
          }

          return Scaffold(
            body: SafeArea(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "500",
                      style: TextStyle(
                        fontSize: 64,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "Uh oh, quelque chose s'est mal passé",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(
                      height: 4.0,
                    ),
                    const Text(
                      "Désolé ! Il y a eu un problème avec votre demande",
                      style: TextStyle(
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(
                      height: 32,
                    ),
                    ElevatedButton.icon(
                      onPressed: () {
                        context.read<AuthBloc>().add(AuthLogout());
                      },
                      icon: const Icon(Icons.arrow_back),
                      label: const Text("Retour à l'accueil"),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
