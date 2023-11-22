import 'package:flutter/material.dart';
import 'package:mobile/core/services/api/api_service.dart';
import 'package:mobile/screens/login/login_form.dart';

class LoginScreen extends StatelessWidget {
  final api = ApiService();

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: LoginForm(onSubmit: api.user.login),
      ),
    );
  }
}
