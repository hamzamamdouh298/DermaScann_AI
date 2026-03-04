import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/lesion.dart';
import '../models/risk_level.dart';
import '../routing/app_router.dart';
import '../theme/app_theme.dart';
import '../widgets/risk_badge.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Lesion> _lesions = [
    Lesion(
      id: '1',
      name: 'Mole on Forearm',
      bodyLocation: 'Right forearm',
      latestRisk: RiskLevel.low,
      firstDetected: DateTime(2025, 5, 2),
      lastScan: DateTime(2026, 3, 1),
      imagePath: '',
    ),
    Lesion(
      id: '2',
      name: 'Spot on Back',
      bodyLocation: 'Upper back',
      latestRisk: RiskLevel.medium,
      firstDetected: DateTime(2025, 10, 10),
      lastScan: DateTime(2026, 2, 10),
      imagePath: '',
    ),
  ];

  int _tabIndex = 0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    final hasLesions = _lesions.isNotEmpty;
    final lastScan = hasLesions ? _lesions.first.lastScan : null;
    final lastScanLabel =
        lastScan != null ? DateFormat.yMMMd().format(lastScan) : 'No scans yet';
    final isOverdue = lastScan != null &&
        DateTime.now().difference(lastScan) > const Duration(days: 30);

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        titleSpacing: 16,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Hello, Ahmed',
              style: theme.textTheme.titleLarge!.copyWith(fontWeight: FontWeight.bold),
            ),
            Text('Track your skin health', style: theme.textTheme.bodySmall),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () => Navigator.of(context).pushNamed(AppRoutes.profile),
            icon: const CircleAvatar(
              radius: 18,
              backgroundColor: AppColors.primary,
              child: Icon(Icons.person, color: Colors.white),
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: Stack(
          children: [
            ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              children: [
                if (hasLesions) ...[
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [AppColors.primary, AppColors.secondary],
                      ),
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Total lesions tracked',
                                    style: TextStyle(color: Colors.white70, fontSize: 13),
                                  ),
                                  Text(
                                    '${_lesions.length}',
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 28,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(Icons.track_changes, color: Colors.white54, size: 40),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Last scan: $lastScanLabel',
                              style: const TextStyle(color: Colors.white70, fontSize: 12),
                            ),
                            if (isOverdue)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.white.withAlpha(51),
                                  borderRadius: BorderRadius.circular(999),
                                ),
                                child: const Text(
                                  'Overdue',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
                if (!hasLesions)
                  Column(
                    children: [
                      const SizedBox(height: 40),
                      Container(
                        width: 96,
                        height: 96,
                        decoration: BoxDecoration(
                          color: AppColors.card,
                          borderRadius: BorderRadius.circular(999),
                          border: Border.all(color: AppColors.divider),
                        ),
                        child: const Icon(
                          Icons.image_not_supported_outlined,
                          color: AppColors.textSecondary,
                          size: 40,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text('No lesions yet', style: theme.textTheme.titleMedium),
                      const SizedBox(height: 4),
                      Text(
                        'Start your first scan to begin tracking.',
                        style: theme.textTheme.bodySmall,
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => Navigator.of(context).pushNamed(AppRoutes.camera),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        child: const Text('Start First Scan'),
                      ),
                    ],
                  )
                else ...[
                  Text(
                    'Lesions',
                    style: theme.textTheme.bodySmall!.copyWith(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 8),
                  ..._lesions.map(
                    (lesion) => _LesionCard(
                      lesion: lesion,
                      onTap: () => Navigator.of(context).pushNamed(AppRoutes.lesionDetail),
                    ),
                  ),
                ],
                const SizedBox(height: 90),
              ],
            ),
            if (hasLesions)
              Positioned(
                bottom: 24,
                right: 24,
                child: FloatingActionButton(
                  onPressed: () => Navigator.of(context).pushNamed(AppRoutes.camera),
                  backgroundColor: AppColors.primary,
                  child: const Icon(Icons.add_a_photo, color: Colors.white),
                ),
              ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _tabIndex,
        onTap: (idx) {
          setState(() => _tabIndex = idx);
          if (idx == 1) {
            Navigator.of(context).pushNamed(AppRoutes.profile);
          }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Profile'),
        ],
      ),
    );
  }
}

class _LesionCard extends StatelessWidget {
  final Lesion lesion;
  final VoidCallback onTap;

  const _LesionCard({required this.lesion, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dateLabel = DateFormat.yMMMd().format(lesion.lastScan);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.card,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(8),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: AppColors.background,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.image_outlined, color: AppColors.textSecondary),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(lesion.name, style: theme.textTheme.titleMedium),
                  const SizedBox(height: 4),
                  Text(lesion.bodyLocation, style: theme.textTheme.bodySmall),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      RiskBadge(level: lesion.latestRisk),
                      const SizedBox(width: 8),
                      Text(dateLabel, style: theme.textTheme.labelSmall),
                    ],
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.textSecondary),
          ],
        ),
      ),
    );
  }
}

