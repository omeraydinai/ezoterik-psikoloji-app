import { STORAGE_KEYS, loadStoredValue, saveStoredValue } from '@/lib/local-storage';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function JournalScreen() {
  const moods = ['Sakin', 'Yoğun', 'Kararsız', 'İlhamlı', 'Yorgun'];
  const [selectedMood, setSelectedMood] = useState('Sakin');
  const [entry, setEntry] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function restoreJournal() {
      const savedJournal = await loadStoredValue<JournalFormData>(STORAGE_KEYS.journal);

      if (!savedJournal) {
        return;
      }

      setSelectedMood(savedJournal.selectedMood);
      setEntry(savedJournal.entry);
    }

    restoreJournal();
  }, []);

  async function handleSave() {
    await saveStoredValue(STORAGE_KEYS.journal, {
      selectedMood,
      entry,
    });

    setIsSaved(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>İçsel Alan</Text>
        <Text style={styles.title}>Journal</Text>
        <Text style={styles.subtitle}>
          Düşüncelerini yargılamadan yaz. Bazen birkaç cümle bile günün duygusunu ve iç sesini daha
          görünür hale getirir.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Bugün ne hissediyorsun?</Text>

        <View style={styles.moodRow}>
          {moods.map((mood) => {
            const isActive = mood === selectedMood;

            return (
              <Pressable
                key={mood}
                onPress={() => {
                  setSelectedMood(mood);
                  setIsSaved(false);
                }}
                style={[styles.moodChip, isActive ? styles.moodChipActive : null]}>
                <Text style={[styles.moodText, isActive ? styles.moodTextActive : null]}>{mood}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Bugünkü notların</Text>
          <TextInput
            multiline
            placeholder="Bugün zihninden ve kalbinden geçenleri yaz..."
            placeholderTextColor="#6F6A63"
            selectionColor="#D8BA84"
            style={styles.textArea}
            textAlignVertical="top"
            value={entry}
            onChangeText={(value) => {
              setEntry(value);
              setIsSaved(false);
            }}
          />
        </View>

        <Pressable onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </Pressable>

        {isSaved ? (
          <View style={styles.savedBox}>
            <Text style={styles.savedTitle}>Kaydedildi</Text>
            <Text style={styles.savedText}>
              Seçtiğin ruh hali ve yazın şu an yalnızca bu ekranın yerel durumunda tutuluyor.
            </Text>
          </View>
        ) : (
          <Text style={styles.helperText}>
            Seçtiğin duygu ve yazdığın notlar şimdilik yalnızca bu cihaz oturumunda görünür.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

type JournalFormData = {
  selectedMood: string;
  entry: string;
};

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
    padding: 18,
    gap: 16,
  },
  sectionTitle: {
    color: '#F5F1E8',
    fontSize: 18,
    fontWeight: '600',
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  moodChip: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  moodChipActive: {
    backgroundColor: '#D8BA84',
    borderColor: '#D8BA84',
  },
  moodText: {
    color: '#E8E0D2',
    fontSize: 13,
  },
  moodTextActive: {
    color: '#141414',
    fontWeight: '700',
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '600',
  },
  textArea: {
    minHeight: 220,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#2C2C2C',
    borderRadius: 16,
    color: '#F5F1E8',
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#D8BA84',
    borderRadius: 16,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#141414',
    fontSize: 15,
    fontWeight: '700',
  },
  helperText: {
    color: '#A79C8D',
    fontSize: 13,
    lineHeight: 20,
  },
  savedBox: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#2E2A24',
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  savedTitle: {
    color: '#F5F1E8',
    fontSize: 15,
    fontWeight: '600',
  },
  savedText: {
    color: '#C7C0B5',
    fontSize: 13,
    lineHeight: 20,
  },
});
