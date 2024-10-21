import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';


const { width, height } = Dimensions.get('window');

const loadFonts = async () => {
    await Font.loadAsync({
      'Outfit': require('./assets/fonts/Outfit-Medium.ttf'), // Change this to your font path
    });
  };
  
const Dashboard = ({ setIsLoggedIn, setShowAboutUs }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
      loadFonts().then(() => setFontsLoaded(true));
    }, []);
  
    if (!fontsLoaded) {
      return null; // You can show a loading spinner here
    }
  
  return (
    <View style={styles.dashboardContainer}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
        <Ionicons name="log-out-outline" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.dashboardBox}>
        <Image source={require('./assets/womantread.png')} style={styles.dashboardImage} />
      </View>
      <Text style={styles.welcomeText}>Welcome to your Physical Education.</Text>
      <View style={styles.lineContainer}>
        <View style={styles.dot} />
        <View style={styles.separatorLine} />
        <View style={styles.dot} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
           style={styles.footerButton} 
           onPress={() => {
             setShowAboutUs(true);
             
           }}
        >
          <Text style={styles.footerButtonText}>About Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    dashboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4c983',
      },
dashboardBox: {
    position: 'absolute', // Place the image box at the top
    top: 50, // Distance from the top of the screen
    backgroundColor: '#f0ad4e',
    borderRadius: 90, // Rounded edges for the box
    padding: 20,
    width: width * 1,
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
lineContainer: {
    flexDirection: 'row',  // Align dots and line in a row
    alignItems: 'center',  // Vertically align dots and line
    marginVertical: 10,    // Space above and below the line
  },
dot: {
    width: 5,           // Diameter of the dot
    height: 5,          // Diameter of the dot
    borderRadius: 5,     // Makes the dot round
    backgroundColor: '#000',  // Color of the dot
  },
  separatorLine: {
    width: 320,  // Width of the line between the dots
    height: 2,           // Thickness of the line
    backgroundColor: '#000',  // Line color (black)
    marginHorizontal: 0,  // Spacing between dot and line
  },

  dashboardImage: {
    width: 150,  // Reduced width for the smaller image
    height: 150, // Reduced height for the smaller image
    borderRadius: 20, // Keeping the rounded corners for consistency
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -200,
    fontFamily: 'Outfit', // Use the font

  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#efb572',
    paddingVertical: 10,
  },

  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  footerButtonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
},
  logoutButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
  },
});

export default Dashboard;
