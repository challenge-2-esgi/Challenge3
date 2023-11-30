import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/login/login_screen.dart';
import 'package:mobile/theme/app_theme.dart';

void main() {
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
        routes: {
          '/': (context) => BlocBuilder<AuthBloc, AuthState>(
                builder: (context, state) {
                  if (state.status == AuthStatus.loading) {
                    return const Scaffold(
                      body: SafeArea(
                        child: Center(
                          child: CircularProgressIndicator(),
                        ),
                      ),
                    );
                  }

                  if (!state.isAuthenticated) {
                    return const LoginScreen();
                  }
                  return const HomeScreen();
                },
              ),
        },
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case HomeScreen.routeName:
              return MaterialPageRoute(
                builder: (_) => const HomeScreen(),
              );
            case LoginScreen.routeName:
              return MaterialPageRoute(
                builder: (_) => const LoginScreen(),
              );
          }

          // TODO: add not found screen
          return null;
        },
      ),
    );
  }
}
