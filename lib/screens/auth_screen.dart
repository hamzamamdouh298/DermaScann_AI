import 'package:flutter/material.dart';

import '../routing/app_router.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool isLogin = true;
  bool rememberMe = false;
  bool showPassword = false;
  bool showConfirmPassword = false;

  final _fullNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _fullNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    Navigator.of(context).pushReplacementNamed(AppRoutes.tabs);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: SizedBox(
            height: MediaQuery.of(context).size.height - 32,
            child: Column(
              children: [
                Expanded(
                  flex: 3,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(18),
                        ),
                        child: const Icon(
                          Icons.medical_services_outlined,
                          color: Colors.white,
                          size: 32,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text('DERMA', style: theme.textTheme.headlineMedium),
                      const SizedBox(height: 4),
                      Text('AI Skin Monitoring', style: theme.textTheme.bodySmall),
                    ],
                  ),
                ),
                Expanded(
                  flex: 5,
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            color: AppColors.card,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: AppColors.divider),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: GestureDetector(
                                  onTap: () => setState(() => isLogin = true),
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(vertical: 12),
                                    decoration: BoxDecoration(
                                      color: isLogin ? AppColors.primary : Colors.transparent,
                                      borderRadius: BorderRadius.circular(18),
                                    ),
                                    alignment: Alignment.center,
                                    child: Text(
                                      'Login',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w600,
                                        color: isLogin ? Colors.white : AppColors.textSecondary,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: GestureDetector(
                                  onTap: () => setState(() => isLogin = false),
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(vertical: 12),
                                    decoration: BoxDecoration(
                                      color: !isLogin ? AppColors.primary : Colors.transparent,
                                      borderRadius: BorderRadius.circular(18),
                                    ),
                                    alignment: Alignment.center,
                                    child: Text(
                                      'Sign Up',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w600,
                                        color: !isLogin ? Colors.white : AppColors.textSecondary,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        Expanded(
                          child: SingleChildScrollView(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                if (!isLogin) ...[
                                  Text(
                                    'Full Name',
                                    style: theme.textTheme.bodySmall!.copyWith(
                                      color: AppColors.textPrimary,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  TextFormField(
                                    controller: _fullNameController,
                                    decoration: const InputDecoration(hintText: 'Enter your full name'),
                                    validator: (v) {
                                      if (!isLogin && (v == null || v.isEmpty)) return 'Full name is required';
                                      return null;
                                    },
                                  ),
                                  const SizedBox(height: 12),
                                ],
                                Text(
                                  'Email',
                                  style: theme.textTheme.bodySmall!.copyWith(
                                    color: AppColors.textPrimary,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                TextFormField(
                                  controller: _emailController,
                                  decoration: const InputDecoration(hintText: 'Enter your email'),
                                  keyboardType: TextInputType.emailAddress,
                                  validator: (v) {
                                    if (v == null || v.isEmpty) return 'Email is required';
                                    final regex = RegExp(r'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
                                    if (!regex.hasMatch(v)) return 'Enter a valid email';
                                    return null;
                                  },
                                ),
                                const SizedBox(height: 12),
                                Text(
                                  'Password',
                                  style: theme.textTheme.bodySmall!.copyWith(
                                    color: AppColors.textPrimary,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                TextFormField(
                                  controller: _passwordController,
                                  obscureText: !showPassword,
                                  decoration: InputDecoration(
                                    hintText: 'Min 8 characters',
                                    suffixIcon: IconButton(
                                      icon: Icon(showPassword ? Icons.visibility : Icons.visibility_off),
                                      onPressed: () => setState(() => showPassword = !showPassword),
                                    ),
                                  ),
                                  validator: (v) {
                                    if (v == null || v.isEmpty) return 'Password is required';
                                    if (v.length < 8) return 'Password must be at least 8 characters';
                                    return null;
                                  },
                                ),
                                if (!isLogin) ...[
                                  const SizedBox(height: 12),
                                  Text(
                                    'Confirm Password',
                                    style: theme.textTheme.bodySmall!.copyWith(
                                      color: AppColors.textPrimary,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  TextFormField(
                                    controller: _confirmPasswordController,
                                    obscureText: !showConfirmPassword,
                                    decoration: InputDecoration(
                                      hintText: 'Re-enter your password',
                                      suffixIcon: IconButton(
                                        icon: Icon(showConfirmPassword ? Icons.visibility : Icons.visibility_off),
                                        onPressed: () => setState(() => showConfirmPassword = !showConfirmPassword),
                                      ),
                                    ),
                                    validator: (v) {
                                      if (!isLogin && v != _passwordController.text) return 'Passwords do not match';
                                      return null;
                                    },
                                  ),
                                ],
                                const SizedBox(height: 12),
                                if (isLogin)
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      InkWell(
                                        onTap: () => setState(() => rememberMe = !rememberMe),
                                        child: Row(
                                          children: [
                                            Checkbox(
                                              value: rememberMe,
                                              onChanged: (v) => setState(() => rememberMe = v ?? false),
                                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                                            ),
                                            const Text('Remember me'),
                                          ],
                                        ),
                                      ),
                                      TextButton(onPressed: () {}, child: const Text('Forgot password?')),
                                    ],
                                  ),
                                const SizedBox(height: 12),
                                PrimaryButton(
                                  label: isLogin ? 'Login' : 'Create Account',
                                  onPressed: _submit,
                                ),
                                const SizedBox(height: 16),
                                const Row(
                                  children: [
                                    Expanded(child: Divider(color: AppColors.divider)),
                                    Padding(
                                      padding: EdgeInsets.symmetric(horizontal: 8),
                                      child: Text('OR'),
                                    ),
                                    Expanded(child: Divider(color: AppColors.divider)),
                                  ],
                                ),
                                const SizedBox(height: 12),
                                OutlinedButton.icon(
                                  onPressed: () {},
                                  icon: const Icon(Icons.login),
                                  label: const Text('Continue with Google'),
                                  style: OutlinedButton.styleFrom(
                                    minimumSize: const Size.fromHeight(48),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppColors.card,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.divider),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(Icons.warning_amber_rounded, color: AppColors.warning, size: 18),
                              SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  'This app does not replace medical diagnosis. Always consult a dermatologist.',
                                  style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              TextButton(onPressed: () {}, child: const Text('Privacy Policy', style: TextStyle(fontSize: 12))),
                              const Text('•', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              TextButton(onPressed: () {}, child: const Text('Terms', style: TextStyle(fontSize: 12))),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

