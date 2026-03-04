import { ScrollView, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const MOCK_REPORT = {
  image: "https://via.placeholder.com/400x500",
  riskLevel: "high",
  confidence: 87,
  explanation:
    "The scan detected features that may require clinical review. This is not a diagnosis.",
  date: "2026-03-04",
  time: "14:30",
};

export default function ShareReportScreen() {
  const colors = useColors();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleShareWhatsApp = async () => {
    setIsSharing(true);
    setIsGenerating(true);
    setShowSuccess(false);
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // TODO: Share via WhatsApp
    setIsSharing(false);
    setShowSuccess(true);
  };

  const handleShareEmail = async () => {
    setIsSharing(true);
    setIsGenerating(true);
    setShowSuccess(false);
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // TODO: Share via Email
    setIsSharing(false);
    setShowSuccess(true);
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setShowSuccess(false);
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // TODO: Download PDF
    setShowSuccess(true);
  };

  const handleCopyLink = () => {
    // TODO: Copy link
    setShowSuccess(true);
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">Share Report</Text>
          <View className="w-6" />
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <View className="px-6 py-4 gap-4">
            {/* PDF Preview Section */}
            <View className="bg-surface rounded-xl border border-border overflow-hidden">
              {/* Preview Header */}
              <View className="bg-primary px-4 py-3 flex-row items-center gap-2">
                <MaterialIcons name="picture-as-pdf" size={20} color="white" />
                <Text className="text-white font-bold text-sm">
                  PDF Preview
                </Text>
              </View>

              {/* Preview Content */}
              <View className="p-4 gap-4">
                {/* Image */}
                <Image
                  source={{ uri: MOCK_REPORT.image }}
                  className="w-full h-48 rounded-lg bg-border"
                />

                {/* Risk Level */}
                <View
                  className="rounded-lg p-4 gap-2"
                  style={{
                    backgroundColor: getRiskColor(MOCK_REPORT.riskLevel),
                    opacity: 0.15,
                  }}
                >
                  <Text className="text-xs text-muted">Risk level</Text>
                  <Text
                    className="text-lg font-bold"
                    style={{ color: getRiskColor(MOCK_REPORT.riskLevel) }}
                  >
                    {getRiskLabel(MOCK_REPORT.riskLevel)}
                  </Text>
                </View>

                {/* Confidence Score */}
                <View className="gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-muted">Confidence</Text>
                    <Text className="text-xs font-bold text-foreground">
                      {MOCK_REPORT.confidence}%
                    </Text>
                  </View>
                  <View className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${MOCK_REPORT.confidence}%`,
                        backgroundColor: getRiskColor(MOCK_REPORT.riskLevel),
                      }}
                    />
                  </View>
                </View>

                {/* Explanation */}
                <View className="gap-2">
                  <Text className="text-xs text-muted">AI explanation</Text>
                  <Text className="text-xs text-foreground leading-relaxed">
                    {MOCK_REPORT.explanation}
                  </Text>
                </View>

                {/* Date & Time */}
                <View className="flex-row items-center gap-2 pt-2 border-t border-border">
                  <MaterialIcons name="calendar-today" size={14} color={colors.muted} />
                  <Text className="text-xs text-muted">
                    {new Date(MOCK_REPORT.date).toLocaleDateString()} •{" "}
                    {MOCK_REPORT.time}
                  </Text>
                </View>
              </View>
            </View>

            {/* Loading Indicator */}
            {isGenerating && (
              <View className="bg-primary bg-opacity-10 rounded-lg p-4 flex-row items-center gap-3 border border-primary">
                <ActivityIndicator color={colors.primary} />
                <Text className="text-sm text-primary font-semibold">
                  Generating PDF...
                </Text>
              </View>
            )}

            {/* Success */}
            {showSuccess && !isGenerating && (
              <View className="bg-success bg-opacity-10 rounded-lg p-4 flex-row items-center gap-3 border border-success">
                <MaterialIcons name="check-circle" size={20} color={colors.success} />
                <Text className="text-sm text-foreground font-semibold">Done</Text>
              </View>
            )}

            {/* Share Options */}
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">
                Share options
              </Text>

              {/* WhatsApp */}
              <TouchableOpacity
                onPress={handleShareWhatsApp}
                disabled={isSharing}
                className="bg-surface rounded-lg p-4 flex-row items-center gap-3 border border-border active:opacity-80"
              >
                <View className="w-12 h-12 rounded-lg bg-success bg-opacity-10 items-center justify-center">
                  <MaterialIcons name="chat" size={24} color={colors.success} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-foreground">
                    Share via WhatsApp
                  </Text>
                  <Text className="text-xs text-muted">
                    Send the report to a contact
                  </Text>
                </View>
                {isSharing && (
                  <ActivityIndicator color={colors.primary} size="small" />
                )}
              </TouchableOpacity>

              {/* Email */}
              <TouchableOpacity
                onPress={handleShareEmail}
                disabled={isSharing}
                className="bg-surface rounded-lg p-4 flex-row items-center gap-3 border border-border active:opacity-80"
              >
                <View className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 items-center justify-center">
                  <MaterialIcons name="email" size={24} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-foreground">
                    Share via Email
                  </Text>
                  <Text className="text-xs text-muted">
                    Email the report to your doctor
                  </Text>
                </View>
                {isSharing && (
                  <ActivityIndicator color={colors.primary} size="small" />
                )}
              </TouchableOpacity>

              {/* Download PDF */}
              <TouchableOpacity
                onPress={handleDownloadPDF}
                disabled={isGenerating}
                className="bg-surface rounded-lg p-4 flex-row items-center gap-3 border border-border active:opacity-80"
              >
                <View className="w-12 h-12 rounded-lg bg-warning bg-opacity-10 items-center justify-center">
                  <MaterialIcons name="download" size={24} color={colors.warning} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-foreground">
                    Download PDF
                  </Text>
                  <Text className="text-xs text-muted">
                    Save the report to your device
                  </Text>
                </View>
                {isGenerating && (
                  <ActivityIndicator color={colors.primary} size="small" />
                )}
              </TouchableOpacity>

              {/* Copy Link */}
              <TouchableOpacity
                onPress={handleCopyLink}
                className="bg-surface rounded-lg p-4 flex-row items-center gap-3 border border-border active:opacity-80"
              >
                <View className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 items-center justify-center">
                  <MaterialIcons name="link" size={24} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-foreground">
                    Copy link
                  </Text>
                  <Text className="text-xs text-muted">
                    Copy a share link to clipboard
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Info Box */}
            <View className="bg-primary bg-opacity-10 rounded-lg p-4 gap-2 border border-primary">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="info" size={18} color={colors.primary} />
                <Text className="font-semibold text-primary flex-1">
                  Note
                </Text>
              </View>
              <Text className="text-xs text-foreground leading-relaxed">
                This report is for personal use and sharing with healthcare professionals only.
                It does not replace medical diagnosis.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
