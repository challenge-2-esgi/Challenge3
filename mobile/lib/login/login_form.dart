import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/theme/app_theme.dart';

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
        final String token = await widget.apiService.login(
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
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 50),
        color: context.theme.colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Se connecter",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w500,
                color: context.theme.colors.black,
              ),
            ),
            const SizedBox(
              height: 60,
            ),
            Text(
              "Addresse mail",
              style: TextStyle(
                fontSize: 16,
                color: context.theme.colors.black,
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            FormBuilderTextField(
              name: "email",
              decoration: const InputDecoration(
                hintText: "saisir votre addresse mail",
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
              height: 30,
            ),
            Text(
              "Mot de passe",
              style: TextStyle(
                fontSize: 16,
                color: context.theme.colors.black,
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            FormBuilderTextField(
              name: "password",
              decoration: InputDecoration(
                hintText: 'saisir votre mot de passe',
                suffixIcon: IconButton(
                  onPressed: _toggleEye,
                  icon: Icon(
                    _obscurePassword
                        ? CupertinoIcons.eye
                        : CupertinoIcons.eye_slash,
                  ),
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
            const SizedBox(
              height: 40,
            ),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
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
            ),
            const SizedBox(
              height: 20,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Vous n'avez pas de compte ?",
                  style: TextStyle(
                    fontSize: 16,
                    color: context.theme.colors.black,
                  ),
                ),
                const SizedBox(
                  width: 5,
                ),
                GestureDetector(
                  onTap: () => context
                      .read<AuthBloc>()
                      .add(AuthScreenChanged(screen: AuthScreen.register)),
                  child: Text(
                    "S'inscrire",
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: context.theme.colors.primary,
                    ),
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
