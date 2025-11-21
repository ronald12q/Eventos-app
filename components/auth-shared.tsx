import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const accentBlue = '#17ecff';
const darkBackground = '#050505';
const inputLine = '#14a7d4';
const textHeavy = '#ffffff';

export function AuthScreen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
}

type AuthInputProps = TextInputProps & {
  label: string;
};

export function AuthInput({ label, style, ...rest }: AuthInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.6)"
        style={[styles.input, style]}
        {...rest}
      />
      <View style={styles.underline} />
    </View>
  );
}

type AuthButtonProps = {
  label: string;
  onPress?: () => void;
};

export function AuthButton({ label, onPress }: AuthButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

export function AuthBackButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable style={styles.backButton} onPress={onPress}>
      <Text style={styles.backText}>{'<<'}</Text>
    </Pressable>
  );
}

export { accentBlue, darkBackground, textHeavy };

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkBackground,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 30,
    justifyContent: 'center',
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    letterSpacing: 1,
    color: textHeavy,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    color: textHeavy,
    fontSize: 18,
    paddingVertical: 4,
  },
  underline: {
    height: 2,
    backgroundColor: inputLine,
    borderRadius: 2,
    marginTop: -2,
  },
  button: {
    backgroundColor: accentBlue,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonLabel: {
    color: '#020203',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 36,
    left: 20,
  },
  backText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#020203',
  },
});
