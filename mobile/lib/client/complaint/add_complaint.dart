import 'package:flutter/material.dart';
import 'package:mobile/client/complaint/complaint_form.dart';
import 'package:mobile/core/models/order.dart';

class AddComplaintArguments {
  final Order order;
  final Function() onAdded;

  AddComplaintArguments({required this.order, required this.onAdded});
}

class AddComplaintScreen extends StatelessWidget {
  static const routeName = "add-complaint";

  static navigateTo(BuildContext context, AddComplaintArguments arguments) {
    Navigator.of(context).pushNamed(routeName, arguments: arguments);
  }

  final Order order;
  final Function() onAdded;

  const AddComplaintScreen({
    super.key,
    required this.order,
    required this.onAdded,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(
              height: 10.0,
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () {
                    Navigator.maybePop(context);
                  },
                ),
                const Text(
                  "Réclamation",
                  style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            Expanded(
              child: SingleChildScrollView(
                child: ComplaintForm(
                  order: order,
                  onComplaintSent: onAdded,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
