import 'package:flutter/material.dart';

class DelivererProfile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profil du Livreur'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Informations sur le Livreur',
              style: Theme.of(context).textTheme.headline6,
            ),
            //
          ],
        ),
      ),
    );
  }
}
