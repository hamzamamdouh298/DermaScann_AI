import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../routing/app_router.dart';
import '../services/ai_service.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  CameraController? _controller;
  Future<void>? _initializeFuture;

  XFile? _captured;
  bool _isAnalyzing = false;

  @override
  void initState() {
    super.initState();
    _setupCamera();
  }

  Future<void> _setupCamera() async {
    final cameras = await availableCameras();
    final back = cameras.firstWhere(
      (c) => c.lensDirection == CameraLensDirection.back,
      orElse: () => cameras.first,
    );
    _controller = CameraController(back, ResolutionPreset.medium, enableAudio: false);
    _initializeFuture = _controller!.initialize();
    setState(() {});
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  Future<void> _capture() async {
    if (_controller == null) return;
    try {
      await _initializeFuture;
      final image = await _controller!.takePicture();
      setState(() => _captured = image);
    } catch (_) {}
  }

  Future<void> _confirmAndAnalyze() async {
    if (_captured == null || _isAnalyzing) return;
    setState(() => _isAnalyzing = true);

    final ai = context.read<AiService>();
    final result = await ai.analyzeLesion(File(_captured!.path));

    setState(() => _isAnalyzing = false);

    Navigator.of(context).pushNamed(
      AppRoutes.analysisResult,
      arguments: result,
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_captured != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Preview'),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => setState(() => _captured = null),
          ),
        ),
        body: Column(
          children: [
            Expanded(
              child: InteractiveViewer(
                child: Center(child: Image.file(File(_captured!.path))),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  PrimaryButton(
                    label: _isAnalyzing ? 'Analyzing...' : 'Confirm & Analyze',
                    isLoading: _isAnalyzing,
                    onPressed: _isAnalyzing ? null : _confirmAndAnalyze,
                  ),
                  const SizedBox(height: 12),
                  OutlinedButton(
                    onPressed: _isAnalyzing ? null : () => setState(() => _captured = null),
                    style: OutlinedButton.styleFrom(minimumSize: const Size.fromHeight(48)),
                    child: const Text('Retake'),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: _controller == null
                  ? const Center(child: CircularProgressIndicator(color: Colors.white))
                  : FutureBuilder(
                      future: _initializeFuture,
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.done) {
                          return Stack(
                            children: [
                              CameraPreview(_controller!),
                              Center(
                                child: Container(
                                  width: 220,
                                  height: 320,
                                  decoration: BoxDecoration(
                                    border: Border.all(color: AppColors.primary, width: 2),
                                    borderRadius: BorderRadius.circular(24),
                                  ),
                                ),
                              ),
                              Positioned(
                                top: 16,
                                left: 16,
                                right: 16,
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    IconButton(
                                      icon: const Icon(Icons.close, color: Colors.white),
                                      onPressed: () => Navigator.of(context).pop(),
                                    ),
                                    const Text(
                                      'New Scan',
                                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                                    ),
                                    const SizedBox(width: 40),
                                  ],
                                ),
                              ),
                              Positioned(
                                top: 72,
                                left: 16,
                                right: 16,
                                child: Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withAlpha(140),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Row(
                                    children: const [
                                      Icon(Icons.lightbulb, color: Colors.yellow, size: 18),
                                      SizedBox(width: 8),
                                      Expanded(
                                        child: Text(
                                          'Use good lighting and keep the lesion inside the frame.',
                                          style: TextStyle(color: Colors.white, fontSize: 12),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          );
                        }
                        return const Center(child: CircularProgressIndicator(color: Colors.white));
                      },
                    ),
            ),
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  GestureDetector(
                    onTap: _capture,
                    child: Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 4),
                      ),
                      child: Center(
                        child: Container(
                          width: 64,
                          height: 64,
                          decoration: const BoxDecoration(shape: BoxShape.circle, color: Colors.white),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Place the lesion inside the frame and tap to capture.',
                    style: TextStyle(color: Colors.white70, fontSize: 13),
                    textAlign: TextAlign.center,
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

