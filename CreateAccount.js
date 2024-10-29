import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Outfit': require('./assets/fonts/Outfit-Medium.ttf'), // Update to your font path
    });
  } catch (error) {
    console.error('Error loading font: ', error);
  }
};

const CreateAccount = ({ setIsLoggedIn, setShowCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please ensure both passwords are the same.');
      return;
    }
    
    // Assume account creation is successful for this example
    Alert.alert('Account Created', 'You can now log in!');
    
    // Navigate to login screen
    setShowCreateAccount(false);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading spinner while fonts are being loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.loginTitle}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#8c8c8c"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          placeholderTextColor="#8c8c8c"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#8c8c8c"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => setShowCreateAccount(false)}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4c983',
  },
  card: {
    height: 400,
    width: width * 0.8,
    backgroundColor: '#efb572',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    borderWidth: 2,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Outfit',
  },
  input: {
    backgroundColor: '#efb572',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#000000',
    fontFamily: 'Outfit',
  },
  createAccountButton: {
    backgroundColor: '#8200ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Outfit',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#000',
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Outfit',
  },
});

export default CreateAccount;
