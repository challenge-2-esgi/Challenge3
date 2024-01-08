import 'package:flutter/material.dart';

// Define a custom Form widget.
class ValidationForm extends StatefulWidget {
  final String? validationCode;
  final Function() onValidated;
  const ValidationForm({super.key, required this.validationCode, required this.onValidated});

  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Define a corresponding State class.
// This class holds data related to the form.
class MyCustomFormState extends State<ValidationForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a `GlobalKey<FormState>`,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          TextFormField(
            decoration: const InputDecoration(
              hintText: 'Code de validation client',
              fillColor: Colors.black,
            ),
            validator: (value) {
              print("BLABLA");
              print(widget.validationCode);
              if (value == null || value.isEmpty) {
                return 'Veuillez entrer le code de validation';
              }
              if (value != widget.validationCode) {
                return 'Code de validation incorrect';
              }
              return null;
            },
          ),
          ElevatedButton(
            onPressed: () {
              // Validate returns true if the form is valid, or false otherwise.
              if (_formKey.currentState!.validate()) {
                // If the form is valid, display a snackbar. In the real world,
                // you'd often call a server or save the information in a database.
                /*ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Valider la commande')),
                );*/
                widget.onValidated();
              }
            },
            child: const Text('Valider'),
          ),
        ],
      ),
    );
  }
}
