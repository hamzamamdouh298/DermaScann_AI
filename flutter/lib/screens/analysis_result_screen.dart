import 'package:flutter/material.dart';

import '../models/risk_level.dart';
import '../routing/app_router.dart';
import '../services/ai_service.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class AnalysisResultScreen extends StatelessWidget {
  const AnalysisResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final args = ModalRoute.of(context)!.settings.arguments;
    final result = args is AnalysisResult
        ? args
        : AnalysisResult(
            riskLevel: RiskLevel.medium,
            confidence: 80,
            explanation: 'Example explanation. Connect your AI backend for real results.',
            recommendation: 'Book a dermatologist appointment for clinical evaluation.',
          );

    final riskColor = switch (result.riskLevel) {
      RiskLevel.low => AppColors.success,
      RiskLevel.medium => AppColors.warning,
      RiskLevel.high => AppColors.danger,
    };

    return Scaffold(
      appBar: AppBar(title: const Text('Scan Result')),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                children: [
                  Container(
                    height: 220,
                    decoration: BoxDecoration(
                      color: AppColors.background,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: const Center(
                      child: Icon(Icons.image_outlined, size: 64, color: AppColors.textSecondary),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: riskColor.withAlpha(31),
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(
                              result.riskLevel == RiskLevel.low
                                  ? Icons.check_circle
                                  : result.riskLevel == RiskLevel.medium
                                      ? Icons.warning
                                      : Icons.error,
                              color: riskColor,
                              size: 32,
                            ),
                            const SizedBox(width: 12),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Risk level',
                                  style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                                ),
                                Text(
                                  result.riskLevel.label,
                                  style: TextStyle(
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                    color: riskColor,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Confidence', style: TextStyle(fontWeight: FontWeight.w600)),
                            Text(
                              '${result.confidence}%',
                              style: TextStyle(fontWeight: FontWeight.bold, color: riskColor),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(999),
                          child: LinearProgressIndicator(
                            minHeight: 8,
                            value: (result.confidence.clamp(0, 100)) / 100.0,
                            backgroundColor: AppColors.divider,
                            valueColor: AlwaysStoppedAnimation(riskColor),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text('AI explanation', style: theme.textTheme.titleMedium),
                  const SizedBox(height: 6),
                  Text(result.explanation, style: theme.textTheme.bodyMedium),
                  const SizedBox(height: 16),
                  Text('Recommendation', style: theme.textTheme.titleMedium),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.card,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: result.riskLevel == RiskLevel.high ? AppColors.danger : AppColors.divider,
                      ),
                    ),
                    child: Text(result.recommendation, style: theme.textTheme.bodyMedium),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Column(
                children: [
                  PrimaryButton(
                    label: 'Save to history',
                    onPressed: () => Navigator.of(context).pushNamed(AppRoutes.lesionDetail),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () => Navigator.of(context).pushNamed(AppRoutes.shareReport),
                          icon: const Icon(Icons.share),
                          label: const Text('Share report'),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size.fromHeight(44),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () => Navigator.of(context).pushReplacementNamed(AppRoutes.camera),
                          icon: const Icon(Icons.add_a_photo_outlined),
                          label: const Text('New scan'),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size.fromHeight(44),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

