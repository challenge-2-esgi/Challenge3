import 'package:flutter/material.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/core/services/api/api_service.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/login/login_form.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatelessWidget {
  static const routeName = "login";

  static navigateTo(BuildContext context) {
    Navigator.of(context).pushNamed(routeName);
  }

  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: LoginForm(
          onLoggedIn: (String token) {
            context.read<AuthBloc>().add(AuthLogin(token: token));
            HomeScreen.navigateTo(context);
          },
          apiService: ApiService.instance,
        ),
      ),
    );
  }
}
