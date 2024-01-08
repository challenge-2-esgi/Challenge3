import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/core/models/order.dart';
import 'package:mobile/deliverer/blocs/order_bloc.dart';
import 'package:mobile/deliverer/delivering/delivering_steps.dart';
import 'package:mobile/deliverer/delivering/order_details.dart';
import 'package:mobile/deliverer/delivering/validation_form.dart';
import 'package:mobile/shared/custom_error_widget.dart';

class DeliveringView extends StatelessWidget {
  const DeliveringView({super.key});

  _showError(BuildContext context, String message) {
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

  _showForm(BuildContext context, String? message, Function() onValidated) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        content: Container(
          padding: const EdgeInsets.all(8.0),
          height: 200,
          child: ValidationForm(
            validationCode: message,
            onValidated: onValidated,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<OrderBloc, OrderState>(
      listener: (context, state) {
        if (state.stepStatus == OrderStepStatus.error) {
          _showError(context, "Erreur lors de la validation de l'étape");
        }
      },
      builder: (context, state) {
        final orderBloc = context.read<OrderBloc>();
        final order = state.ongoingOrder;
        final updatingStep =
            orderBloc.state.stepStatus == OrderStepStatus.loading;

        if (order == null) {
          return const Scaffold(
            body: SafeArea(
              child: Center(
                child: CustomErrorWidget(),
              ),
            ),
          );
        }

        return Scaffold(
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      ElevatedButton(
                        style: const ButtonStyle(
                          padding: MaterialStatePropertyAll(
                            EdgeInsets.symmetric(
                              vertical: 8.0,
                              horizontal: 18.0,
                            ),
                          ),
                        ),
                        onPressed: updatingStep
                            ? null
                            : () => order.status == Status.delivered ||
                                    order.status == Status.canceled
                                ? orderBloc.add(OrderDelivered())
                                : order.status == Status.delivering
                                    ? _showForm(
                                        context, order.clientValidationCode,
                                        () {
                                        orderBloc.add(
                                            OrderStepValidated(order: order));
                                        Navigator.pop(context);
                                      })
                                    : orderBloc
                                        .add(OrderStepValidated(order: order)),
                        child: updatingStep
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                ),
                              )
                            : Row(
                                children: [
                                  Text(
                                    order.status == Status.delivering
                                        ? "Valider"
                                        : order.status == Status.delivered ||
                                                order.status == Status.canceled
                                            ? "Accueil"
                                            : "Etape suivante",
                                  ),
                                  const SizedBox(
                                    width: 10.0,
                                  ),
                                  Icon(
                                    order.status == Status.delivering
                                        ? CupertinoIcons.check_mark_circled
                                        : Icons.arrow_forward,
                                    size: 20.0,
                                  ),
                                ],
                              ),
                      ),
                    ],
                  ),
                  const SizedBox(
                    height: 38,
                  ),
                  DeliveringSteps(order: order),
                  const SizedBox(
                    height: 70.0,
                  ),
                  Expanded(
                    child: ListView(
                      children: [
                        OrderDetails(order: order),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );

    // if (order == null) {
    //   return const Scaffold(
    //     body: SafeArea(
    //       child: Center(
    //         child: CustomErrorWidget(),
    //       ),
    //     ),
    //   );
    // }
    //
    // return Scaffold(
    //   body: SafeArea(
    //     child: Padding(
    //       padding: const EdgeInsets.all(20.0),
    //       child: Column(
    //         crossAxisAlignment: CrossAxisAlignment.start,
    //         children: [
    //           Row(
    //             mainAxisAlignment: MainAxisAlignment.start,
    //             children: [
    //               ElevatedButton(
    //                 style: const ButtonStyle(
    //                   padding: MaterialStatePropertyAll(
    //                     EdgeInsets.symmetric(
    //                       vertical: 8.0,
    //                       horizontal: 18.0,
    //                     ),
    //                   ),
    //                 ),
    //                 onPressed: updatingStep
    //                     ? null
    //                     : () => order.status == Status.delivered ||
    //                             order.status == Status.canceled
    //                         ? orderBloc.add(OrderDelivered())
    //                         : orderBloc.add(OrderStepValidated(order: order)),
    //                 child: updatingStep
    //                     ? const SizedBox(
    //                         width: 20,
    //                         height: 20,
    //                         child: CircularProgressIndicator(
    //                           color: Colors.white,
    //                         ),
    //                       )
    //                     : Row(
    //                         children: [
    //                           Text(
    //                             order.status == Status.delivering
    //                                 ? "Valider"
    //                                 : order.status == Status.delivered ||
    //                                         order.status == Status.canceled
    //                                     ? "Accueil"
    //                                     : "Etape suivante",
    //                           ),
    //                           const SizedBox(
    //                             width: 10.0,
    //                           ),
    //                           Icon(
    //                             order.status == Status.delivering
    //                                 ? CupertinoIcons.check_mark_circled
    //                                 : Icons.arrow_forward,
    //                             size: 20.0,
    //                           ),
    //                         ],
    //                       ),
    //               ),
    //             ],
    //           ),
    //           const SizedBox(
    //             height: 38,
    //           ),
    //           DeliveringSteps(order: order),
    //           const SizedBox(
    //             height: 70.0,
    //           ),
    //           Expanded(
    //             child: ListView(
    //               children: [
    //                 OrderDetails(order: order),
    //               ],
    //             ),
    //           ),
    //         ],
    //       ),
    //     ),
    //   ),
    // );
  }
}
