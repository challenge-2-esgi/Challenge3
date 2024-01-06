import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/core/services/location_service.dart';
import 'package:mobile/deliverer/blocs/order_bloc.dart';
import 'package:mobile/deliverer/deliverer_home_view.dart';
import 'package:mobile/deliverer/deliverer_profile.dart';
import 'package:mobile/deliverer/delivering/delivering_view.dart';
import 'package:mobile/deliverer/orders_view.dart';
import 'package:mobile/home/blocs/user_bloc.dart';
import 'package:mobile/shared/custom_error_widget.dart';
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

  static final List<Widget> _errorViews = [
    const Center(
      child: CustomErrorWidget(),
    ),
    const Center(
      child: CustomErrorWidget(),
    ),
    const DelivererProfile(),
  ];

  static final List<Widget> _deliveringViews = [
    const DeliveringView(),
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
    return BlocProvider(
      create: (context) => OrderBloc()
        ..add(
          OrdersLoaded(),
        ),
      child: BlocBuilder<OrderBloc, OrderState>(
        builder: (context, state) {
          if (state.status == OrderStateStatus.loading) {
            return const Scaffold(
              body: SafeArea(
                child: Center(
                  child: CircularProgressIndicator(),
                ),
              ),
            );
          }

          return Scaffold(
            bottomNavigationBar: BottomNavigationBar(
              items: [
                BottomNavigationBarItem(
                  icon: Icon(
                    state.isDelivering
                        ? Icons.local_shipping_rounded
                        : Icons.home,
                  ),
                  label: state.isDelivering ? 'Livraison' : 'Accueil',
                ),
                const BottomNavigationBarItem(
                  icon: Icon(
                    Icons.shopping_bag,
                  ),
                  label: 'Courses',
                ),
                const BottomNavigationBarItem(
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
            body: state.status == OrderStateStatus.success
                ? state.isDelivering
                    ? _deliveringViews.elementAt(_selectedIndex)
                    : _views.elementAt(_selectedIndex)
                : _errorViews.elementAt(_selectedIndex),
          );
        },
      ),
    );
  }
}
