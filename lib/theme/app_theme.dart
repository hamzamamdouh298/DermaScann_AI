import 'package:flutter/material.dart';

class AppColors {
  static const Color primary = Color(0xFF1E3A8A);
  static const Color secondary = Color(0xFF14B8A6);
  static const Color accent = Color(0xFF3B82F6);

  static const Color success = Color(0xFF22C55E);
  static const Color warning = Color(0xFFF59E0B);
  static const Color danger = Color(0xFFEF4444);

  static const Color background = Color(0xFFF8FAFC);
  static const Color card = Color(0xFFFFFFFF);

  static const Color textPrimary = Color(0xFF0F172A);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color divider = Color(0xFFE2E8F0);
}

ThemeData buildAppTheme() {
  final base = ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: AppColors.background,
  );

  return base.copyWith(
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.primary,
      primary: AppColors.primary,
      secondary: AppColors.secondary,
    ),
    textTheme: const TextTheme(
      headlineMedium: TextStyle(
        fontSize: 28,
        fontWeight: FontWeight.bold,
        height: 1.4,
        color: AppColors.textPrimary,
      ),
      titleLarge: TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        height: 1.4,
        color: AppColors.textPrimary,
      ),
      titleMedium: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w500,
        height: 1.4,
        color: AppColors.textPrimary,
      ),
      bodyMedium: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        height: 1.5,
        color: AppColors.textPrimary,
      ),
      bodySmall: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.5,
        color: AppColors.textSecondary,
      ),
      labelSmall: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        height: 1.4,
        color: AppColors.textSecondary,
      ),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.background,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: AppColors.textPrimary,
      ),
      iconTheme: IconThemeData(color: AppColors.textPrimary),
    ),
    dividerTheme: const DividerThemeData(color: AppColors.divider, thickness: 1),
  );
}

