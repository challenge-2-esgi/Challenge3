import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/theme/app_theme.dart';

class ComplaintForm extends StatefulWidget {
  final Order order;
  final Function() onComplaintSent;

  const ComplaintForm({
    super.key,
    required this.order,
    required this.onComplaintSent,
  });

  @override
  State<ComplaintForm> createState() => _ComplaintFormState();
}

class _ComplaintFormState extends State<ComplaintForm> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool _loading = false;

  void _showError(String message) {
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

  Future<void> _onSubmit() async {
    final isValid = _formKey.currentState?.saveAndValidate() ?? false;
    FocusScope.of(context).unfocus();
    if (isValid) {
      setState(() {
        _loading = true;
      });
      try {
        await ApiService.instance.sendComplaint({
          "subject": _formKey.currentState?.value["subject"],
          "content": _formKey.currentState?.value["content"],
          "orderId": widget.order.id,
        });
        widget.onComplaintSent();
      } on Exception catch (e) {
        log("error on sending complaint ${e.toString()}");
        _showError("erreur lors de l'envoi de la réclamation");
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
              "Objet",
              style: TextStyle(
                fontSize: 14,
                color: context.theme.colors.black,
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            FormBuilderTextField(
              name: "subject",
              keyboardType: TextInputType.text,
              validator: FormBuilderValidators.compose(
                [
                  FormBuilderValidators.required(
                    errorText: "l'objet est obligatoire",
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40.0),
            Text(
              "Message",
              style: TextStyle(
                fontSize: 14,
                color: context.theme.colors.black,
              ),
            ),
            const SizedBox(
              height: 8,
            ),
            FormBuilderTextField(
              name: "content",
              keyboardType: TextInputType.multiline,
              maxLines: 5,
              textInputAction: TextInputAction.newline,
              validator: FormBuilderValidators.compose(
                [
                  FormBuilderValidators.required(
                    errorText: "le message est obligatoire",
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _onSubmit,
                child: _loading
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                        ),
                      )
                    : const Text("Envoyer"),
              ),
            )
          ],
        ),
      ),
    );
  }
}
