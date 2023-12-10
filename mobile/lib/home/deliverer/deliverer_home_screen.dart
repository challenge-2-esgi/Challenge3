import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/deliverer/deliverer_profile.dart';
import 'package:mobile/deliverer/orders_view.dart';
import 'package:mobile/theme/app_theme.dart';

class DelivererHomeScreen extends StatefulWidget {
  const DelivererHomeScreen({Key? key}) : super(key: key);

  @override
  State<DelivererHomeScreen> createState() => _DelivererHomeScreenState();
}

class _DelivererHomeScreenState extends State<DelivererHomeScreen> {
  static final List<Widget> _views = [
    OrderView(),
    const OrderView(),
    DelivererProfile(),
  ];

  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
            ),
            label: 'Accueil',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.calendar_today,
            ),
            label: 'Mes Commandes',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.person,
            ),
            label: 'Profil',
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
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.read<AuthBloc>().add(AuthLogout());
        },
        backgroundColor: context.theme.colors.primary,
        child: const Icon(Icons.logout_rounded),
      ),
      body: _views.elementAt(_selectedIndex),
    );
  }
}