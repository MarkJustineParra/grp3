// GetStarted.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const GetStarted = ({ setShowGetStarted }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo2.png')} // Adjust the path to your logo
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Our Physical Education!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setShowGetStarted(false)}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4c983', // Light background color
    padding: 20,
  },
  logo: {
    width: 100, // Set your desired width
    height: 100, // Set your desired height
    marginBottom: 20, // Space between the logo and title
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    top: 50,
    backgroundColor: '#f0ad4e', // Button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 2, // Shadow effect for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GetStarted;
