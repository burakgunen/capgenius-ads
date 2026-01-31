import mobileAds from 'react-native-google-mobile-ads';

let inited = false;

export async function initAdsSafely() {
  if (inited) return;
  inited = true;
  try {
    await mobileAds().initialize();
  } catch (e) {
    try { console.log('ADS_INIT_ERROR', e); } catch {}
  }
}
