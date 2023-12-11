import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/home/blocs/user_bloc.dart';

class DelivererProfile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      builder: (context, userState) {
        return Scaffold(
          appBar: AppBar(
            title: Center(child: const Text('Profil')),
          ),
          body: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: Colors.deepPurple, // Change background color
                  ),
                  onPressed: () {
                    context.read<AuthBloc>().add(AuthLogout());
                  },
                  child: Text('Déconnexion', style: TextStyle(color: Colors.white),),
                ),
                SizedBox(height: 40),
                if (userState.status == UserStatus.loading)
                // Loading state
                  CircularProgressIndicator(),
                if (userState.status == UserStatus.success)
                // Success state
                  _buildUserInfo(userState.user!),
                if (userState.status == UserStatus.error)
                // Error state
                  Text(
                    'Erreur lors du chargement du profil.',
                  ),
                SizedBox(height: 20),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildUserInfo(User user) {
    return Container(
      padding: EdgeInsets.all(16),
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
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.black54,
          ),
        ),
        SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const Divider(height: 20, thickness: 1, color: Colors.deepPurpleAccent),
      ],
    );
  }
}
