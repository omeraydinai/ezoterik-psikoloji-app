import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  const settingsItems = [
    {
      title: 'Bildirimler',
      description: 'Günlük hatırlatmalar ve içgörü bildirimleri için tercihlerini yönet.',
    },
    {
      title: 'Verileri Temizle',
      description: 'Cihazda tutulan yerel verileri ileride bu alandan sıfırlayabileceksin.',
    },
    {
      title: 'Uygulama Hakkında',
      description: 'Ezoterik Psikoloji deneyiminin amacı ve yaklaşımı hakkında kısa bilgiler.',
    },
    {
      title: 'Gizlilik',
      description: 'Verilerin nasıl ele alınacağına dair temel gizlilik yaklaşımını görüntüle.',
    },
    {
      title: 'Premium',
      description: 'Derinlemesine analizler, özel içerikler ve gelişmiş içgörüler için ayrılan alan.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Uygulama</Text>
        <Text style={styles.title}>Ayarlar</Text>
        <Text style={styles.subtitle}>
          Deneyimini sakin ve sana uygun hale getirecek temel seçenekler burada yer alır.
        </Text>
      </View>

      <View style={styles.card}>
        {settingsItems.map((item) => (
          <View key={item.title} style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowDescription}>{item.description}</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </View>
        ))}
      </View>
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
    paddingTop: 64,
    paddingBottom: 32,
    gap: 16,
  },
  hero: {
    gap: 8,
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
  card: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#232323',
    gap: 16,
  },
  rowText: {
    flex: 1,
    gap: 6,
  },
  rowTitle: {
    color: '#F5F1E8',
    fontSize: 16,
    fontWeight: '600',
  },
  rowDescription: {
    color: '#B8B0A3',
    fontSize: 13,
    lineHeight: 20,
  },
  rowArrow: {
    color: '#8F7A58',
    fontSize: 24,
    lineHeight: 24,
  },
});
