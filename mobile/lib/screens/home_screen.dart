import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/screens/login/login_screen.dart';

// TODO: change content
class HomeScreen extends StatelessWidget {
  static const routeName = "home";

  const HomeScreen({super.key});

  static navigateTo(BuildContext context) {
    Navigator.of(context).pushNamed(routeName);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Ecran d'accueil"),
      ),
      body: BlocBuilder<AuthBloc, AuthState>(
        builder: (context, state) => Center(
          child: ElevatedButton(
            onPressed: () {
              context.read<AuthBloc>().add(AuthLogout());
              LoginScreen.navigateTo(context);
            },
            child: const Text('Logout'),
          ),
        ),
      ),
    );
  }
}
