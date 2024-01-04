import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/core/services/location_service.dart';
import 'package:mobile/deliverer/deliverer_home_view.dart';
import 'package:mobile/deliverer/deliverer_profile.dart';
import 'package:mobile/deliverer/orders_view.dart';
import 'package:mobile/home/blocs/user_bloc.dart';
import 'package:mobile/theme/app_theme.dart';

class DelivererHomeScreen extends StatefulWidget {
  const DelivererHomeScreen({Key? key}) : super(key: key);

  @override
  State<DelivererHomeScreen> createState() => _DelivererHomeScreenState();
}

class _DelivererHomeScreenState extends State<DelivererHomeScreen> {
  static final List<Widget> _views = [
    const HomeView(),
    const OrderView(),
    const DelivererProfile(),
  ];

  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    LocationService.instance.requestPermission().then(
      (hasPermission) {
        if (hasPermission) {
          LocationService.instance.listen(
            (location) {
              if (context.read<UserBloc>().state.user?.delivererId != null) {
                ApiService.instance.updateDelivererLocation(
                  context.read<UserBloc>().state.user!.delivererId!,
                  location,
                );
              }
            },
          );
        }
      },
    );
  }

  @override
  void dispose() {
    LocationService.instance.cancel();
    super.dispose();
  }

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
              Icons.shopping_bag,
            ),
            label: 'Courses',
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
