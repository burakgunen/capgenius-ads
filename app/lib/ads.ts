import { Platform } from 'react-native';
import mobileAds, { BannerAdSize, TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';

let _inited = false;

export function initAdsOnce() {
  if (_inited) return;
  _inited = true;
  try {
    mobileAds().initialize();
  } catch {}
}

const IOS_BANNER = process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID;
const IOS_INTER = process.env.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID;
const AND_BANNER = process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID;
const AND_INTER = process.env.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID;

export function getBannerUnitId() {
  if (__DEV__) return TestIds.BANNER;
  const id = Platform.OS === 'ios' ? IOS_BANNER : AND_BANNER;
  return typeof id === 'string' && id.includes('/') ? id : null;
}

export function getInterstitialUnitId() {
  if (__DEV__) return TestIds.INTERSTITIAL;
  const id = Platform.OS === 'ios' ? IOS_INTER : AND_INTER;
  return typeof id === 'string' && id.includes('/') ? id : null;
}

export const bannerSize = BannerAdSize.ANCHORED_ADAPTIVE_BANNER;

export function useSafeInterstitial() {
  const unitId = getInterstitialUnitId() ?? TestIds.INTERSTITIAL;
  const inter = useInterstitialAd(unitId, { requestNonPersonalizedAdsOnly: false });
  return {
    ...inter,
    safeShow: () => {
      try { if (inter.isLoaded) inter.show(); } catch {}
    },
  };
}
