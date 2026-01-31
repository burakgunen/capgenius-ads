import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BannerAd } from 'react-native-google-mobile-ads';
import { initAdsOnce, getBannerUnitId, bannerSize, useSafeInterstitial } from '../lib/ads';

export default function ExploreScreen() {
  useEffect(() => {
    initAdsOnce();
  }, []);

  const bannerUnitId = getBannerUnitId();
  const inter = useSafeInterstitial();

  useEffect(() => {
    try { inter.load(); } catch {}
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          inter.safeShow();
          setTimeout(() => { try { inter.load(); } catch {} }, 800);
        }}
      >
        <Text style={styles.btnText}>Interstitial Göster</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      {bannerUnitId ? (
        <BannerAd
          unitId={bannerUnitId}
          size={bannerSize}
          requestOptions={{ requestNonPersonalizedAdsOnly: false }}
        />
      ) : (
        <Text style={styles.note}>
          Prod Banner Unit ID yok. EXPO_PUBLIC_ADMOB_*_BANNER_ID set et.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 18 },
  btn: { backgroundColor: '#3b82f6', paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  spacer: { height: 24 },
  note: { color: '#94a3b8', fontSize: 12, textAlign: 'center' },
});
