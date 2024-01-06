import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/client/complaint/add_complaint.dart';
import 'package:mobile/client/order_screen.dart';
import 'package:mobile/home/home_screen.dart';
import 'package:mobile/login/login_screen.dart';
import 'package:mobile/register/register_screen.dart';
import 'package:mobile/theme/app_theme.dart';

Future<void> main() async {
  await dotenv.load();
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => AuthBloc()..add(AuthTokenLoaded()),
        )
      ],
      child: MaterialApp(
        title: 'Challenge',
        theme: AppTheme.themeData,
        home: BlocBuilder<AuthBloc, AuthState>(
          builder: (context, state) {
            if (!state.isAuthenticated && state.screen == AuthScreen.login) {
              return const LoginScreen();
            }

            if (!state.isAuthenticated && state.screen == AuthScreen.register) {
              return const RegisterScreen();
            }

            return const HomeScreen();
          },
        ),
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case HomeScreen.routeName:
              return MaterialPageRoute(
                builder: (context) => const HomeScreen(),
              );
            case OrderScreen.routeName:
              return MaterialPageRoute(
                builder: (context) => OrderScreen(
                  order: (settings.arguments as OrderScreenArguments).order,
                  onClose: (settings.arguments as OrderScreenArguments).onClose,
                ),
              );

            case AddComplaintScreen.routeName:
              return MaterialPageRoute(
                builder: (context) => AddComplaintScreen(
                  order: (settings.arguments as AddComplaintArguments).order,
                  onAdded:
                      (settings.arguments as AddComplaintArguments).onAdded,
                ),
              );
          }

          // TODO: add not found screen
          return null;
        },
      ),
    );
  }
}
