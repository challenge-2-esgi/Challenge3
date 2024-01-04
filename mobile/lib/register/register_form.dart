import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:mobile/blocs/auth/auth_bloc.dart';
import 'package:mobile/core/models/user.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/theme/app_theme.dart';

class RegisterForm extends StatefulWidget {
  final Role role;
  void Function(String token) onRegister;

  RegisterForm({
    super.key,
    required this.role,
    required this.onRegister,
  });

  @override
  State<RegisterForm> createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
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
        if (widget.role == Role.client) {
          await ApiService.instance.registerClient(
            firstname: _formKey.currentState?.value["firstname"],
            lastname: _formKey.currentState?.value["lastname"],
            email: _formKey.currentState?.value["email"],
            password: _formKey.currentState?.value["password"],
            role: User.roleToString(widget.role),
          );
        } else {
          await ApiService.instance.registerDeliverer(
            firstname: _formKey.currentState?.value["firstname"],
            lastname: _formKey.currentState?.value["lastname"],
            email: _formKey.currentState?.value["email"],
            password: _formKey.currentState?.value["password"],
            phone: _formKey.currentState?.value["phone"],
            role: User.roleToString(widget.role),
          );
        }
        final String token = await ApiService.instance.login(
          _formKey.currentState?.value["email"],
          _formKey.currentState?.value["password"],
        );
        widget.onRegister(token);
      } on Exception {
        _showError("Désolé ! Il y a eu un problème avec votre demande");
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
      child: ListView(
        children: [
          Text(
            "Nom",
            style: TextStyle(
              fontSize: 14,
              color: context.theme.colors.black,
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          FormBuilderTextField(
            name: "lastname",
            keyboardType: TextInputType.text,
            validator: FormBuilderValidators.compose(
              [
                FormBuilderValidators.required(
                  errorText: "le nom est obligatoire",
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Text(
            "Prénom",
            style: TextStyle(
              fontSize: 14,
              color: context.theme.colors.black,
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          FormBuilderTextField(
            name: "firstname",
            keyboardType: TextInputType.text,
            validator: FormBuilderValidators.compose(
              [
                FormBuilderValidators.required(
                  errorText: "le prénom est obligatoire",
                ),
              ],
            ),
          ),
          if (widget.role == Role.deliverer) ...[
            const SizedBox(
              height: 20,
            ),
            Text(
              "Numéro de téléphone",
              style: TextStyle(
                fontSize: 14,
                color: context.theme.colors.black,
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            FormBuilderTextField(
              name: "phone",
              keyboardType: TextInputType.phone,
              validator: FormBuilderValidators.compose(
                [
                  FormBuilderValidators.required(
                    errorText: "le numéro de téléphone est obligatoire",
                  ),
                  FormBuilderValidators.equalLength(10,
                      errorText: "numéro de téléphone non valide"),
                  FormBuilderValidators.numeric(
                    errorText: "numéro de téléphone non valide",
                  ),
                ],
              ),
            ),
          ],
          const SizedBox(
            height: 20,
          ),
          Text(
            "Adresse mail",
            style: TextStyle(
              fontSize: 14,
              color: context.theme.colors.black,
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          FormBuilderTextField(
            name: "email",
            keyboardType: TextInputType.emailAddress,
            validator: FormBuilderValidators.compose(
              [
                FormBuilderValidators.required(
                  errorText: "l'adresse mail est obligatoire",
                ),
                FormBuilderValidators.email(
                  errorText: "adresse mail non valide",
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 30,
          ),
          Text(
            "Mot de passe",
            style: TextStyle(
              fontSize: 14,
              color: context.theme.colors.black,
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          FormBuilderTextField(
            name: "password",
            decoration: InputDecoration(
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
                  : const Text("S'inscrire"),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Vous avez déjà un compte ?",
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
                    .add(AuthScreenChanged(screen: AuthScreen.login)),
                child: Text(
                  "S'identifier",
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
    );
  }
}
