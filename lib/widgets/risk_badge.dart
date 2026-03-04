import 'package:flutter/material.dart';

import '../models/risk_level.dart';
import '../theme/app_theme.dart';

class RiskBadge extends StatelessWidget {
  final RiskLevel level;

  const RiskBadge({super.key, required this.level});

  Color get _color {
    switch (level) {
      case RiskLevel.low:
        return AppColors.success;
      case RiskLevel.medium:
        return AppColors.warning;
      case RiskLevel.high:
        return AppColors.danger;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withAlpha(31),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        level.label,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

