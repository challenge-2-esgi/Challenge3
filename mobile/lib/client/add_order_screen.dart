import 'package:flutter/material.dart';
import 'package:mobile/client/order/order_form.dart';

class AddOrderView extends StatelessWidget {
  final Function() onAdded;

  const AddOrderView({super.key, required this.onAdded});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.all(20),
              child: Text(
                "Envoyer un colis",
                style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.only(left: 20, right: 20, bottom: 20),
                child: OrderForm(
                  onOrderAdded: () => onAdded(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
