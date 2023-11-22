import 'package:flutter/material.dart';
import 'package:mobile/core/services/api/api_service.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/login/login_form.dart';

class LoginScreen extends StatelessWidget {
  static const routeName = "login";

  static navigateTo(BuildContext context) {
    Navigator.of(context).pushNamed(routeName);
  }

  final apiService = ApiService();

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: LoginForm(
          onLoggedIn: () {
            HomeScreen.navigateTo(context);
          },
          apiService: apiService,
        ),
      ),
    );
  }
}
