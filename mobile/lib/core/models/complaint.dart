enum ComplaintStatus {
  pending,
  processing,
  closed,
}

class Complaint {
  final String subject;
  final String content;
  final ComplaintStatus status;
  final String clientFirstname;
  final String clientLastname;
  final String orderSku;

  Complaint({
    required this.subject,
    required this.content,
    required this.status,
    required this.clientFirstname,
    required this.clientLastname,
    required this.orderSku,
  });

  static ComplaintStatus stringToStatus(String status) {
    switch (status) {
      case 'PENDING':
        return ComplaintStatus.pending;
      case 'PROCESSING':
        return ComplaintStatus.processing;
      default:
        return ComplaintStatus.closed;
    }
  }

  static String statusToString(ComplaintStatus status) {
    switch (status) {
      case ComplaintStatus.pending:
        return "PENDING";
      case ComplaintStatus.processing:
        return "PROCESSING";
      case ComplaintStatus.closed:
        return "CLOSED";
    }
  }

  factory Complaint.fromJson(Map<String, dynamic> json) {
    return Complaint(
      subject: json["subject"],
      content: json["content"],
      status: stringToStatus(json["status"]),
      clientFirstname: json["user"]["firstname"],
      clientLastname: json["user"]["lastname"],
      orderSku: json["order"]['sku'],
    );
  }
}
