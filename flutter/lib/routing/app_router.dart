import 'package:flutter/material.dart';

import '../screens/analysis_result_screen.dart';
import '../screens/auth_screen.dart';
import '../screens/camera_screen.dart';
import '../screens/home_screen.dart';
import '../screens/lesion_detail_screen.dart';
import '../screens/profile_screen.dart';
import '../screens/share_report_screen.dart';

class AppRoutes {
  static const String auth = '/auth';
  static const String tabs = '/';
  static const String camera = '/camera';
  static const String analysisResult = '/analysis-result';
  static const String lesionDetail = '/lesion-detail';
  static const String shareReport = '/share-report';
  static const String profile = '/profile';
}

Route<dynamic> onGenerateRoute(RouteSettings settings) {
  switch (settings.name) {
    case AppRoutes.auth:
      return MaterialPageRoute(builder: (_) => const AuthScreen());
    case AppRoutes.camera:
      return MaterialPageRoute(builder: (_) => const CameraScreen());
    case AppRoutes.analysisResult:
      return MaterialPageRoute(builder: (_) => const AnalysisResultScreen());
    case AppRoutes.lesionDetail:
      return MaterialPageRoute(builder: (_) => const LesionDetailScreen());
    case AppRoutes.shareReport:
      return MaterialPageRoute(builder: (_) => const ShareReportScreen());
    case AppRoutes.profile:
      return MaterialPageRoute(builder: (_) => const ProfileScreen());
    case AppRoutes.tabs:
    default:
      return MaterialPageRoute(builder: (_) => const HomeScreen());
  }
}

