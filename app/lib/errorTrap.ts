import { Alert } from "react-native";

export function installGlobalErrorTrap() {
  // @ts-ignore
  const ErrorUtils = global.ErrorUtils;
  if (!ErrorUtils?.setGlobalHandler) return;

  const defaultHandler = ErrorUtils.getGlobalHandler?.();

  ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    try {
      const msg = (error?.message || String(error)).slice(0, 1200);
      Alert.alert("CapGenius Error", msg);
    } catch {}
    try { console.log("GLOBAL_ERROR", error); } catch {}
    if (defaultHandler) defaultHandler(error, isFatal);
  });
}
