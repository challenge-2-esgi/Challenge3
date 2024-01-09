import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/home/blocs/user_bloc.dart';
import 'package:mobile/deliverer/blocs/order_bloc.dart';

class DelivererProfile extends StatelessWidget {
  const DelivererProfile({Key? key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      builder: (context, userState) {
        return Scaffold(
          appBar: AppBar(
            title: const Center(child: Text('Profil')),
          ),
          body: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                  ),
                  onPressed: () {
                    context.read<AuthBloc>().add(AuthLogout());
                  },
                  icon: const Icon(Icons.exit_to_app, color: Colors.white),
                  label: const Text('Déconnexion', style: TextStyle(color: Colors.white)),
                ),
                const SizedBox(height: 8),
                const SizedBox(height: 8),
                _buildBadgeAndProgressBar(context),
                const SizedBox(height: 40),
                if (userState.status == UserStatus.loading)
                  const CircularProgressIndicator(),
                if (userState.status == UserStatus.success)
                  _buildUserInfo(userState.user!),
                if (userState.status == UserStatus.error)
                  const Text(
                    'Erreur lors du chargement du profil.',
                  ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildUserInfo(User user) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildDetail('Nom', user.lastname),
          _buildDetail('Prénom', user.firstname),
          _buildDetail('Email', user.email),
        ],
      ),
    );
  }

  Widget _buildDetail(String title, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$title:',
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.black54,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const Divider(height: 20, thickness: 1, color: Colors.deepPurpleAccent),
      ],
    );
  }

  Widget _buildBadgeAndProgressBar(BuildContext context) {
    final blocOrder = context.watch<OrderBloc>();

    final deliveredOrders = blocOrder.state.orders.where((order) => order.status == 'DELIVERED').toList();
    final totalOrdersDelivered = deliveredOrders.length;

    String badgeText;
    Color badgeColor;
    int nextBadgeThreshold;
    
    if (totalOrdersDelivered < 10) {
      badgeText = 'Bronze';
      badgeColor = Colors.brown;
      nextBadgeThreshold = 10;
    } else if (totalOrdersDelivered < 20) {
      badgeText = 'Silver';
      badgeColor = Colors.grey;
      nextBadgeThreshold = 20;
    } else {
      badgeText = 'Diamond';
      badgeColor = Colors.blue;
      nextBadgeThreshold = totalOrdersDelivered;
    }

    double progress = (totalOrdersDelivered / nextBadgeThreshold).clamp(0.0, 1.0);

    int deliveriesLeft = nextBadgeThreshold - totalOrdersDelivered;

    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: badgeColor,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            badgeText,
            style: const TextStyle(color: Colors.white),
          ),
        ),
        const SizedBox(height: 8),
        LinearProgressIndicator(
          value: progress,
          backgroundColor: Colors.grey.withOpacity(0.3),
        ),
        const SizedBox(height: 8),
        Text(
          'Il reste $deliveriesLeft livraisons pour le prochain badge',
          style: const TextStyle(fontSize: 16),
        ),
      ],
    );
  }
}
