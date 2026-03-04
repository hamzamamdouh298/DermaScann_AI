import 'dart:io';

import '../models/risk_level.dart';

class AnalysisResult {
  final RiskLevel riskLevel;
  final int confidence; // 0..100
  final String explanation;
  final String recommendation;

  AnalysisResult({
    required this.riskLevel,
    required this.confidence,
    required this.explanation,
    required this.recommendation,
  });
}

class AiService {
  Future<AnalysisResult> analyzeLesion(File image) async {
    // TODO: Connect to your AI backend / on-device model.
    await Future.delayed(const Duration(seconds: 2));

    return AnalysisResult(
      riskLevel: RiskLevel.medium,
      confidence: 82,
      explanation:
          'The scan detected features that may require clinical review. This is not a diagnosis.',
      recommendation:
          'Schedule a dermatologist visit within 4 weeks. Seek urgent care if rapid changes occur.',
    );
  }
}

