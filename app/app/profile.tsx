import { ScrollView, Text, View, TouchableOpacity, TextInput, Switch, Alert } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeContext } from "@/lib/theme-provider";
import { useRouter } from "expo-router";

const EDUCATION_ARTICLES = [
  {
    id: "1",
    title: "What is melanoma?",
    description: "Understand common skin cancer types and signs",
    icon: "info",
  },
  {
    id: "2",
    title: "Prevention tips",
    description: "How to protect your skin from UV exposure",
    icon: "shield",
  },
  {
    id: "3",
    title: "When to visit a doctor?",
    description: "Warning signs that need clinical evaluation",
    icon: "medical-services",
  },
];

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { colorScheme, setColorScheme } = useThemeContext();
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "education">(
    "profile"
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Mohamed",
    email: "ahmed@example.com",
  });
  const [settingsData, setSettingsData] = useState({
    darkMode: colorScheme === "dark",
    notifications: true,
    language: "ar",
  });

  const handleChangePassword = () => {
    Alert.alert(
      "Change password",
      "We will send a password reset link to your email.",
      [{ text: "OK", onPress: () => {} }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "Are you sure? This will permanently delete your account and scans.",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            // TODO: Delete account
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      "Export data",
      "We will send an export to your email.",
      [{ text: "OK", onPress: () => {} }]
    );
  };

  const handleLogout = () => {
    // TODO: clear auth/session
    router.replace("/auth");
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row bg-surface border-b border-border">
          {[
            { id: "profile", label: "Profile" },
            { id: "settings", label: "Settings" },
            { id: "education", label: "Education" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 items-center border-b-2 ${
                activeTab === tab.id
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Text
                className={`font-semibold ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          <View className="px-6 py-4 gap-4">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <>
                {/* User Avatar & Info */}
                <View className="items-center gap-4 py-4">
                  <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
                    <MaterialIcons name="person" size={40} color="white" />
                  </View>
                  {!isEditingProfile ? (
                    <>
                      <View className="items-center gap-1">
                        <Text className="text-xl font-bold text-foreground">
                          {profileData.fullName}
                        </Text>
                        <Text className="text-sm text-muted">
                          {profileData.email}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => setIsEditingProfile(true)}
                        className="bg-primary rounded-lg px-6 py-2 active:opacity-80"
                      >
                        <Text className="text-white font-semibold text-sm">
                          Edit Profile
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <View className="w-full gap-3">
                      <TextInput
                        value={profileData.fullName}
                        onChangeText={(text) =>
                          setProfileData({ ...profileData, fullName: text })
                        }
                        placeholder="الاسم الكامل"
                        placeholderTextColor={colors.muted}
                        className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                        style={{ color: colors.foreground }}
                      />
                      <TextInput
                        value={profileData.email}
                        onChangeText={(text) =>
                          setProfileData({ ...profileData, email: text })
                        }
                        placeholder="البريد الإلكتروني"
                        placeholderTextColor={colors.muted}
                        className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                        style={{ color: colors.foreground }}
                      />
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => setIsEditingProfile(false)}
                          className="flex-1 bg-primary rounded-lg py-3 items-center justify-center active:opacity-80"
                        >
                          <Text className="text-white font-bold">Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setIsEditingProfile(false)}
                          className="flex-1 bg-surface border border-border rounded-lg py-3 items-center justify-center active:opacity-80"
                        >
                          <Text className="text-foreground font-bold">Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>

                {/* Profile Options */}
                <View className="gap-2">
                  <TouchableOpacity
                    onPress={handleChangePassword}
                    className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border active:opacity-80"
                  >
                    <View className="flex-row items-center gap-3">
                      <MaterialIcons name="lock" size={20} color={colors.primary} />
                      <Text className="font-semibold text-foreground">
                        Change password
                      </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleDeleteAccount}
                    className="bg-error bg-opacity-10 rounded-lg p-4 flex-row items-center justify-between border border-error active:opacity-80"
                  >
                    <View className="flex-row items-center gap-3">
                      <MaterialIcons name="delete" size={20} color={colors.error} />
                      <Text className="font-semibold text-error">
                        Delete account
                      </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <View className="gap-3">
                {/* Dark Mode */}
                <View className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border">
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons name="dark-mode" size={20} color={colors.primary} />
                    <Text className="font-semibold text-foreground">
                      Dark mode
                    </Text>
                  </View>
                  <Switch
                    value={settingsData.darkMode}
                    onValueChange={(value) => {
                      setSettingsData({ ...settingsData, darkMode: value });
                      setColorScheme(value ? "dark" : "light");
                    }}
                    trackColor={{ false: colors.border, true: colors.primary }}
                  />
                </View>

                {/* Notifications */}
                <View className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border">
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons name="notifications" size={20} color={colors.primary} />
                    <Text className="font-semibold text-foreground">
                      Notifications
                    </Text>
                  </View>
                  <Switch
                    value={settingsData.notifications}
                    onValueChange={(value) =>
                      setSettingsData({ ...settingsData, notifications: value })
                    }
                    trackColor={{ false: colors.border, true: colors.primary }}
                  />
                </View>

                {/* Language */}
                <View className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border">
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons name="language" size={20} color={colors.primary} />
                    <Text className="font-semibold text-foreground">
                      Language
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-muted font-semibold">Arabic</Text>
                    <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
                  </View>
                </View>

                {/* Data Export */}
                <TouchableOpacity
                  onPress={handleExportData}
                  className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border active:opacity-80"
                >
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons name="download" size={20} color={colors.primary} />
                    <Text className="font-semibold text-foreground">
                      Export data
                    </Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity
                  onPress={handleLogout}
                  className="bg-error bg-opacity-10 rounded-lg p-4 flex-row items-center justify-between border border-error active:opacity-80"
                >
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons name="logout" size={20} color={colors.error} />
                    <Text className="font-semibold text-error">Logout</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <View className="gap-3">
                {EDUCATION_ARTICLES.map((article) => (
                  <TouchableOpacity
                    key={article.id}
                    className="bg-surface rounded-lg p-4 border border-border active:opacity-80"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 items-center justify-center">
                        <MaterialIcons
                          name={article.icon as any}
                          size={24}
                          color={colors.primary}
                        />
                      </View>
                      <View className="flex-1 gap-1">
                        <Text className="font-semibold text-foreground">
                          {article.title}
                        </Text>
                        <Text className="text-xs text-muted">
                          {article.description}
                        </Text>
                      </View>
                      <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
