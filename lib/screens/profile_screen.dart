import 'package:flutter/material.dart';

import '../routing/app_router.dart';
import '../theme/app_theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> with SingleTickerProviderStateMixin {
  late final TabController _controller;
  bool editing = false;
  bool darkMode = false;
  bool notifications = true;

  final nameController = TextEditingController(text: 'Ahmed Mohamed');
  final emailController = TextEditingController(text: 'ahmed@example.com');

  @override
  void initState() {
    super.initState();
    _controller = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    nameController.dispose();
    emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        bottom: TabBar(
          controller: _controller,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.textSecondary,
          indicatorColor: AppColors.primary,
          tabs: const [
            Tab(text: 'Profile'),
            Tab(text: 'Settings'),
            Tab(text: 'Education'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _controller,
        children: [
          _profileTab(context),
          _settingsTab(context),
          _educationTab(context),
        ],
      ),
    );
  }

  Widget _profileTab(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Column(
          children: [
            Stack(
              children: [
                const CircleAvatar(
                  radius: 40,
                  backgroundColor: AppColors.primary,
                  child: Icon(Icons.person, color: Colors.white, size: 44),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    decoration: BoxDecoration(
                      color: AppColors.card,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: AppColors.divider),
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.edit, size: 18),
                      onPressed: () => setState(() => editing = !editing),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (!editing) ...[
              Text(nameController.text, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text(emailController.text, style: const TextStyle(color: AppColors.textSecondary)),
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: () => setState(() => editing = true),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('Edit Profile'),
              ),
            ] else ...[
              TextField(controller: nameController, decoration: const InputDecoration(labelText: 'Name')),
              const SizedBox(height: 12),
              TextField(controller: emailController, decoration: const InputDecoration(labelText: 'Email')),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => setState(() => editing = false),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: const Text('Save'),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => setState(() => editing = false),
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: const Text('Cancel'),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
        const SizedBox(height: 16),
        ListTile(
          leading: const Icon(Icons.lock_outline, color: AppColors.primary),
          title: const Text('Change password'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {
            showDialog(
              context: context,
              builder: (_) => const AlertDialog(
                title: Text('Change password'),
                content: Text('This is a TODO. Implement your reset password flow.'),
              ),
            );
          },
        ),
        const Divider(),
        ListTile(
          leading: const Icon(Icons.delete_outline, color: AppColors.danger),
          title: const Text('Delete account', style: TextStyle(color: AppColors.danger)),
          trailing: const Icon(Icons.chevron_right, color: AppColors.danger),
          onTap: () async {
            final ok = await showDialog<bool>(
              context: context,
              builder: (ctx) => AlertDialog(
                title: const Text('Delete account'),
                content: const Text('Are you sure? This will permanently delete your account.'),
                actions: [
                  TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
                  TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Delete')),
                ],
              ),
            );
            if (ok == true && context.mounted) {
              Navigator.of(context).pushNamedAndRemoveUntil(AppRoutes.auth, (_) => false);
            }
          },
        ),
      ],
    );
  }

  Widget _settingsTab(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        SwitchListTile(
          value: darkMode,
          onChanged: (v) => setState(() => darkMode = v),
          title: const Text('Dark mode'),
          secondary: const Icon(Icons.dark_mode_outlined, color: AppColors.primary),
          activeColor: AppColors.primary,
        ),
        const Divider(),
        SwitchListTile(
          value: notifications,
          onChanged: (v) => setState(() => notifications = v),
          title: const Text('Notifications'),
          secondary: const Icon(Icons.notifications_none, color: AppColors.primary),
          activeColor: AppColors.primary,
        ),
        const Divider(),
        ListTile(
          leading: const Icon(Icons.language_outlined, color: AppColors.primary),
          title: const Text('Language'),
          subtitle: const Text('Arabic'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
        const Divider(),
        ListTile(
          leading: const Icon(Icons.download_outlined, color: AppColors.primary),
          title: const Text('Export data'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
        const Divider(),
        OutlinedButton.icon(
          onPressed: () => Navigator.of(context).pushNamedAndRemoveUntil(AppRoutes.auth, (_) => false),
          icon: const Icon(Icons.logout, color: AppColors.danger),
          label: const Text('Logout', style: TextStyle(color: AppColors.danger)),
          style: OutlinedButton.styleFrom(
            side: const BorderSide(color: AppColors.danger),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            minimumSize: const Size.fromHeight(48),
          ),
        ),
      ],
    );
  }

  Widget _educationTab(BuildContext context) {
    const items = [
      ('What is melanoma?', 'Understand common skin cancer types and signs', Icons.info_outline),
      ('Prevention tips', 'How to protect your skin from UV exposure', Icons.shield_outlined),
      ('When to visit a doctor?', 'Warning signs that need clinical evaluation', Icons.medical_services_outlined),
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: items.length,
      itemBuilder: (context, i) {
        final (title, desc, icon) = items[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          decoration: BoxDecoration(
            color: AppColors.card,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: AppColors.divider),
          ),
          child: ListTile(
            leading: Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                  color: AppColors.primary.withAlpha(20),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: AppColors.primary),
            ),
            title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
            subtitle: Text(desc),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),
        );
      },
    );
  }
}

