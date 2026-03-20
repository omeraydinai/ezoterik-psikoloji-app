import { StyleSheet, Text, View } from 'react-native';

export default function TarotInsightsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarot Insights</Text>
      <Text style={styles.text}>
        Bu alan daha sonra günlük kart yorumları ve sezgisel rehberlik içeriği için
        kullanılacak.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#F5F1E8',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  text: {
    color: '#C7C0B5',
    fontSize: 15,
    lineHeight: 22,
  },
});
