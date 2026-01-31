import { Stack } from "expo-router";
import Constants from "expo-constants";
import { Text, View } from "react-native";
import { ErrorBoundary } from "./lib/ErrorBoundary";
import { installGlobalErrorTrap } from "./lib/errorTrap";
import { initAdsSafely } from "./lib/adsInit";

// ✅ EN ERKEN: daha render olmadan
installGlobalErrorTrap();
initAdsSafely();

function BuildStamp() {
  // @ts-ignore
  const v = Constants?.expoConfig?.version || Constants?.manifest?.version || "unknown";
  // @ts-ignore
  const b = Constants?.expoConfig?.ios?.buildNumber || Constants?.manifest?.ios?.buildNumber || "unknown";
  return (
    <View style={{ position: "absolute", bottom: 10, right: 10, padding: 6, opacity: 0.7 }}>
      <Text style={{ color: "white", fontSize: 11 }}>{`v${v} (${b})`}</Text>
    </View>
  );
}

export default function Layout() {
  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }} />
      <BuildStamp />
    </ErrorBoundary>
  );
}
