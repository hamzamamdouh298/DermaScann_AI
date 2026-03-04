import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function CameraScreen() {
  const colors = useColors();
  const router = useRouter();
  const [mode, setMode] = useState<"camera" | "preview">("camera");
  const [flashOn, setFlashOn] = useState(false);
  const [cameraFront, setCameraFront] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Zoom state
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = baseScale.value * event.scale;
    })
    .onEnd(() => {
      baseScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleCapture = () => {
    // Mock capture - in real app, use expo-camera
    setCapturedImage("https://via.placeholder.com/400x500");
    setMode("preview");
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setMode("camera");
    scale.value = 1;
    baseScale.value = 1;
  };

  const handleConfirm = () => {
    router.push("/analysis-results");
  };

  if (mode === "preview" && capturedImage) {
    return (
      <ScreenContainer className="bg-background">
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
            <TouchableOpacity onPress={handleRetake}>
              <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-foreground">Preview</Text>
            <View className="w-6" />
          </View>

          {/* Image Preview with Zoom */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            className="flex-1"
          >
            <View className="flex-1 items-center justify-center p-4">
              <GestureDetector gesture={pinchGesture}>
                <Animated.View style={[animatedStyle]}>
                  <Image
                    source={{ uri: capturedImage }}
                    className="w-80 h-96 rounded-xl"
                  />
                </Animated.View>
              </GestureDetector>
              <Text className="text-xs text-muted mt-4">
                Pinch to zoom (preview)
              </Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="px-6 py-4 gap-3 border-t border-border">
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-primary rounded-lg py-4 items-center justify-center active:opacity-80"
            >
              <Text className="text-white font-bold text-base">
                Confirm & Analyze
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRetake}
              className="bg-surface border border-border rounded-lg py-4 items-center justify-center active:opacity-80"
            >
              <Text className="text-foreground font-semibold text-base">
                Retake
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-black">
      <View className="flex-1">
        {/* Camera View (Mock) */}
        <View className="flex-1 bg-black items-center justify-center relative">
          {/* Camera placeholder */}
          <View className="w-full h-full bg-gray-900 items-center justify-center">
            <MaterialIcons name="photo-camera" size={80} color="#666" />
            <Text className="text-gray-500 mt-4">كاميرا (محاكاة)</Text>
          </View>

          {/* Grid Overlay */}
          <View className="absolute inset-0 opacity-30">
            <View className="flex-1 flex-row">
              <View className="flex-1 border-r border-white" />
              <View className="flex-1 border-r border-white" />
              <View className="flex-1" />
            </View>
          </View>

          {/* AI Detection Frame Guide */}
          <View className="absolute inset-0 items-center justify-center">
            <View
              className="w-64 h-80 border-2 border-primary rounded-2xl"
              style={{ opacity: 0.6 }}
            />
          </View>

          {/* Top Controls */}
          <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg">New Scan</Text>
            <View className="w-7" />
          </View>

          {/* Flash Toggle */}
          <TouchableOpacity
            onPress={() => setFlashOn(!flashOn)}
            className="absolute top-16 left-6 flex-row items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2"
          >
            <MaterialIcons
              name={flashOn ? "flash-on" : "flash-off"}
              size={20}
              color={flashOn ? "#FFD700" : "white"}
            />
            <Text className="text-white text-sm font-semibold">
              {flashOn ? "On" : "Off"}
            </Text>
          </TouchableOpacity>

          {/* Camera Switch */}
          <TouchableOpacity
            onPress={() => setCameraFront(!cameraFront)}
            className="absolute top-16 right-6 flex-row items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2"
          >
            <MaterialIcons
              name="flip-camera-android"
              size={20}
              color="white"
            />
            <Text className="text-white text-sm font-semibold">
              {cameraFront ? "Front" : "Back"}
            </Text>
          </TouchableOpacity>

          {/* Lighting Suggestion */}
          <View className="absolute top-32 left-6 right-6 bg-warning bg-opacity-90 rounded-lg px-4 py-3 flex-row items-center gap-2">
            <MaterialIcons name="lightbulb" size={20} color="#000" />
            <Text className="text-black text-xs font-semibold flex-1">
              Use good lighting for best results
            </Text>
          </View>

          {/* Auto Focus Indicator */}
          <View className="absolute top-1/3 right-6 items-center gap-2">
            <View className="w-8 h-8 border-2 border-primary rounded" />
            <Text className="text-primary text-xs font-semibold">
              Auto focus
            </Text>
          </View>
        </View>

        {/* Bottom Controls */}
        <View className="bg-black px-6 py-6 items-center gap-4">
          {/* Capture Button */}
          <TouchableOpacity
            onPress={handleCapture}
            className="w-20 h-20 rounded-full bg-primary items-center justify-center active:opacity-80"
          >
            <View className="w-16 h-16 rounded-full border-4 border-white" />
          </TouchableOpacity>

          {/* Instructions */}
          <Text className="text-white text-sm text-center">
            Place the lesion inside the frame and keep the camera steady.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
