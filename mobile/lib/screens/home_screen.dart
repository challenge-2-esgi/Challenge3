import 'package:flutter/material.dart';
import 'package:mobile/core/providers/auth_provider.dart';
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
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            context.authProviderNoListen.logout();
            LoginScreen.navigateTo(context);
          },
          child: const Text('Logout'),
        ),
      ),
    );
  }
}
