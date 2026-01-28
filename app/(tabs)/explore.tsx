import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert, Modal, FlatList } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import * as Clipboard from 'expo-clipboard';

const LANGUAGES = [
  { id: 'en', label: 'English', flag: '🇺🇸', code: 'EN' },
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷', code: 'TR' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪', code: 'DE' },
  { id: 'ru', label: 'Pусский', flag: '🇷🇺', code: 'RU' },
  { id: 'ar', label: 'العربية', flag: '🇸🇦', code: 'AR' },
  { id: 'fr', label: 'Français', flag: '🇫🇷', code: 'FR' },
  { id: 'it', label: 'Italiano', flag: '🇮🇹', code: 'IT' },
];

const TRANSLATIONS: any = {
  en: { writeAbout: 'What should we write about?', tone: 'Tone', length: 'Length', short: 'Short', medium: 'Medium', long: 'Long', generate: 'GENERATE', pro: 'PRO VERSION', success: 'Success', copied: 'Copied!', hayranlik: 'Admiration', gururlu: 'Proud', minnet: 'Gratitude', komik: 'Funny', romantik: 'Romantic', motivasyon: 'Motivation', alayci: 'Sarcastic', huzunlu: 'Sad', heyecanli: 'Excited', ofke: 'Angry' },
  tr: { writeAbout: 'Ne hakkında yazalım?', tone: 'Duygu Durumu', length: 'Uzunluk', short: 'Kısa', medium: 'Orta', long: 'Uzun', generate: 'OLUŞTUR', pro: 'PRO SÜRÜM', success: 'Başarılı', copied: 'Kopyalandı!', hayranlik: 'Hayranlık', gururlu: 'Gururlu', minnet: 'Minnet', komik: 'Komik', romantik: 'Romantik', motivasyon: 'Motivasyon', alayci: 'Alaycı', huzunlu: 'Hüzünlü', heyecanli: 'Heyecanlı', ofke: 'Öfke' },
  de: { writeAbout: 'Worüber schreiben?', tone: 'Ton', length: 'Länge', short: 'Kurz', medium: 'Mittel', long: 'Lang', generate: 'ERSTELLEN', pro: 'PRO VERSION', success: 'Erfolg', copied: 'Kopiert!', hayranlik: 'Bewunderung', gururlu: 'Stolz', minnet: 'Dankbarkeit', komik: 'Lustig', romantik: 'Romantisch', motivasyon: 'Motivation', alayci: 'Sarkastisch', huzunlu: 'Traurig', heyecanli: 'Aufgeregt', ofke: 'Wütend' },
  ru: { writeAbout: 'О чем написать?', tone: 'Тон', length: 'Длина', short: 'Коротко', medium: 'Средне', long: 'Длинно', generate: 'СОЗДАТЬ', pro: 'PRO ВЕРСИЯ', success: 'Успех', copied: 'Скопировано!', hayranlik: 'Восхищение', gururlu: 'Гордость', minnet: 'Благодарность', komik: 'Смешно', romantik: 'Романтично', motivasyon: 'Мотивация', alayci: 'Сарказм', huzunlu: 'Грустно', heyecanli: 'Волнение', ofke: 'Гнев' },
  ar: { writeAbout: 'عن ماذا نكتب؟', tone: 'أسلوب', length: 'طول', short: 'قصير', medium: 'متوسط', long: 'طويل', generate: 'إنشاء', pro: 'نسخة برو', success: 'تم', copied: 'تم النسخ!', hayranlik: 'إعجاب', gururlu: 'فخور', minnet: 'امتنان', komik: 'مضحك', romantik: 'رومانسي', motivasyon: 'تحفيز', alayci: 'ساخر', huzunlu: 'حزين', heyecanli: 'متحمس', ofke: 'غاضب' },
  fr: { writeAbout: 'Sujet à écrire?', tone: 'Ton', length: 'Longueur', short: 'Court', medium: 'Moyen', long: 'Long', generate: 'GÉNÉRER', pro: 'PRO VERSION', success: 'Succès', copied: 'Copié!', hayranlik: 'Admiration', gururlu: 'Fier', minnet: 'Gratitude', komik: 'Drôle', romantik: 'Romantique', motivasyon: 'Motivation', alayci: 'Sarcastique', huzunlu: 'Triste', heyecanli: 'Excité', ofke: 'Colère' },
  it: { writeAbout: 'Di cosa scrivere?', tone: 'Tono', length: 'Lunghezza', short: 'Breve', medium: 'Medio', long: 'Lungo', generate: 'GENERA', pro: 'VERSIONE PRO', success: 'Fatto', copied: 'Copiato!', hayranlik: 'Ammirazione', gururlu: 'Orgoglioso', minnet: 'Gratitudine', komik: 'Divertente', romantik: 'Romantico', motivasyon: 'Motivazione', alayci: 'Sarcastico', huzunlu: 'Triste', heyecanli: 'Emozionato', ofke: 'Rabbia' },
};

const TONE_BASE = [
  { id: 'hayranlik', icon: 'star' }, { id: 'gururlu', icon: 'trophy' },
  { id: 'minnet', icon: 'hands-helping' }, { id: 'komik', icon: 'laugh-beam' },
  { id: 'romantik', icon: 'heart' }, { id: 'motivasyon', icon: 'dumbbell' },
  { id: 'alayci', icon: 'grin-wink' }, { id: 'huzunlu', icon: 'sad-tear' },
  { id: 'heyecanli', icon: 'fire' }, { id: 'ofke', icon: 'angry' },
];

