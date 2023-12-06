import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/main/main_screen.dart';
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
        home: const MainScreen(),
        onGenerateRoute: (settings) {
          // TODO: add routes
          // switch (settings.name) {
          // }

          // TODO: add not found screen
          return null;
        },
      ),
    );
  }
}
