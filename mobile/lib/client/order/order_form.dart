import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:mobile/core/models/address.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/core/services/geoapify_service.dart';
import 'package:mobile/theme/app_theme.dart';

class OrderForm extends StatefulWidget {
  final Function() onOrderAdded;

  const OrderForm({
    super.key,
    required this.onOrderAdded,
  });

  @override
  State<OrderForm> createState() => _OrderFormState();
}

class _OrderFormState extends State<OrderForm> {
  final _formKey = GlobalKey<FormBuilderState>();

  final _pickupAddressController = TextEditingController();
  final _deliveryAddressController = TextEditingController();

  bool _loading = false;
  Address? _pickupAddress;
  Address? _deliveryAddress;

  @override
  void dispose() {
    _pickupAddressController.dispose();
    _deliveryAddressController.dispose();
    super.dispose();
  }

  Future<List<Address>> _autoCompleteAddress(String text) async {
    try {
      return await GeoapifyService.instance.autoComplete(text);
    } on Exception catch (e) {
      log("can not autocomplete given address\n${e.toString()}");
      return List.empty();
    }
  }

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
        final distance = await GeoapifyService.instance.getDistance(
          Point(
            longitude: _pickupAddress?.longitude,
            latitude: _pickupAddress?.latitude,
          ),
          Point(
            longitude: _deliveryAddress?.longitude,
            latitude: _deliveryAddress?.latitude,
          ),
        );
        await ApiService.instance.addOrder(
          {
            "pickupAddress": _pickupAddress?.toJson(),
            "deliveryAddress": _deliveryAddress?.toJson(),
            "receiverEmail": _formKey.currentState?.value["receiverEmail"],
            "receiverPhone": _formKey.currentState?.value["receiverPhone"],
            "distance": distance,
          },
        );
        widget.onOrderAdded();
      } on Exception catch (e) {
        log("error adding order ${e.toString()}");
        _showError("erreur lors de l'envoi du colis");
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(
            height: 20,
          ),
          Text(
            "Départ",
            style: TextStyle(
              fontSize: 14,
              color: context.theme.colors.black,
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          TypeAheadField<Address>(
            suggestionsCallback: (search) => _autoCompleteAddress(search),
            hideOnEmpty: true,
            controller: _pickupAddressController,
            builder: (context, controller, focusNode) {
              return TextFormField(
                controller: controller,
                focusNode: focusNode,
                onChanged: (value) {
                  if (value.trim().isEmpty) {
                    setState(() {
                      _pickupAddress = null;
                    });
                  }
                },
                validator: (_) {
                  if (_pickupAddress == null) {
                    return "l'adresse est obligatoire";
                  }
                  return null;
                },
              );
            },
            itemBuilder: (context, value) {
              return Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
                child: Text(
                  value.geoapify,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              );
            },
            onSelected: (value) {
              _pickupAddressController.text = value.geoapify;
              setState(() {
                _pickupAddress = value;
              });
            },
          ),
          const SizedBox(
            height: 20,
          ),
          Text(
            "Destination",
            style: TextStyle(
              fontSize: 14,
              color: context.theme.colors.black,
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          TypeAheadField<Address>(
            hideOnEmpty: true,
            controller: _deliveryAddressController,
            builder: (context, controller, focusNode) {
              return TextFormField(
                controller: controller,
                focusNode: focusNode,
                onChanged: (value) {
                  if (value.trim().isEmpty) {
                    setState(() {
                      _deliveryAddress = null;
                    });
                  }
                },
                validator: (_) {
                  if (_deliveryAddress == null) {
                    return "l'adresse est obligatoire";
                  }
                  return null;
                },
              );
            },
            itemBuilder: (context, value) {
              return Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
                child: Text(
                  value.geoapify,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              );
            },
            onSelected: (value) {
              _deliveryAddressController.text = value.geoapify;
              setState(() {
                _deliveryAddress = value;
              });
            },
            suggestionsCallback: (search) => _autoCompleteAddress(search),
          ),
          const SizedBox(
            height: 25,
          ),
          const Text(
            "Destinataire",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(
            height: 20,
          ),
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
            name: "receiverLastname",
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
            name: "receiverFirstname",
            keyboardType: TextInputType.text,
            validator: FormBuilderValidators.compose(
              [
                FormBuilderValidators.required(
                  errorText: "le prénom est obligatoire",
                ),
              ],
            ),
          ),
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
            name: "receiverEmail",
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
            name: "receiverPhone",
            keyboardType: TextInputType.phone,
            validator: FormBuilderValidators.compose(
              [
                FormBuilderValidators.required(
                  errorText: "le numéro de téléphone est obligatoire",
                ),
                FormBuilderValidators.numeric(
                  errorText: "numéro de téléphone non valide",
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
    );
  }
}
