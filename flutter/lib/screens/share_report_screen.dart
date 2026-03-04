import 'package:flutter/material.dart';

import '../models/risk_level.dart';
import '../theme/app_theme.dart';

class ShareReportScreen extends StatefulWidget {
  const ShareReportScreen({super.key});

  @override
  State<ShareReportScreen> createState() => _ShareReportScreenState();
}

class _ShareReportScreenState extends State<ShareReportScreen> {
  bool isGenerating = false;
  bool showSuccess = false;

  final riskLevel = RiskLevel.high;
  final confidence = 87;
  final explanation =
      'The scan detected features that may require clinical review. This is not a diagnosis.';

  Color get _riskColor => switch (riskLevel) {
        RiskLevel.low => AppColors.success,
        RiskLevel.medium => AppColors.warning,
        RiskLevel.high => AppColors.danger,
      };

  Future<void> _simulate(String action) async {
    setState(() {
      isGenerating = true;
      showSuccess = false;
    });
    await Future.delayed(const Duration(seconds: 2));
    setState(() {
      isGenerating = false;
      showSuccess = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Share Report')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Container(
              decoration: BoxDecoration(
                color: AppColors.card,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.divider),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha(10),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: const BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.picture_as_pdf, color: Colors.white),
                        SizedBox(width: 8),
                        Text('PDF Preview', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          height: 160,
                          decoration: BoxDecoration(
                            color: AppColors.background,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Center(
                            child: Icon(Icons.image_outlined, size: 60, color: AppColors.textSecondary),
                          ),
                        ),
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: _riskColor.withAlpha(31),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('Risk level', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              const SizedBox(height: 2),
                              Text(
                                riskLevel.label,
                                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: _riskColor),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Confidence', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                            Text('$confidence%', style: const TextStyle(fontWeight: FontWeight.w700)),
                          ],
                        ),
                        const SizedBox(height: 6),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(999),
                          child: LinearProgressIndicator(
                            minHeight: 8,
                            value: confidence / 100.0,
                            backgroundColor: AppColors.divider,
                            valueColor: AlwaysStoppedAnimation(_riskColor),
                          ),
                        ),
                        const SizedBox(height: 12),
                        const Text('AI explanation', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                        const SizedBox(height: 4),
                        Text(explanation),
                        const SizedBox(height: 12),
                        Row(
                          children: const [
                            Icon(Icons.calendar_today, size: 14, color: AppColors.textSecondary),
                            SizedBox(width: 8),
                            Text('2026-03-04 • 14:30', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            if (isGenerating)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.primary.withAlpha(20),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.primary.withAlpha(102)),
                ),
                child: const Row(
                  children: [
                    SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2)),
                    SizedBox(width: 10),
                    Text('Generating PDF...', style: TextStyle(fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
            if (showSuccess && !isGenerating)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.success.withAlpha(26),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.success.withAlpha(102)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.check_circle, color: AppColors.success),
                    SizedBox(width: 10),
                    Text('Done', style: TextStyle(fontWeight: FontWeight.w700)),
                  ],
                ),
              ),
            const SizedBox(height: 16),
            const Text('Share options', style: TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(height: 10),
            _OptionTile(
              icon: Icons.chat,
              color: AppColors.success,
              title: 'Share via WhatsApp',
              subtitle: 'Send the report to a contact',
              onTap: () => _simulate('whatsapp'),
            ),
            _OptionTile(
              icon: Icons.email_outlined,
              color: AppColors.primary,
              title: 'Share via Email',
              subtitle: 'Email the report to your doctor',
              onTap: () => _simulate('email'),
            ),
            _OptionTile(
              icon: Icons.download_outlined,
              color: AppColors.warning,
              title: 'Download PDF',
              subtitle: 'Save the report to your device',
              onTap: () => _simulate('download'),
            ),
            _OptionTile(
              icon: Icons.link,
              color: AppColors.primary,
              title: 'Copy link',
              subtitle: 'Copy a share link to clipboard',
              onTap: () => _simulate('copy'),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.primary.withAlpha(20),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.primary.withAlpha(89)),
              ),
              child: const Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(Icons.info_outline, color: AppColors.primary),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'This report is for personal use and sharing with healthcare professionals only. It does not replace medical diagnosis.',
                      style: TextStyle(color: AppColors.textPrimary),
                    ),
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

class _OptionTile extends StatelessWidget {
  final IconData icon;
  final Color color;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _OptionTile({
    required this.icon,
    required this.color,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.divider),
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: color.withAlpha(31),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: color),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
      ),
    );
  }
}

