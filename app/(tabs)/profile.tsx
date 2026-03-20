import { STORAGE_KEYS, loadStoredValue, saveStoredValue } from '@/lib/local-storage';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function restoreProfile() {
      const savedProfile = await loadStoredValue<ProfileFormData>(STORAGE_KEYS.profile);

      if (!savedProfile) {
        return;
      }

      setName(savedProfile.name);
      setBirthDate(savedProfile.birthDate);
      setBirthTime(savedProfile.birthTime);
      setBirthPlace(savedProfile.birthPlace);
    }

    restoreProfile();
  }, []);

  async function handleSave() {
    await saveStoredValue(STORAGE_KEYS.profile, {
      name,
      birthDate,
      birthTime,
      birthPlace,
    });

    setIsSaved(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Kişisel Bilgiler</Text>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>
          Bu bilgiler sana özel içgörüler sunmak ve doğum haritası analizlerini daha kişisel hale
          getirmek için kullanılacak.
        </Text>
      </View>

      <View style={styles.card}>
        <FormField
          label="Ad Soyad"
          placeholder="Adını gir"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setIsSaved(false);
          }}
        />

        <FormField
          label="Doğum Tarihi"
          placeholder="GG / AA / YYYY"
          value={birthDate}
          onChangeText={(value) => {
            setBirthDate(value);
            setIsSaved(false);
          }}
        />

        <FormField
          label="Doğum Saati"
          placeholder="Örn. 08:45"
          value={birthTime}
          onChangeText={(value) => {
            setBirthTime(value);
            setIsSaved(false);
          }}
        />

        <FormField
          label="Doğum Yeri"
          placeholder="Şehir, ülke"
          value={birthPlace}
          onChangeText={(value) => {
            setBirthPlace(value);
            setIsSaved(false);
          }}
        />

        <Pressable onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </Pressable>

        <Text style={styles.note}>
          Not: Doğum saati ne kadar net olursa, doğum haritası yorumu da o kadar isabetli olur.
        </Text>

        {isSaved ? (
          <View style={styles.savedBox}>
            <Text style={styles.savedTitle}>Bilgiler hazır</Text>
            <Text style={styles.savedText}>
              Form şu an yalnızca bu ekranın yerel durumunda tutuluyor. Backend eklendiğinde kalıcı
              olarak saklanabilir.
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

type ProfileFormData = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
};

function FormField({ label, placeholder, value, onChangeText }: FormFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6F6A63"
        selectionColor="#D8BA84"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
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
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: '#2C2C2C',
    borderRadius: 14,
    color: '#F5F1E8',
    fontSize: 15,
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
  note: {
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
