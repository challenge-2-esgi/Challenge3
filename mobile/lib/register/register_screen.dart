import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/register/register_form.dart';
import 'package:mobile/theme/app_theme.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        body: SafeArea(
          child: Container(
            color: context.theme.colors.white,
            child: Column(
              children: [
                TabBar(
                  padding: const EdgeInsets.only(
                    top: 20.0,
                    left: 10.0,
                    right: 10.0,
                  ),
                  indicatorColor: context.theme.colors.primary,
                  labelStyle: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                  labelColor: context.theme.colors.primary,
                  unselectedLabelColor:
                      context.theme.colors.black!.withOpacity(0.7),
                  tabs: const [
                    Tab(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.person),
                          SizedBox(
                            width: 15,
                          ),
                          Text("Client"),
                        ],
                      ),
                    ),
                    Tab(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.directions_car),
                          SizedBox(
                            width: 15,
                          ),
                          Text("Livreur"),
                        ],
                      ),
                    ),
                  ],
                ),
                Expanded(
                  child: TabBarView(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 50),
                        child: RegisterForm(
                          role: Role.client,
                          onRegister: (token) {
                            context
                                .read<AuthBloc>()
                                .add(AuthLogin(token: token));
                            context.read<AuthBloc>().add(
                                AuthScreenChanged(screen: AuthScreen.login));
                          },
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 50),
                        child: RegisterForm(
                          role: Role.deliverer,
                          onRegister: (token) {
                            context
                                .read<AuthBloc>()
                                .add(AuthLogin(token: token));
                            context.read<AuthBloc>().add(
                                AuthScreenChanged(screen: AuthScreen.login));
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
