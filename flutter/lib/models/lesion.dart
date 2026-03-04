import 'risk_level.dart';

class Lesion {
  final String id;
  final String name;
  final String bodyLocation;
  final RiskLevel latestRisk;
  final DateTime firstDetected;
  final DateTime lastScan;
  final String? notes;
  final String imagePath;

  Lesion({
    required this.id,
    required this.name,
    required this.bodyLocation,
    required this.latestRisk,
    required this.firstDetected,
    required this.lastScan,
    required this.imagePath,
    this.notes,
  });
}

