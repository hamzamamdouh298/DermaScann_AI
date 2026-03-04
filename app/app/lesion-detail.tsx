import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, FlatList, Alert } from "react-native";
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

const MOCK_LESION = {
  id: "1",
  name: "Lesion on Arm",
  location: "Right Arm",
  firstDetectedDate: "2026-01-15",
  averageRisk: "medium",
  notes: "Slightly raised, irregular borders",
  image: "https://via.placeholder.com/400x500",
};

const MOCK_TIMELINE = [
  {
    id: "1",
    date: "2026-03-04",
    thumbnail: "https://via.placeholder.com/80",
    riskLevel: "medium",
    confidence: 87,
  },
  {
    id: "2",
    date: "2026-02-28",
    thumbnail: "https://via.placeholder.com/80",
    riskLevel: "low",
    confidence: 92,
  },
  {
    id: "3",
    date: "2026-02-15",
    thumbnail: "https://via.placeholder.com/80",
    riskLevel: "low",
    confidence: 85,
  },
];

function TimelineItem({ item, colors }: any) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return colors.success;
      case "medium":
        return colors.warning;
      case "high":
        return colors.error;
      default:
        return colors.muted;
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "Low";
      case "medium":
        return "Medium";
      case "high":
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <View className="flex-row items-center gap-3">
      {/* Timeline connector */}
      <View className="items-center">
        <View className="w-3 h-3 rounded-full bg-primary" />
        <View className="w-0.5 h-12 bg-border" />
      </View>

      {/* Thumbnail */}
      <Image
        source={{ uri: item.thumbnail }}
        className="w-16 h-16 rounded-lg bg-border"
      />

      {/* Content */}
      <View className="flex-1 gap-1">
        <Text className="text-sm font-semibold text-foreground">
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <View className="flex-row items-center gap-2">
          <View
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getRiskColor(item.riskLevel) }}
          />
          <Text className="text-xs font-semibold text-muted">
            {getRiskLabel(item.riskLevel)}
          </Text>
          <Text className="text-xs text-muted">• {item.confidence}%</Text>
        </View>
      </View>

      {/* Chevron */}
      <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
    </View>
  );
}

