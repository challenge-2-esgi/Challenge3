import 'package:flutter/material.dart';
import 'package:mobile/core/providers/api_provider.dart';
import 'package:mobile/core/providers/auth_provider.dart';
import 'package:mobile/core/services/storage_service.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/login/login_screen.dart';
import 'package:mobile/theme/app_theme.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(
          create: (context) => ApiProvider(),
        ),
        ChangeNotifierProvider(
          create: (context) => AuthProvider(storageService: StorageService()),
        )
      ],
      child: const AppWidget(),
    );
  }
}

class AppWidget extends StatelessWidget {
  const AppWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Challenge',
      theme: AppTheme.themeData,
      routes: {
        '/': (context) => context.authProvider.isAuthenticated
            ? const HomeScreen()
            : const LoginScreen(),
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
    );
  }
}
