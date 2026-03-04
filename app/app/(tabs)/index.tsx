import { ScrollView, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Mock data for lesions
const MOCK_LESIONS = [
  {
    id: "1",
    name: "Lesion on Arm",
    location: "Right Arm",
    riskLevel: "low",
    lastScanDate: "2026-03-01",
    thumbnail: "https://via.placeholder.com/80",
  },
  {
    id: "2",
    name: "Lesion on Back",
    location: "Upper Back",
    riskLevel: "medium",
    lastScanDate: "2026-02-28",
    thumbnail: "https://via.placeholder.com/80",
  },
  {
    id: "3",
    name: "Lesion on Leg",
    location: "Left Leg",
    riskLevel: "high",
    lastScanDate: "2026-02-25",
    thumbnail: "https://via.placeholder.com/80",
  },
];

const getRiskColor = (riskLevel: string, colors: any) => {
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
      return "منخفض";
    case "medium":
      return "متوسط";
    case "high":
      return "مرتفع";
    default:
      return "غير معروف";
  }
};

function LesionCard({ lesion, colors }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/lesion-detail")}
      className="bg-surface rounded-xl p-4 mb-3 border border-border active:opacity-80"
    >
      <View className="flex-row gap-3">
        {/* Thumbnail */}
        <View className="w-16 h-16 rounded-lg bg-border items-center justify-center">
          <Image
            source={{ uri: lesion.thumbnail }}
            className="w-16 h-16 rounded-lg"
          />
        </View>

        {/* Content */}
        <View className="flex-1 gap-1">
          <Text className="text-base font-semibold text-foreground">
            {lesion.name}
          </Text>
          <Text className="text-xs text-muted">{lesion.location}</Text>
          <View className="flex-row items-center gap-2 mt-1">
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getRiskColor(lesion.riskLevel, colors) }}
            />
            <Text className="text-xs font-semibold text-muted">
              {getRiskLabel(lesion.riskLevel)}
            </Text>
            <Text className="text-xs text-muted">
              • {new Date(lesion.lastScanDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Chevron */}
        <View className="justify-center">
          <MaterialIcons name="chevron-right" size={24} color={colors.muted} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [lesions, setLesions] = useState(MOCK_LESIONS);

  const totalLesions = lesions.length;
  const lastScanDate = lesions.length > 0 ? new Date(lesions[0].lastScanDate) : null;
  const lastScanLabel = lastScanDate ? lastScanDate.toLocaleDateString() : "No scans yet";
  const isOverdue =
    lastScanDate != null
      ? Date.now() - lastScanDate.getTime() > 1000 * 60 * 60 * 24 * 30
      : false;

  const handleNewScan = () => {
    router.push("/camera");
  };

  const handleStartFirstScan = () => {
    router.push("/camera");
  };

  const renderLesionItem = ({ item }: any) => (
    <LesionCard lesion={item} colors={colors} />
  );

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Hello, Ahmed
            </Text>
            <Text className="text-sm text-muted">
              Track your skin health
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="w-10 h-10 rounded-full bg-primary items-center justify-center"
          >
            <MaterialIcons name="person" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <View className="px-6 py-4 gap-4">
            {/* Summary Card */}
            {lesions.length > 0 && (
              <View className="bg-gradient-to-r from-primary to-tint rounded-xl p-4 gap-3">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-white text-sm opacity-90">
                      Total lesions tracked
                    </Text>
                    <Text className="text-white text-3xl font-bold">
                      {totalLesions}
                    </Text>
                  </View>
                  <MaterialIcons name="track-changes" size={40} color="rgba(255,255,255,0.3)" />
                </View>
                <View className="border-t border-white border-opacity-20 pt-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-white text-xs opacity-90">Last scan: {lastScanLabel}</Text>
                    {isOverdue && (
                      <View className="px-2 py-1 rounded-full bg-white bg-opacity-20">
                        <Text className="text-white text-[11px] font-semibold">Overdue</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}

            {/* Lesions List or Empty State */}
            {lesions.length === 0 ? (
              <View className="flex-1 items-center justify-center gap-4 py-12">
                <View className="w-24 h-24 rounded-full bg-surface items-center justify-center">
                  <MaterialIcons name="image-not-supported" size={48} color={colors.muted} />
                </View>
                <Text className="text-lg font-semibold text-foreground text-center">
                  No lesions yet
                </Text>
                <Text className="text-sm text-muted text-center px-4">
                  Start your first scan to begin tracking.
                </Text>
                <TouchableOpacity
                  onPress={handleStartFirstScan}
                  className="bg-primary rounded-lg px-6 py-3 mt-4 active:opacity-80"
                >
                  <Text className="text-white font-bold text-base">
                    Start First Scan
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text className="text-sm font-semibold text-foreground mb-3">
                  Lesions
                </Text>
                <FlatList
                  data={lesions}
                  renderItem={renderLesionItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        {lesions.length > 0 && (
          <TouchableOpacity
            onPress={handleNewScan}
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center shadow-lg active:opacity-80"
            style={{
              bottom: 16 + insets.bottom,
            }}
          >
            <MaterialIcons name="add-a-photo" size={28} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
}
