import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/client/orders_view.dart';
import 'package:mobile/theme/app_theme.dart';

class ClientHomeScreen extends StatefulWidget {
  const ClientHomeScreen({super.key});

  @override
  State<ClientHomeScreen> createState() => _ClientHomeScreenState();
}

class _ClientHomeScreenState extends State<ClientHomeScreen> {
  static const List<Widget> _views = [
    OrderView(),
    OrderView(),
  ];

  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.map_outlined,
            ),
            label: 'Suivi',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.calendar_today,
            ),
            label: 'Mes Commandes',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: context.theme.colors.primary,
        onTap: (value) {
          setState(() {
            _selectedIndex = value;
          });
        },
      ),
      floatingActionButton: (() {
        if (_selectedIndex == 1) {
          return FloatingActionButton(
            onPressed: () {},
            backgroundColor: context.theme.colors.primary,
            child: const Icon(Icons.add),
          );
        }
        return FloatingActionButton(
          onPressed: () {
            context.read<AuthBloc>().add(AuthLogout());
          },
          backgroundColor: context.theme.colors.primary,
          child: const Icon(Icons.logout_rounded),
        );
      }()),
      body: _views.elementAt(_selectedIndex),
    );
  }
}
