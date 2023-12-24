part of 'sse_client.dart';

class SseModel {
  // Id of the event
  String? id = '';

  // Event name
  String? event = '';

  // Event data
  String? data = '';

  SseModel({required this.data, required this.id, required this.event});

  bool isDataEmpty() {
    if (data == null || data!.isEmpty) return true;
    return false;
  }

  Map<String, dynamic> transformDataToMap() {
    return jsonDecode(data ?? "");
  }

  SseModel.fromData(String data) {
    id = data.split("\n")[0].split('id:')[1];
    event = data.split("\n")[1].split('event:')[1];
    this.data = data.split("\n")[2].split('data:')[1];
  }
}
