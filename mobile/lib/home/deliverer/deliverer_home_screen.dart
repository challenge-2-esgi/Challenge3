import 'package:flutter/material.dart';
import 'package:mobile/deliverer/deliverer_home_view.dart';
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
    HomeView(),
    OrderView(),
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
      body: _views.elementAt(_selectedIndex),
    );
  }
}
