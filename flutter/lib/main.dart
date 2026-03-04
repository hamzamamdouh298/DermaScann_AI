import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'routing/app_router.dart';
import 'services/ai_service.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const DermaScannApp());
}

class DermaScannApp extends StatelessWidget {
  const DermaScannApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<AiService>(create: (_) => AiService()),
      ],
      child: MaterialApp(
        title: 'DermaScann AI',
        debugShowCheckedModeBanner: false,
        theme: buildAppTheme(),
        initialRoute: AppRoutes.auth,
        onGenerateRoute: onGenerateRoute,
      ),
    );
  }
}

