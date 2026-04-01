import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // built into Expo

const languages = [
  { id: 54, name: 'C++', value: 'cpp' },
  { id: 71, name: 'Python', value: 'python' },
  { id: 63, name: 'Java', value: 'java' },
  { id: 93, name: 'JavaScript', value: 'javascript' },
  { id: 50, name: 'C', value: 'C' },
];

export default function App() {
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState('// Start coding here...\n');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code', 'input', 'output'

  const handleRun = async () => {
    setLoading(true);
    setOutput('Running...');
    setActiveTab('output');

    try {
      // Assuming Next.js backend is running on local machine
      // Replace with your actual backend URL when in production
      const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
      
      const res = await fetch(`${API_URL}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          languageId: language.id,
          input,
        }),
      });

      if (!res.ok) throw new Error('Failed to run code');

      const data = await res.json();

      if (data.stdout) {
        setOutput(data.stdout);
      } else if (data.compile_output) {
        setOutput(data.compile_output);
      } else if (data.message) {
        setOutput(data.message);
      } else {
        setOutput('No output');
      }
    } catch (error) {
      setOutput('Error running code. Make sure Next.js server is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>CodeZY</Text>
          <Text style={styles.subtitle}>Mobile Compiler</Text>
        </View>
        <TouchableOpacity style={styles.runButton} onPress={handleRun} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <Ionicons name="play" size={16} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.runButtonText}>Run</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Language Selector */}
      <View style={styles.languageContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.langBadge,
                language.id === lang.id && styles.langBadgeActive,
              ]}
              onPress={() => setLanguage(lang)}
            >
              <Text
                style={[
                  styles.langText,
                  language.id === lang.id && styles.langTextActive,
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['code', 'input', 'output'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.contentContainer}
      >
        {activeTab === 'code' && (
          <TextInput
            style={styles.editor}
            multiline
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            keyboardType="ascii-capable"
          />
        )}
        
        {activeTab === 'input' && (
          <TextInput
            style={styles.editor}
            multiline
            value={input}
            onChangeText={setInput}
            placeholder="Enter custom input here..."
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        )}

        {activeTab === 'output' && (
          <ScrollView style={styles.outputScroll}>
            <Text style={styles.outputText}>{output || 'No output yet.'}</Text>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Alice Blue
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0056b3', // Dark solid blue
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#004085', // Dark navy blue
    marginTop: -2,
  },
  runButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF', // Solid iOS Blue
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  runButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  languageContainer: {
    paddingLeft: 20,
    marginBottom: 15,
  },
  langBadge: {
    backgroundColor: '#E6F2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#B3D4FF',
  },
  langBadgeActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  langText: {
    color: '#0056b3',
    fontWeight: '600',
  },
  langTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 8,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#6699CC',
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#0056b3',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  editor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    color: '#333333',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 15,
    textAlignVertical: 'top',
    lineHeight: 22,
    borderWidth: 1,
    borderColor: '#CCE5FF',
  },
  outputScroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CCE5FF',
  },
  outputText: {
    color: '#0056b3',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
});
