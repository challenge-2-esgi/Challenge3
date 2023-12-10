import 'package:flutter/material.dart';
import 'package:mobile/theme/app_theme.dart';

class CustomErrorWidget extends StatelessWidget {
  const CustomErrorWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(
          Icons.error_outlined,
          color: Color(0xffEA4E2C),
          size: 50.0,
        ),
        const SizedBox(height: 16.0),
        Text(
          "Uh oh, quelque chose s'est mal passé",
          style: TextStyle(
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            color: context.theme.colors.black,
          ),
        ),
        const SizedBox(height: 10.0),
        Text(
          'Désolé ! Il y a eu un problème avec votre demande',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 14.0,
            color: context.theme.colors.body,
          ),
        ),
      ],
    );
  }
}
