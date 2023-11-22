import 'package:flutter/material.dart';
import 'package:mobile/screens/login/login_screen.dart';

// TODO: change content
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static navigateTo(BuildContext context) {
    Navigator.of(context).pushNamed("/");
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
            LoginScreen.navigateTo(context);
          },
          child: const Text('Retour !'),
        ),
      ),
    );
  }
}
