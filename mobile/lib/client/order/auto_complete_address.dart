import 'package:flutter/material.dart';
import 'package:mobile/core/models/address.dart';
import 'package:mobile/theme/app_theme.dart';

class AutoCompleteAddress extends StatelessWidget {
  final List<Address> addresses;
  final Function(Address address) onSelect;

  const AutoCompleteAddress({
    super.key,
    required this.addresses,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: addresses.length * 45,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(
          width: 1,
          style: BorderStyle.solid,
          color: context.theme.colors.body!,
        ),
        borderRadius: const BorderRadius.all(
          Radius.circular(8),
        ),
      ),
      child: ListView.separated(
        padding: const EdgeInsets.all(10.0),
        itemCount: addresses.length,
        itemBuilder: (context, index) => GestureDetector(
          child: Text(
            addresses[index].geoapify,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          onTap: () {
            onSelect(addresses[index]);
          },
        ),
        separatorBuilder: (BuildContext context, int index) => const Padding(
          padding: EdgeInsets.all(10),
        ),
      ),
    );
  }
}
