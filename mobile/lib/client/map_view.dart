import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:mobile/core/models/address.dart';
import 'package:mobile/theme/app_theme.dart';

class MapView extends StatefulWidget {
  final Address source;
  final Address target;

  const MapView({super.key, required this.source, required this.target});

  @override
  State<MapView> createState() => _MapViewState();
}

class _MapViewState extends State<MapView> {
  final _mapController = MapController();
  LatLng _center = const LatLng(0.0, 0.0);

  @override
  void initState() {
    super.initState();
    _center = _computeCenter(widget.source, widget.target);
  }

  @override
  void dispose() {
    _mapController.dispose();
    super.dispose();
  }

  LatLng _computeCenter(Address a, Address b) {
    double avgLat = (a.latitude + b.latitude) / 2;
    double avgLon = (a.longitude + b.longitude) / 2;
    return LatLng(avgLat, avgLon);
  }

  Marker _buildMarker(Address address, Color? color) {
    return Marker(
      point: LatLng(address.latitude, address.longitude),
      child: Icon(
        Icons.place_rounded,
        size: 35,
        color: color,
      ),
    );
  }

  IconButton _buildZoom(Function()? onPressed, {bool zoomIn = false}) {
    return IconButton(
      onPressed: onPressed,
      icon: Icon(
        zoomIn ? Icons.add_circle : Icons.remove_circle,
        color: Colors.black,
        size: 30,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        FlutterMap(
          mapController: _mapController,
          options: MapOptions(
            initialCenter: _center,
            initialZoom: 10,
            keepAlive: true,
          ),
          children: [
            TileLayer(
              urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            ),
            MarkerLayer(
              markers: [
                _buildMarker(
                  widget.source,
                  context.theme.colors.primary,
                ),
                _buildMarker(
                  widget.target,
                  Colors.redAccent,
                ),
              ],
            ),
          ],
        ),
        Positioned(
          top: 60,
          right: 20,
          child: Column(
            children: [
              _buildZoom(
                () => _mapController.move(
                    _center, _mapController.camera.zoom + 1),
                zoomIn: true,
              ),
              _buildZoom(
                () => _mapController.move(
                    _center, _mapController.camera.zoom - 1),
                zoomIn: false,
              ),
            ],
          ),
        )
      ],
    );
  }
}
