import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'; // Assuming Login component is in the same directory

const Stack = createStackNavigator();

const GetStarted = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/strongman.png')} style={styles.logo} />
      <View style={styles.getStartedCard}>
        <Text style={styles.getStartedTitle}>Welcome to Our App</Text>
        <Text style={styles.getStartedSubtitle}>Your journey starts here!</Text>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4c983',
  },
  logo: {
    width: 300,
    height: 200,
    borderRadius: 110,
    marginBottom: 20,
    backgroundColor: '#f0ad4e',
  },
  getStartedCard: {
    alignItems: 'center',
    width: '90%',
    padding: 20,
    backgroundColor: '#efb572',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  getStartedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  getStartedSubtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
