import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

type Props = { children: React.ReactNode };
type State = { error?: any };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: any, info: any) {
    try { console.log("ERROR_BOUNDARY", error, info); } catch {}
  }

  render() {
    if (this.state.error) {
      const msg = this.state.error?.message || String(this.state.error);
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              CapGenius JS Error
            </Text>
            <Text style={{ color: "white" }}>{msg}</Text>
          </ScrollView>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}
