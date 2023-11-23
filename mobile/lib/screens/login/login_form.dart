import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:mobile/core/services/api/api_service.dart';

class LoginForm extends StatefulWidget {
  final ApiService apiService;
  void Function(String token) onLoggedIn;

  LoginForm({super.key, required this.apiService, required this.onLoggedIn});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool _obscurePassword = true;
  bool _loading = false;

  _toggleEye() {
    setState(() {
      _obscurePassword = !_obscurePassword;
    });
  }

  _showError(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        content: Text(
          message,
          style: const TextStyle(
            color: Colors.redAccent,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text(
              'OK',
              style: TextStyle(
                color: Colors.redAccent,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future _onSubmit() async {
    var isValid = _formKey.currentState?.saveAndValidate() ?? false;
    FocusScope.of(context).unfocus();
    if (isValid) {
      setState(() {
        _loading = true;
      });
      try {
        final String token = await widget.apiService.user.login(
          _formKey.currentState?.value["email"],
          _formKey.currentState?.value["password"],
        );
        widget.onLoggedIn(token);
      } on Exception {
        _showError("Addresse mail ou mot de passe incorrect !");
      } finally {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return FormBuilder(
      key: _formKey,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 50),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            FormBuilderTextField(
              name: "email",
              decoration: const InputDecoration(
                labelText: "Addresse mail",
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
              validator: FormBuilderValidators.compose(
                [
                  FormBuilderValidators.required(
                      errorText: "L'addresse mail est obligatoire"),
                  FormBuilderValidators.email(
                      errorText: "Addresse mail non valide"),
                ],
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            FormBuilderTextField(
              name: "password",
              decoration: InputDecoration(
                labelText: "Mot de passe",
                border: const OutlineInputBorder(),
                suffixIcon: IconButton(
                  onPressed: _toggleEye,
                  icon: Icon(_obscurePassword
                      ? CupertinoIcons.eye_slash
                      : CupertinoIcons.eye),
                ),
              ),
              keyboardType: TextInputType.visiblePassword,
              obscureText: _obscurePassword,
              validator: FormBuilderValidators.compose(
                [
                  FormBuilderValidators.required(
                      errorText: "Le mot de passe est obligatoire"),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: _loading ? null : _onSubmit,
              child: _loading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                      ),
                    )
                  : const Text("S'identifier"),
            ),
          ],
        ),
      ),
    );
  }
}
