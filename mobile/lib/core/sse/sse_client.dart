// inspired by
// https://pub.dev/packages/flutter_client_sse

import 'dart:async';
import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;

part 'sse_model.dart';

class SseClient {
  static http.Client _client = http.Client();

  static Stream<SseModel> subscribeToSSE({
    required Uri uri,
    required Map<String, String> headers,
  }) {
    var lineRegex = RegExp(r'^([^:]*)(?::)?(?: )?(.*)?$');
    var currentSSEModel = SseModel(data: '', id: '', event: '');
    StreamController<SseModel> streamController = StreamController();

    log("--SUBSCRIBING TO SSE---");
    while (true) {
      try {
        _client = http.Client();
        final request = http.Request("GET", uri);

        headers.forEach((key, value) {
          request.headers[key] = value;
        });

        Future<http.StreamedResponse> response = _client.send(request);

        ///Listening to the response as a stream
        response.asStream().listen(
          (data) {
            ///Applying transforms and listening to it
            data.stream
                .transform(const Utf8Decoder())
                .transform(const LineSplitter())
                .listen(
              (dataLine) {
                if (dataLine.isEmpty) {
                  ///This means that the complete event set has been read.
                  ///We then add the event to the stream
                  streamController.add(currentSSEModel);
                  currentSSEModel = SseModel(data: '', id: '', event: '');
                  return;
                }

                ///Get the match of each line through the regex
                Match match = lineRegex.firstMatch(dataLine)!;
                var field = match.group(1);
                if (field!.isEmpty) {
                  return;
                }
                var value = '';
                if (field == 'data') {
                  //If the field is data, we get the data through the substring
                  value = dataLine.substring(
                    5,
                  );
                } else {
                  value = match.group(2) ?? '';
                }
                switch (field) {
                  case 'event':
                    currentSSEModel.event = value;
                    break;
                  case 'data':
                    currentSSEModel.data =
                        '${currentSSEModel.data ?? ''}$value\n';
                    break;
                  case 'id':
                    currentSSEModel.id = value;
                    break;
                  case 'retry':
                    break;
                }
              },
              onError: (e, s) {
                log('---SSE CLIENT ERROR---');
                log(e.toString());
                streamController.addError(e, s);
              },
            );
          },
          onError: (e, s) {
            log('---SSE CLIENT ERROR---');
            log(e.toString());
            streamController.addError(e, s);
          },
        );
      } catch (e, s) {
        log('---SSE CLIENT ERROR---');
        log(e.toString());
        streamController.addError(e, s);
      }

      Future.delayed(const Duration(seconds: 1), () {});
      return streamController.stream;
    }
  }

  static void unsubscribeFromSSE() {
    _client.close();
  }
}
