import { ScrollView, Text, View, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function AuthScreen() {
  const colors = useColors();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const segmentIndex = isLogin ? 0 : 1;
  const [segmentWidth, setSegmentWidth] = useState(0);
  const underlineX = useSharedValue(0);

  useEffect(() => {
    underlineX.value = withTiming(segmentIndex * segmentWidth, { duration: 180 });
  }, [segmentIndex, segmentWidth, underlineX]);

  const underlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: underlineX.value }],
  }));

  const submitLabel = useMemo(() => (isLogin ? "Login" : "Create Account"), [isLogin]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!acceptTerms) {
        newErrors.terms = "You must accept the Terms";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Connect to backend auth
      router.replace("/(tabs)");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 py-8">
          {/* Top Section (30%) */}
          <View className="flex-[3] items-center justify-center gap-3">
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <MaterialIcons name="medical-services" size={32} color="white" />
            </View>
            <Text className="text-3xl font-bold text-foreground">DERMA</Text>
            <Text className="text-base text-muted">AI Skin Monitoring</Text>
          </View>

          {/* Middle Section (50%) */}
          <View className="flex-[5] gap-5">
            {/* Segmented Control (Login | Sign Up) */}
            <View className="bg-surface rounded-2xl border border-border px-2 pt-2">
              <View
                className="flex-row"
                onLayout={(e) => setSegmentWidth(e.nativeEvent.layout.width / 2)}
              >
                <Pressable onPress={() => setIsLogin(true)} className="flex-1 py-3 items-center">
                  <Text className={cn("font-semibold", isLogin ? "text-foreground" : "text-muted")}>
                    Login
                  </Text>
                </Pressable>
                <Pressable onPress={() => setIsLogin(false)} className="flex-1 py-3 items-center">
                  <Text className={cn("font-semibold", !isLogin ? "text-foreground" : "text-muted")}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
              {/* Animated underline */}
              <View className="relative h-1 w-full">
                <Animated.View
                  style={[
                    {
                      width: "50%",
                      height: 3,
                      borderRadius: 999,
                      backgroundColor: colors.primary,
                    },
                    underlineStyle,
                  ]}
                />
              </View>
            </View>

            {/* Form */}
            <View className="gap-4">
            {/* Full Name (Sign Up Only) */}
            {!isLogin && (
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Full Name</Text>
                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.muted}
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange("fullName", value)}
                  className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                  style={{ color: colors.foreground }}
                />
                {errors.fullName && (
                  <Text className="text-xs text-error">{errors.fullName}</Text>
                )}
              </View>
            )}

            {/* Email */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.muted}
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                style={{ color: colors.foreground }}
              />
              {errors.email && <Text className="text-xs text-error">{errors.email}</Text>}
            </View>

            {/* Password */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Password</Text>
              <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3">
                <TextInput
                  placeholder="Min 8 characters"
                  placeholderTextColor={colors.muted}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 text-foreground"
                  style={{ color: colors.foreground }}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={colors.muted}
                  />
                </Pressable>
              </View>
              {errors.password && (
                <Text className="text-xs text-error">{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Confirm Password</Text>
                <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3">
                  <TextInput
                    placeholder="Re-enter your password"
                    placeholderTextColor={colors.muted}
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange("confirmPassword", value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    className="flex-1 text-foreground"
                    style={{ color: colors.foreground }}
                  />
                  <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialIcons
                      name={showConfirmPassword ? "visibility" : "visibility-off"}
                      size={20}
                      color={colors.muted}
                    />
                  </Pressable>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-xs text-error">{errors.confirmPassword}</Text>
                )}
              </View>
            )}

            {/* Remember Me (Login Only) */}
            {isLogin && (
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center gap-2"
                >
                  <View
                    className={cn(
                      "w-5 h-5 rounded border-2 items-center justify-center",
                      rememberMe
                        ? "bg-primary border-primary"
                        : "border-border"
                    )}
                  >
                    {rememberMe && (
                      <MaterialIcons name="check" size={14} color="white" />
                    )}
                  </View>
                  <Text className="text-sm text-muted">Remember me</Text>
                </Pressable>
                <TouchableOpacity onPress={() => {}}>
                  <Text className="text-sm text-primary font-semibold">Forgot password?</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Accept Terms (Sign Up Only) */}
            {!isLogin && (
              <View className="gap-2">
                <Pressable
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  className="flex-row items-center gap-2"
                >
                  <View
                    className={cn(
                      "w-5 h-5 rounded border-2 items-center justify-center",
                      acceptTerms
                        ? "bg-primary border-primary"
                        : "border-border"
                    )}
                  >
                    {acceptTerms && (
                      <MaterialIcons name="check" size={14} color="white" />
                    )}
                  </View>
                  <Text className="text-sm text-muted">
                    I accept the <Text className="text-primary font-semibold">Terms</Text>
                  </Text>
                </Pressable>
                {errors.terms && (
                  <Text className="text-xs text-error">{errors.terms}</Text>
                )}
              </View>
            )}
            </View>

            {/* Primary CTA */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary rounded-xl py-4 items-center justify-center active:opacity-80"
            >
              <Text className="text-white font-bold text-base">{submitLabel}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-sm text-muted">OR</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Continue with Google (Optional) */}
            <TouchableOpacity className="flex-row items-center justify-center gap-2 bg-surface border border-border rounded-xl py-3 active:opacity-80">
              <MaterialIcons name="login" size={20} color={colors.primary} />
              <Text className="text-base font-semibold text-foreground">Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View className="flex-[2] justify-end">
            <View className="bg-surface border border-border rounded-xl p-4 gap-2">
              <View className="flex-row gap-2">
                <MaterialIcons name="warning" size={16} color={colors.warning} />
                <Text className="flex-1 text-xs text-muted leading-relaxed">
                  This app does not replace medical diagnosis.
                </Text>
              </View>
              <View className="flex-row gap-2 mt-2">
                <TouchableOpacity onPress={() => {}}>
                  <Text className="text-xs text-primary font-semibold">Privacy Policy</Text>
                </TouchableOpacity>
                <Text className="text-xs text-border">•</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text className="text-xs text-primary font-semibold">Terms</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
