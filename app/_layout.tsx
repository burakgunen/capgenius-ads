import { Stack } from "expo-router";
import { useEffect } from "react";
import { initAdsSafely } from "./lib/adsInit";

export default function Layout() {
  useEffect(() => {
    initAdsSafely();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
