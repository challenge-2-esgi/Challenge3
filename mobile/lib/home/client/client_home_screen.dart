import 'package:flutter/material.dart';
import 'package:mobile/client/add_order_screen.dart';
import 'package:mobile/client/client_profile.dart';
import 'package:mobile/client/orders_view.dart';
import 'package:mobile/theme/app_theme.dart';

class ClientHomeScreen extends StatefulWidget {
  const ClientHomeScreen({super.key});

  @override
  State<ClientHomeScreen> createState() => _ClientHomeScreenState();
}

class _ClientHomeScreenState extends State<ClientHomeScreen> {
  List<Widget> _views = [];
  int _selectedIndex = 0;

  @override
  void initState() {
    _selectedIndex = 0;
    _views = [
      const OrdersView(),
      AddOrderView(
        onAdded: () {
          setState(() {
            _selectedIndex = 0;
          });
        },
      ),
      const ClientProfile(),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.shopping_bag_rounded,
            ),
            label: 'Mes Colis',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.local_shipping_rounded,
              size: 30,
            ),
            label: 'Envoyer un colis',
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
