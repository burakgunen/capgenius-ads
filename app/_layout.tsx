import { Stack } from "expo-router";
import { useEffect } from "react";
import { installGlobalErrorTrap } from "./lib/errorTrap";
import { initAdsSafely } from "./lib/adsInit";

export default function Layout() {
  useEffect(() => {
    installGlobalErrorTrap();
    initAdsSafely();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
