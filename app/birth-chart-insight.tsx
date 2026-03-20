import { ScrollView, StyleSheet, Text, View } from 'react-native';
import marsJson from '@/data/interpretations/points/mars.json';
import mercuryJson from '@/data/interpretations/points/mercury.json';
import moonJson from '@/data/interpretations/points/moon.json';
import sunJson from '@/data/interpretations/points/sun.json';
import venusJson from '@/data/interpretations/points/venus.json';

type SignKey =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

type PointInterpretationFile = {
  point?: string;
  signs?: Partial<Record<SignKey, string>>;
  houses?: Record<string, string>;
};

const fallbackInterpretation =
  'Bu yerlesim icin yorum metni simdilik hazir degil. Daha sonra detayli icerik eklenecek.';

function safeLoadPointInterpretation(
  file: PointInterpretationFile | { default?: PointInterpretationFile } | undefined
): PointInterpretationFile {
  if (!file) {
    return {};
  }

  if ('default' in file && file.default) {
    return file.default;
  }

  return file;
}

function getSignInterpretation(
  interpretationFile: PointInterpretationFile,
  sign: SignKey
): string {
  return interpretationFile.signs?.[sign] ?? fallbackInterpretation;
}

const sunInterpretations = safeLoadPointInterpretation(sunJson);
const moonInterpretations = safeLoadPointInterpretation(moonJson);
const mercuryInterpretations = safeLoadPointInterpretation(mercuryJson);
const venusInterpretations = safeLoadPointInterpretation(venusJson);
const marsInterpretations = safeLoadPointInterpretation(marsJson);

const samplePlacements = {
  sun: 'gemini',
  moon: 'scorpio',
  mercury: 'cancer',
  venus: 'taurus',
  mars: 'leo',
} as const satisfies Record<string, SignKey>;

const signLabels: Record<SignKey, string> = {
  aries: 'Koc',
  taurus: 'Boga',
  gemini: 'Ikizler',
  cancer: 'Yengec',
  leo: 'Aslan',
  virgo: 'Basak',
  libra: 'Terazi',
  scorpio: 'Akrep',
  sagittarius: 'Yay',
  capricorn: 'Oglak',
  aquarius: 'Kova',
  pisces: 'Balik',
};

const insightSections = [
  {
    title: 'Gunes',
    sign: signLabels[samplePlacements.sun],
    text: getSignInterpretation(sunInterpretations, samplePlacements.sun),
  },
  {
    title: 'Ay',
    sign: signLabels[samplePlacements.moon],
    text: getSignInterpretation(moonInterpretations, samplePlacements.moon),
  },
  {
    title: 'Merkur',
    sign: signLabels[samplePlacements.mercury],
    text: getSignInterpretation(mercuryInterpretations, samplePlacements.mercury),
  },
  {
    title: 'Venus',
    sign: signLabels[samplePlacements.venus],
    text: getSignInterpretation(venusInterpretations, samplePlacements.venus),
  },
  {
    title: 'Mars',
    sign: signLabels[samplePlacements.mars],
    text: getSignInterpretation(marsInterpretations, samplePlacements.mars),
  },
] as const;

export default function BirthChartInsightScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Statik Test Verisi</Text>
        <Text style={styles.title}>Birth Chart Insight</Text>
        <Text style={styles.subtitle}>
          Bu ekran su anda sabit ornek yerlestimlerle calisir. Amac, yorum katmaninin JSON verileri
          ile nasil okunacagini net ve test edilebilir sekilde gostermektir.
        </Text>
      </View>

      <View style={styles.highlightCard}>
        <Text style={styles.highlightLabel}>Ornek Yerlestimler</Text>
        <Text style={styles.highlightTitle}>Ikizler Gunes, Akrep Ay, Yengec Merkur</Text>
        <Text style={styles.highlightText}>
          Asagidaki yorum metinleri dogrudan `data/interpretations/points` altindaki JSON
          dosyalarindan okunur ve eksik veri durumunda guvenli bir yedek metin gosterir.
        </Text>
      </View>

      {insightSections.map((section) => (
        <View key={section.title} style={styles.card}>
          <Text style={styles.cardTitle}>{section.title}</Text>
          <Text style={styles.cardValue}>{section.sign}</Text>
          <Text style={styles.cardText}>{section.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#090909',
  },
  content: {
    padding: 20,
    paddingTop: 32,
    paddingBottom: 32,
    gap: 16,
  },
  hero: {
    gap: 8,
    marginBottom: 8,
  },
  eyebrow: {
    color: '#8F7A58',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#F5F1E8',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#B8B0A3',
    fontSize: 15,
    lineHeight: 22,
  },
  highlightCard: {
    backgroundColor: '#14110E',
    borderWidth: 1,
    borderColor: '#3A2F22',
    borderRadius: 24,
    padding: 20,
    gap: 10,
  },
  highlightLabel: {
    color: '#D8BA84',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  highlightTitle: {
    color: '#F5F1E8',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  highlightText: {
    color: '#C7C0B5',
    fontSize: 14,
    lineHeight: 21,
  },
  card: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  cardTitle: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '600',
  },
  cardValue: {
    color: '#D8BA84',
    fontSize: 16,
    fontWeight: '600',
  },
  cardText: {
    color: '#C7C0B5',
    fontSize: 14,
    lineHeight: 21,
  },
});
