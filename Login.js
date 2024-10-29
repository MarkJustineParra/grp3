import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import CreateAccount from './CreateAccount';

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

const Login = ({ setIsLoggedIn }) => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const sendOtp = () => {
    if (phoneNumber.length >= 10) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      Alert.alert('OTP Sent', `Your OTP is ${otp}`); // In a real app, this should be sent via SMS service
      setGeneratedOtp(otp.toString());
      setIsOtpSent(true);
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
    }
  };

  const handleLogin = () => {
    if (isEmailLogin) {
      if (email === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
      } else {
        Alert.alert('Invalid Credentials', 'Please enter the correct email and password.');
      }
    } else {
      if (isOtpSent) {
        if (otp === generatedOtp) {
          setIsLoggedIn(true);
        } else {
          Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
        }
      } else {
        sendOtp();
      }
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading spinner while fonts are being loaded
  }

  if (showCreateAccount) {
    return (
      <CreateAccount 
        setIsLoggedIn={setIsLoggedIn} 
        setShowCreateAccount={setShowCreateAccount} 
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/strongman.png')} style={styles.logo} />
      </View>

      <View style={styles.card}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, isEmailLogin ? styles.activeTab : null]}
            onPress={() => setIsEmailLogin(true)}
          >
            <Text style={styles.tabText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, !isEmailLogin ? styles.activeTab : null]}
            onPress={() => setIsEmailLogin(false)}
          >
            <Text style={styles.tabText}>Phone Number</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.loginTitle}>
          Login With {isEmailLogin ? 'Email' : 'Phone Number'}
        </Text>

        {isEmailLogin ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter email Id"
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
          </>
        ) : (
          <>
            {isOtpSent ? (
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#8c8c8c"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />
            ) : (
              <View style={styles.phoneInputContainer}>
                <TextInput
                  style={styles.countryCodeInput}
                  placeholder="+91"
                  placeholderTextColor="#8c8c8c"
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={[styles.input, styles.phoneInput]}
                  placeholder="Enter Phone Number"
                  placeholderTextColor="#8c8c8c"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            )}
          </>
        )}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>
            {isEmailLogin ? 'Login' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => setShowCreateAccount(true)}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.tryAnother}>Try another way?</Text>
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 200,
    borderRadius: 90,
    backgroundColor: '#f0ad4e',
  },
  card: {
    height: 350,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#ded0b8',
    borderRadius: 20,
    padding: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
    borderWidth: 1,
    width: 250,
    height: 56,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 18,
    marginHorizontal: 5,
    backgroundColor: '#ded0b8',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,

  },
  activeTab: {
    backgroundColor: '#d05e5e',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Outfit',
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCodeInput: {
    backgroundColor: '#efb572',
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 44,
    borderWidth: 1,
    borderColor: '#000',
    width: 39,
    marginRight: 10,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  phoneInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#8200ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
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
  createAccount: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Outfit',
  },
  tryAnother: {
    marginTop: 10,
    color: '#000',
    fontSize: 14,
  },
});

export default Login;

