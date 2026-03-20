import { Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Ana Sayfa</Text>
        <Text style={styles.title}>Ezoterik Psikoloji</Text>
        <Text style={styles.subtitle}>
          İç dünyanı anlamak, sembollerle düşünmek ve her gün kendine biraz daha yaklaşmak için
          sakin bir alan.
        </Text>
      </View>

      <SectionCard title="Günün İçgörüsü">
        <Text style={styles.cardText}>
          Bugün yavaşlamak sana iyi gelebilir. Cevap aramak yerine hislerini fark etmek,
          zihnindeki karmaşayı daha görünür hale getirebilir.
        </Text>
      </SectionCard>

      <SectionCard title="Arketip Kartı">
        <Text style={styles.cardHighlight}>Bilge Kadın</Text>
        <Text style={styles.cardText}>
          Sezgine güvenmeyi, sessizlikte oluşan bilgeliği ve kendi iç rehberliğini hatırlatır.
        </Text>
      </SectionCard>

      <SectionCard title="Bugün Ne Hissediyorsun?">
        <View style={styles.feelingRow}>
          <FeelingChip label="Sakin" />
          <FeelingChip label="Meraklı" />
          <FeelingChip label="Yorgun" />
          <FeelingChip label="Umutlu" />
        </View>
      </SectionCard>

      <LinkCard
        href="/journal"
        title="Journal"
        description="Bugünün düşüncelerini ve sembollerini birkaç satırla kaydet."
      />

      <LinkCard
        href="/tarot-insights"
        title="Tarot Insights"
        description="Kart yorumları ve günlük sembolik rehberlik için bu alana geç."
      />

      <LinkCard
        href="/birth-chart-insight"
        title="Birth Chart Insight"
        description="Demo doğum haritası içgörülerini incele ve ana temalarını keşfet."
      />

      <SectionCard title="Premium">
        <Text style={styles.cardText}>
          Yakında daha derin arketip analizleri, kişisel içgörü geçmişi ve özel rehberli içerikler
          burada olacak.
        </Text>
      </SectionCard>
    </ScrollView>
  );
}

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

type LinkCardProps = {
  href: '/journal' | '/tarot-insights' | '/birth-chart-insight';
  title: string;
  description: string;
};

function LinkCard({ href, title, description }: LinkCardProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.linkCard}>
        <Text style={styles.linkTitle}>{title}</Text>
        <Text style={styles.cardText}>{description}</Text>
      </Pressable>
    </Link>
  );
}

type FeelingChipProps = {
  label: string;
};

function FeelingChip({ label }: FeelingChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
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
    marginBottom: 8,
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
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '600',
  },
  cardHighlight: {
    color: '#D8BA84',
    fontSize: 20,
    fontWeight: '600',
  },
  cardText: {
    color: '#C7C0B5',
    fontSize: 14,
    lineHeight: 21,
  },
  feelingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    color: '#E8E0D2',
    fontSize: 13,
  },
  linkCard: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#2E2A24',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  linkTitle: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '600',
  },
});
