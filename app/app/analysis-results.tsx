import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const MOCK_ANALYSIS = {
  image: "https://via.placeholder.com/400x500",
  date: "2026-03-04",
  time: "14:30",
  riskLevel: "high",
  confidence: 87,
  explanation:
    "The scan detected features that may require clinical review. This is not a diagnosis.",
  recommendation:
    "If the risk is high, book a dermatologist visit soon. If rapid changes occur, seek urgent care.",
};

export default function AnalysisResultsScreen() {
  const colors = useColors();
  const router = useRouter();
  const [expandedExplanation, setExpandedExplanation] = useState(false);

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

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "check-circle";
      case "medium":
        return "warning";
      case "high":
        return "error";
      default:
        return "help";
    }
  };

  const handleSaveToHistory = () => {
    // TODO: Save analysis result
    router.push("/lesion-detail");
  };

  const handleShareReport = () => {
    router.push("/share-report");
  };

  const handleNewScan = () => {
    router.replace("/camera");
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">Scan Result</Text>
          <View className="w-6" />
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <View className="px-6 py-4 gap-4">
            {/* Image Section */}
            <View className="gap-2">
              <Image
                source={{ uri: MOCK_ANALYSIS.image }}
                className="w-full h-64 rounded-xl bg-surface"
              />
              <Text className="text-xs text-muted text-center">
                {new Date(MOCK_ANALYSIS.date).toLocaleDateString()} •{" "}
                {MOCK_ANALYSIS.time}
              </Text>
            </View>

            {/* Risk Indicator Card */}
            <View
              className="rounded-xl p-6 gap-4"
              style={{
                backgroundColor: getRiskColor(MOCK_ANALYSIS.riskLevel),
                opacity: 0.12,
              }}
            >
              <View className="flex-row items-center gap-3">
                <MaterialIcons
                  name={getRiskIcon(MOCK_ANALYSIS.riskLevel)}
                  size={32}
                  color={getRiskColor(MOCK_ANALYSIS.riskLevel)}
                />
                <View className="flex-1">
                  <Text className="text-xs text-muted">Risk level</Text>
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: getRiskColor(MOCK_ANALYSIS.riskLevel) }}
                  >
                    {getRiskLabel(MOCK_ANALYSIS.riskLevel)}
                  </Text>
                </View>
              </View>

              {/* Confidence Score */}
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-foreground">
                    Confidence
                  </Text>
                  <Text
                    className="text-sm font-bold"
                    style={{ color: getRiskColor(MOCK_ANALYSIS.riskLevel) }}
                  >
                    {MOCK_ANALYSIS.confidence}%
                  </Text>
                </View>
                <View className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${MOCK_ANALYSIS.confidence}%`,
                      backgroundColor: getRiskColor(MOCK_ANALYSIS.riskLevel),
                    }}
                  />
                </View>
              </View>
            </View>

            {/* AI Explanation Section */}
            <View className="bg-surface rounded-xl p-4 gap-3 border border-border">
              <Text className="text-sm font-semibold text-foreground">
                AI explanation
              </Text>
              <Text
                className={`text-sm leading-relaxed ${
                  expandedExplanation ? "text-foreground" : "text-muted"
                }`}
                numberOfLines={expandedExplanation ? undefined : 3}
              >
                {MOCK_ANALYSIS.explanation}
              </Text>
              <TouchableOpacity
                onPress={() => setExpandedExplanation(!expandedExplanation)}
                className="flex-row items-center gap-2"
              >
                <Text className="text-sm font-semibold text-primary">
                  {expandedExplanation ? "See less" : "See more"}
                </Text>
                <MaterialIcons
                  name={expandedExplanation ? "expand-less" : "expand-more"}
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Recommendation Section */}
            {MOCK_ANALYSIS.riskLevel === "high" && (
              <View
                className="rounded-xl p-4 gap-2 border-l-4"
                style={{
                  backgroundColor: colors.error,
                  opacity: 0.1,
                  borderLeftColor: colors.error,
                }}
              >
                <View className="flex-row items-center gap-2">
                  <MaterialIcons
                    name="warning"
                    size={20}
                    color={colors.error}
                  />
                  <Text className="font-bold text-error flex-1">Important</Text>
                </View>
                <Text className="text-sm text-foreground leading-relaxed">
                  {MOCK_ANALYSIS.recommendation}
                </Text>
              </View>
            )}

            {/* Recommendation Section (Normal) */}
            {MOCK_ANALYSIS.riskLevel !== "high" && (
              <View className="bg-surface rounded-xl p-4 gap-2 border border-border">
                <Text className="text-sm font-semibold text-foreground">
                  Recommendation
                </Text>
                <Text className="text-sm text-muted leading-relaxed">
                  {MOCK_ANALYSIS.recommendation}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View className="px-6 py-4 gap-3 border-t border-border">
          <TouchableOpacity
            onPress={handleSaveToHistory}
            className="bg-primary rounded-lg py-4 items-center justify-center active:opacity-80"
          >
            <Text className="text-white font-bold text-base">
              Save to History
            </Text>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleShareReport}
              className="flex-1 bg-surface border border-border rounded-lg py-4 items-center justify-center active:opacity-80"
            >
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="share" size={18} color={colors.primary} />
                <Text className="text-primary font-semibold">Share Report</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNewScan}
              className="flex-1 bg-surface border border-border rounded-lg py-4 items-center justify-center active:opacity-80"
            >
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="add-a-photo" size={18} color={colors.primary} />
                <Text className="text-primary font-semibold">Start New Scan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