export default function ExploreScreen() {
  const [text, setText] = useState('');
  const [res, setRes] = useState('');
  const [load, setLoad] = useState(false);
  const [selTone, setSelTone] = useState('hayranlik');
  const [selLang, setSelLang] = useState(LANGUAGES[1]);
  const [selLen, setSelLen] = useState('medium');
  const [showModal, setShowModal] = useState(false);

  const t = (key: string) => TRANSLATIONS[selLang.id]?.[key] || TRANSLATIONS['en'][key];

  useEffect(() => {
    const locale = Localization.getLocales()[0]?.languageCode || 'en';
    const found = LANGUAGES.find(l => l.id === locale);
    if (found) setSelLang(found);
  }, []);

  const sortedTones = useMemo(() => {
    return [...TONE_BASE].sort((a, b) => t(a.id).localeCompare(t(b.id)));
  }, [selLang]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(res);
    Alert.alert(t('success'), t('copied'));
  };

  const generate = async () => {
    if (!text) return Alert.alert('!', t('writeAbout'));
    setLoad(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ 
            role: 'system', 
            content: `Write only in ${selLang.label}. Add 2-3 relevant mentions and always end with #CapGenius tag.` 
          },
          { role: 'user', content: `${t(selTone)} tone, ${t(selLen)} length: ${text}` }],
        }),
      });
      const data = await response.json();
      setRes(data.choices[0].message.content);
    } catch (e) { Alert.alert('Error', 'API Error'); } finally { setLoad(false); }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="robot" size={28} color="#7b89f4" />
            <Text style={styles.title}>CapGenius</Text>
          </View>
          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.langBtn}>
            <Text style={styles.langText}>{selLang.flag} {selLang.code}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pro}><Text style={styles.proT}>👑 {t('pro')}</Text></View>

        <View style={styles.pRow}>
          {['logo-instagram', 'logo-facebook', 'logo-twitter', 'logo-linkedin'].map((icon, i) => (
            <View key={i} style={[styles.pIcon, i === 0 && {backgroundColor: '#E1306C'}]}>
              <Ionicons name={icon} size={20} color="white" />
            </View>
          ))}
        </View>

        <Text style={styles.label}>{t('writeAbout')}</Text>
        <TextInput style={styles.input} placeholder="MacBook Air" placeholderTextColor="#64748b" value={text} onChangeText={setText} />

        <Text style={styles.label}>{t('tone')}</Text>
        <View style={styles.grid}>
          {sortedTones.map(tone => (
            <TouchableOpacity key={tone.id} onPress={() => setSelTone(tone.id)} style={[styles.tBtn, selTone === tone.id && styles.sel]}>
              <FontAwesome5 name={tone.icon} size={14} color={selTone === tone.id ? 'white' : '#94a3b8'} />
              <Text style={[styles.tText, selTone === tone.id && {color: 'white'}]}>{t(tone.id)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.lRow}>
          {['short', 'medium', 'long'].map(l => (
            <TouchableOpacity key={l} onPress={() => setSelLen(l)} style={[styles.lBtn, selLen === l && styles.sel]}>
              <Text style={{color: selLen === l ? 'white' : '#94a3b8', fontWeight: 'bold'}}>{t(l)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.gen} onPress={generate}>
          {load ? <ActivityIndicator color="white" /> : <Text style={styles.genT}>✨ {t('generate')}</Text>}
        </TouchableOpacity>

        {res ? (
          <View style={styles.resBox}>
            <Text style={styles.resContent}>{res}</Text>
            <TouchableOpacity onPress={handleCopy} style={styles.copyBtn}>
              <Ionicons name="copy-outline" size={20} color="#7b89f4" />
              <Text style={styles.copyBtnText}>{t('success')}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.mO}>
          <View style={styles.mC}>
            <FlatList data={LANGUAGES} keyExtractor={i => i.id} renderItem={({item}) => (
              <TouchableOpacity style={styles.mI} onPress={() => {setSelLang(item); setShowModal(false);}}>
                <Text style={{fontSize: 18}}>{item.flag} {item.label}</Text>
              </TouchableOpacity>
            )} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  langBtn: { backgroundColor: '#1e293b', padding: 8, borderRadius: 10, borderWidth: 1, borderColor: '#334155' },
  langText: { color: 'white', fontWeight: 'bold' },
  pro: { backgroundColor: '#facc15', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 25 },
  proT: { color: '#0f172a', fontWeight: 'bold' },
  pRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  pIcon: { padding: 12, borderRadius: 12, backgroundColor: '#1e293b', flex: 1, alignItems: 'center' },
  label: { color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  input: { backgroundColor: '#1e293b', borderRadius: 12, padding: 15, color: 'white', marginBottom: 25, borderWidth: 1, borderColor: '#334155' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 25 },
  tBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 12, borderRadius: 10, width: '48%', borderWidth: 1, borderColor: '#334155' },
  tText: { color: '#94a3b8', marginLeft: 10, fontSize: 13 },
  lRow: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  lBtn: { flex: 1, backgroundColor: '#1e293b', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  sel: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  gen: { backgroundColor: '#e11d48', padding: 20, borderRadius: 15, alignItems: 'center' },
  genT: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resBox: { backgroundColor: '#1e293b', padding: 20, borderRadius: 15, marginTop: 25, borderWidth: 1, borderColor: '#334155' },
  resContent: { color: 'white', lineHeight: 22, marginBottom: 15 },
  copyBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', backgroundColor: '#0f172a', padding: 8, borderRadius: 8 },
  copyBtnText: { color: '#7b89f4', marginLeft: 5, fontSize: 12, fontWeight: 'bold' },
  mO: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 40 },
  mC: { backgroundColor: '#1e293b', borderRadius: 20, padding: 10 },
  mI: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#334155' }
});
