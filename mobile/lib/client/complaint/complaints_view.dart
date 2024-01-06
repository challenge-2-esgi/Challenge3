import 'package:flutter/material.dart';
import 'package:mobile/client/complaint/complaint_item.dart';
import 'package:mobile/core/models/complaint.dart';
import 'package:mobile/core/services/api_service.dart';

class ComplaintsView extends StatefulWidget {
  const ComplaintsView({super.key});

  @override
  State<ComplaintsView> createState() => _ComplaintsViewState();
}

class _ComplaintsViewState extends State<ComplaintsView> {
  List<Complaint> complaints = [];

  @override
  void initState() {
    super.initState();
    ApiService.instance.getComplaints().then((value) {
      setState(() {
        complaints = value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(20.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  "Mes Réclamations",
                  style: TextStyle(
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          complaints.isEmpty
              ? const SizedBox(
                  height: 400,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.find_in_page_rounded,
                        color: Colors.grey,
                        size: 60,
                      ),
                      SizedBox(height: 8),
                      Text(
                        "Aucune réclamation trouvée.",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                )
              : Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10.0),
                    child: ListView.builder(
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.all(10),
                          child: ComplaintItem(
                            complaint: complaints[index],
                          ),
                        );
                      },
                      itemCount: complaints.length,
                    ),
                  ),
                ),
        ],
      ),
    );
  }
}
