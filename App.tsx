import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const COUNTER_STORAGE_KEY = 'counter-demo:value';

export default function App() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canPersist = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const loadCounter = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(COUNTER_STORAGE_KEY);
        const parsedValue = storedValue === null ? 0 : Number(storedValue);

        if (isMounted && Number.isSafeInteger(parsedValue) && parsedValue >= 0) {
          setCount(parsedValue);
          canPersist.current = true;
        }
      } catch (error) {
        console.warn('Could not load the counter.', error);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    void loadCounter();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canPersist.current) {
      return;
    }

    AsyncStorage.setItem(COUNTER_STORAGE_KEY, String(count)).catch((error) => {
      console.warn('Could not save the counter.', error);
    });
  }, [count, isLoaded]);

  const increment = () => {
    canPersist.current = true;
    setCount((currentCount) => currentCount + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Demo</Text>
      <Text style={styles.counter} accessibilityLabel={`Counter value: ${count}`}>
        {count}
      </Text>
      <Pressable
        accessibilityRole="button"
        disabled={!isLoaded}
        onPress={increment}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          !isLoaded && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonLabel}>+1</Text>
      </Pressable>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#172033',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
  },
  counter: {
    color: '#172033',
    fontSize: 80,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
    marginBottom: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 76,
    minWidth: 180,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '700',
  },
});
