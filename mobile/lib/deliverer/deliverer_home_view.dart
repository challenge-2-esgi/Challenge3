import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/deliverer/assigning/assigning_view.dart';
import 'package:mobile/home/blocs/user_bloc.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  HomeViewState createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      builder: (context, userState) {
        bool isAvailable = userState.user?.isActive ?? false;

        return Scaffold(
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'Disponible pour le travail',
                        style: TextStyle(fontSize: 20),
                      ),
                      Switch(
                        value: isAvailable,
                        onChanged: (value) {
                          context.read<UserBloc>().add(UserUpdateAvailability(
                              delivererId: userState.user!.delivererId ?? "",
                              isActive: value));
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Text(
                    isAvailable
                        ? 'Vous êtes actuellement disponible et ouvert à de nouvelles missions. Vous recevrez des notifications pour des opportunités de livraison.'
                        : 'Vous n\'êtes pas actuellement disponible pour le travail. Activez la disponibilité pour voir les missions disponibles et pour recevoir des notifications.',
                    style: TextStyle(
                      fontSize: 16,
                      color: isAvailable ? Colors.green : Colors.red,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 40.0,
                  ),
                  if (context.read<UserBloc>().state.user!.isActive == true)
                    const Expanded(
                      child: AssigningView(),
                    ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
