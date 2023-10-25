import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/screens/home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _storage = const FlutterSecureStorage();
  final _formKey = GlobalKey<FormBuilderState>();
  bool _obscurePassword = true;
  bool _loading = false;

  _onSubmit() {
    var isValid = _formKey.currentState?.saveAndValidate() ?? false;
    FocusScope.of(context).unfocus();
    if (isValid) {
      _login(_formKey.currentState?.value["email"],
          _formKey.currentState?.value["password"]);
    }
  }

  _toggleEye() {
    setState(() {
      _obscurePassword = !_obscurePassword;
    });
  }

  _showError(String message) {
    var snackBar = SnackBar(
        backgroundColor: Colors.white,
        content: Text(
          message,
          style: const TextStyle(color: Colors.redAccent),
        ));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  Future _login(String email, String password) async {
    try {
      setState(() {
        _loading = true;
      });

      final res = await http.post(
        Uri.parse("http://10.0.2.2:3001/login"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body:
            jsonEncode(<String, String>{'email': email, 'password': password}),
      );

      debugPrint(res.statusCode.toString());
      if (res.statusCode == 200) {
        await _storage.write(
            key: "token", value: jsonDecode(res.body)['token']);
        // TODO: redirect on state management
        if (context.mounted) {
          Navigator.push(context,
              MaterialPageRoute(builder: (context) => const HomeScreen()));
        }
      } else if (res.statusCode == 401 || res.statusCode == 422) {
        _showError("Addresse mail ou mot de passe incorrect !");
      }
    } on Exception catch (e) {
      _showError("Veuillez réessayer ultérieurement");
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: FormBuilder(
              key: _formKey,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 50),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    FormBuilderTextField(
                      name: "email",
                      decoration: const InputDecoration(
                          labelText: "Addresse mail",
                          border: OutlineInputBorder()),
                      keyboardType: TextInputType.emailAddress,
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(
                            errorText: "L'addresse mail est obligatoire"),
                        FormBuilderValidators.email(
                            errorText: "Addresse mail non valide"),
                      ]),
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
                                  : CupertinoIcons.eye))),
                      keyboardType: TextInputType.visiblePassword,
                      obscureText: _obscurePassword,
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(
                            errorText: "Le mot de passe est obligatoire"),
                      ]),
                    ),
                    ElevatedButton(
                      onPressed: _loading ? null : _onSubmit,
                      child: _loading
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                              ))
                          : const Text("S'identifier"),
                    ),
                  ],
                ),
              ))),
    );
  }
}