export default function LesionDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(MOCK_LESION.notes);
  const [isComparison, setIsComparison] = useState(false);
  const [selectedScans, setSelectedScans] = useState<string[]>([]);

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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return colors.success;
      case "medium":
        return colors.warning;
      case "high":
        return colors.error;
      default:
        return colors.muted;
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "Low";
      case "medium":
        return "Medium";
      case "high":
        return "High";
      default:
        return "Unknown";
    }
  };

  const handleAddNewScan = () => {
    router.push("/camera");
  };

  const handleEditNotes = () => {
    setIsEditingNotes(!isEditingNotes);
  };

  const handleDeleteLesion = () => {
    Alert.alert(
      "Delete lesion",
      "Are you sure? This cannot be undone.",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            // TODO: Delete lesion
            router.back();
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleToggleScan = (scanId: string) => {
    setSelectedScans((prev) =>
      prev.includes(scanId)
        ? prev.filter((id) => id !== scanId)
        : [...prev, scanId]
    );
  };

  const handleCompare = () => {
    if (selectedScans.length < 2) {
      Alert.alert("Select at least 2 scans", "Pick two or more timeline items to compare.");
      return;
    }
    // TODO: Show comparison view
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
            {MOCK_LESION.name}
          </Text>
          <TouchableOpacity onPress={handleEditNotes}>
            <MaterialIcons name="edit" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <View className="px-6 py-4 gap-4">
            {/* Main Image Section */}
            <View className="relative">
              <GestureDetector gesture={pinchGesture}>
                <Animated.View style={[animatedStyle, { alignSelf: "center" }]}>
                  <Image
                    source={{ uri: MOCK_LESION.image }}
                    className="w-80 h-96 rounded-xl bg-surface"
                  />
                </Animated.View>
              </GestureDetector>
              {/* Risk Badge */}
              <View
                className="absolute top-4 right-4 rounded-full px-3 py-1 flex-row items-center gap-1"
                style={{ backgroundColor: getRiskColor(MOCK_LESION.averageRisk) }}
              >
                <Text className="text-white text-xs font-bold">
                  {getRiskLabel(MOCK_LESION.averageRisk)}
                </Text>
              </View>
            </View>

            {/* Lesion Information Card */}
            <View className="bg-surface rounded-xl p-4 gap-3 border border-border">
              <View className="gap-2">
                <Text className="text-xs text-muted">First detected</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {new Date(MOCK_LESION.firstDetectedDate).toLocaleDateString()}
                </Text>
              </View>

              <View className="h-px bg-border" />

              <View className="gap-2">
                <Text className="text-xs text-muted">Body location</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {MOCK_LESION.location}
                </Text>
              </View>

              <View className="h-px bg-border" />

              <View className="gap-2">
                <Text className="text-xs text-muted">Average risk</Text>
                <View className="flex-row items-center gap-2">
                  <View
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getRiskColor(MOCK_LESION.averageRisk),
                    }}
                  />
                  <Text className="text-sm font-semibold text-foreground">
                    {getRiskLabel(MOCK_LESION.averageRisk)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Notes Section */}
            <View className="bg-surface rounded-xl p-4 gap-3 border border-border">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">
                  Notes
                </Text>
                <TouchableOpacity onPress={handleEditNotes}>
                  <MaterialIcons
                    name={isEditingNotes ? "check" : "edit"}
                    size={18}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>

              {isEditingNotes ? (
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add notes..."
                  placeholderTextColor={colors.muted}
                  multiline
                  className="bg-background border border-border rounded-lg px-3 py-2 text-foreground"
                  style={{ color: colors.foreground, minHeight: 80 }}
                />
              ) : (
                <Text className="text-sm text-muted leading-relaxed">
                  {notes}
                </Text>
              )}
            </View>

            {/* Timeline Section */}
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">
                  Timeline
                </Text>
                <TouchableOpacity
                  onPress={() => setIsComparison(!isComparison)}
                  className="flex-row items-center gap-1"
                >
                  <MaterialIcons
                    name="compare-arrows"
                    size={16}
                    color={colors.primary}
                  />
                  <Text className="text-xs text-primary font-semibold">
                    {isComparison ? "Cancel" : "Compare"}
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={MOCK_TIMELINE}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (isComparison) {
                        handleToggleScan(item.id);
                      } else {
                        router.push("/analysis-results");
                      }
                    }}
                    className={`flex-row items-center gap-3 mb-3 p-3 bg-surface rounded-lg border ${
                      selectedScans.includes(item.id)
                        ? "border-primary bg-primary bg-opacity-10"
                        : "border-border"
                    }`}
                  >
                    {isComparison && (
                      <View
                        className={`w-5 h-5 rounded border-2 items-center justify-center ${
                          selectedScans.includes(item.id)
                            ? "bg-primary border-primary"
                            : "border-border"
                        }`}
                      >
                        {selectedScans.includes(item.id) && (
                          <MaterialIcons
                            name="check"
                            size={12}
                            color="white"
                          />
                        )}
                      </View>
                    )}
                    <TimelineItem item={item} colors={colors} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />

              {isComparison && selectedScans.length >= 2 && (
                <TouchableOpacity
                  onPress={handleCompare}
                  className="bg-primary rounded-lg py-3 items-center justify-center active:opacity-80"
                >
                  <Text className="text-white font-bold text-sm">
                    Compare {selectedScans.length} scans
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View className="px-6 py-4 gap-3 border-t border-border">
          <TouchableOpacity
            onPress={handleAddNewScan}
            className="bg-primary rounded-lg py-4 items-center justify-center active:opacity-80"
          >
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="add-a-photo" size={18} color="white" />
              <Text className="text-white font-bold text-base">
                Add New Scan
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEditNotes}
            className="bg-surface border border-border rounded-lg py-4 items-center justify-center active:opacity-80"
          >
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="edit" size={18} color={colors.primary} />
              <Text className="text-foreground font-bold text-base">Edit Notes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteLesion}
            className="bg-error bg-opacity-10 border border-error rounded-lg py-4 items-center justify-center active:opacity-80"
          >
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="delete" size={18} color={colors.error} />
              <Text className="text-error font-bold text-base">
                Delete Lesion
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
