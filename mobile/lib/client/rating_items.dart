import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/core/models/rating.dart';
import 'package:mobile/core/services/api_service.dart';
import 'package:mobile/home/blocs/user_bloc.dart';

class RatingItems extends StatefulWidget {
  final Order order;

  const RatingItems({super.key, required this.order});

  @override
  State<RatingItems> createState() => _RatingItemsState();
}

class _RatingItemsState extends State<RatingItems> {
  static const _numberOfStars = 5;
  int _rate = 0;
  String? _ratingId;

  @override
  void initState() {
    super.initState();
    ApiService.instance
        .getRating(
      widget.order.id,
      context.read<UserBloc>().state.user!.id,
      widget.order.deliverer!.id,
    )
        .then(
      (value) {
        if (value == null) {
          setState(() {
            _rate = 0;
          });
        } else {
          setState(() {
            _rate = value.rating;
            _ratingId = value.id;
          });
        }
      },
    );
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

  Future<void> _rateDeliverer(int rate) async {
    try {
      if (_ratingId == null) {
        final value = await ApiService.instance.rateDeliverer(
          Rating(
            id: "",
            clientId: context.read<UserBloc>().state.user!.id,
            delivererId: widget.order.deliverer!.id,
            orderId: widget.order.id,
            rating: rate,
          ),
        );
        setState(() {
          _ratingId = value.id;
        });
      } else {
        await ApiService.instance.updateDelivererRate(_ratingId!, rate);
      }
      setState(() {
        _rate = rate;
      });
    } on Exception {
      _showError("Une erreur est survenue lors de la notation");
    }
  }

  Widget _buildStars() {
    List<Widget> widgets = [];
    for (var i = 0; i < _numberOfStars; i++) {
      widgets.add(
        GestureDetector(
          child: Icon(
            i < _rate ? Icons.star_rounded : Icons.star_outline_rounded,
            color: i < _rate
                ? Colors.yellow.shade600
                : Colors.grey.withOpacity(0.8),
          ),
          onTap: () {
            if (_rate == 1 && i == 0) {
              _rateDeliverer(0);
            } else {
              _rateDeliverer(i + 1);
            }
          },
        ),
      );
    }

    return Row(
      children: [...widgets],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        _buildStars(),
      ],
    );
  }
}
