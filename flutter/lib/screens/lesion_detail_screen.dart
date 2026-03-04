import 'package:flutter/material.dart';

import '../models/risk_level.dart';
import '../routing/app_router.dart';
import '../theme/app_theme.dart';
import '../widgets/risk_badge.dart';

class LesionDetailScreen extends StatefulWidget {
  const LesionDetailScreen({super.key});

  @override
  State<LesionDetailScreen> createState() => _LesionDetailScreenState();
}

class _LesionDetailScreenState extends State<LesionDetailScreen> {
  bool isEditingNotes = false;
  bool isCompareMode = false;
  final Set<String> selected = {};
  final notesController = TextEditingController(text: 'Slightly raised, irregular borders');

  final timeline = const [
    ('1', '2026-03-04', RiskLevel.medium, 87),
    ('2', '2026-02-28', RiskLevel.low, 92),
    ('3', '2026-02-15', RiskLevel.low, 85),
  ];

  @override
  void dispose() {
    notesController.dispose();
    super.dispose();
  }

  void _toggleSelect(String id) {
    setState(() {
      if (selected.contains(id)) {
        selected.remove(id);
      } else {
        selected.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Lesion detail'),
        actions: [
          IconButton(
            icon: Icon(isEditingNotes ? Icons.check : Icons.edit),
            onPressed: () => setState(() => isEditingNotes = !isEditingNotes),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  Stack(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(18),
                        child: Container(
                          height: 260,
                          color: AppColors.background,
                          child: InteractiveViewer(
                            child: const Center(
                              child: Icon(Icons.image_outlined, size: 72, color: AppColors.textSecondary),
                            ),
                          ),
                        ),
                      ),
                      const Positioned(
                        top: 12,
                        right: 12,
                        child: RiskBadge(level: RiskLevel.medium),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.card,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.divider),
                    ),
                    child: Column(
                      children: [
                        _InfoRow(label: 'First detected', value: '2026-01-15'),
                        const Divider(),
                        _InfoRow(label: 'Body location', value: 'Right Arm'),
                        const Divider(),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Average risk', style: theme.textTheme.bodySmall),
                            const RiskBadge(level: RiskLevel.medium),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.card,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.divider),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Notes', style: theme.textTheme.titleMedium),
                            IconButton(
                              onPressed: () => setState(() => isEditingNotes = !isEditingNotes),
                              icon: Icon(isEditingNotes ? Icons.check : Icons.edit, color: AppColors.primary),
                            ),
                          ],
                        ),
                        if (isEditingNotes)
                          TextField(
                            controller: notesController,
                            minLines: 2,
                            maxLines: 5,
                            decoration: const InputDecoration(hintText: 'Add notes...'),
                          )
                        else
                          Text(notesController.text, style: theme.textTheme.bodyMedium),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Timeline', style: theme.textTheme.titleMedium),
                      TextButton.icon(
                        onPressed: () => setState(() {
                          isCompareMode = !isCompareMode;
                          selected.clear();
                        }),
                        icon: const Icon(Icons.compare_arrows),
                        label: Text(isCompareMode ? 'Cancel' : 'Compare'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ...timeline.map((t) {
                    final (id, date, risk, conf) = t;
                    final isSelected = selected.contains(id);
                    return InkWell(
                      onTap: () {
                        if (isCompareMode) {
                          _toggleSelect(id);
                        } else {
                          Navigator.of(context).pushNamed(AppRoutes.analysisResult);
                        }
                      },
                      borderRadius: BorderRadius.circular(14),
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.card,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: isSelected ? AppColors.primary : AppColors.divider),
                        ),
                        child: Row(
                          children: [
                            if (isCompareMode)
                              Container(
                                width: 22,
                                height: 22,
                                margin: const EdgeInsets.only(right: 10),
                                decoration: BoxDecoration(
                                  color: isSelected ? AppColors.primary : Colors.transparent,
                                  borderRadius: BorderRadius.circular(6),
                                  border: Border.all(
                                    color: isSelected ? AppColors.primary : AppColors.divider,
                                    width: 2,
                                  ),
                                ),
                                child: isSelected
                                    ? const Icon(Icons.check, size: 16, color: Colors.white)
                                    : null,
                              ),
                            Container(
                              width: 52,
                              height: 52,
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
                                  Text(date, style: theme.textTheme.titleMedium),
                                  const SizedBox(height: 4),
                                  Row(
                                    children: [
                                      RiskBadge(level: risk),
                                      const SizedBox(width: 8),
                                      Text('$conf%', style: theme.textTheme.labelSmall),
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
                  }),
                  if (isCompareMode && selected.length >= 2)
                    ElevatedButton(
                      onPressed: () {
                        // TODO: implement side-by-side comparison slider
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Comparison view is a TODO')),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(48),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: Text('Compare ${selected.length} scans'),
                    ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
              child: Column(
                children: [
                  ElevatedButton.icon(
                    onPressed: () => Navigator.of(context).pushNamed(AppRoutes.camera),
                    icon: const Icon(Icons.add_a_photo),
                    label: const Text('Add New Scan'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      minimumSize: const Size.fromHeight(48),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 10),
                  OutlinedButton.icon(
                    onPressed: () async {
                      final ok = await showDialog<bool>(
                        context: context,
                        builder: (ctx) => AlertDialog(
                          title: const Text('Delete lesion'),
                          content: const Text('Are you sure? This cannot be undone.'),
                          actions: [
                            TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
                            TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Delete')),
                          ],
                        ),
                      );
                      if (ok == true && context.mounted) Navigator.pop(context);
                    },
                    icon: const Icon(Icons.delete_outline, color: AppColors.danger),
                    label: const Text('Delete Lesion', style: TextStyle(color: AppColors.danger)),
                    style: OutlinedButton.styleFrom(
                      minimumSize: const Size.fromHeight(48),
                      side: const BorderSide(color: AppColors.danger),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
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

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;

  const _InfoRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: theme.textTheme.bodySmall),
        Text(value, style: theme.textTheme.bodyMedium!.copyWith(fontWeight: FontWeight.w600)),
      ],
    );
  }
}

