import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

const loadFonts = async () => {
  await Font.loadAsync({
    'Outfit': require('./assets/fonts/Outfit-Medium.ttf'),
  });
};

const Dashboard = ({ setIsLoggedIn, setShowAboutUs }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [currentIndex, setCurrentIndex] = useState(1);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] = useState(false); // New state for logout confirmation


  const activities = [
    {
      name: 'Cycling',
      icon: 'bicycle-outline',
      description: 'Cycling is a low-impact aerobic exercise that offers a wealth of benefits. It improves cardiovascular fitness and builds muscle strength.',
    },
    {
      name: 'Weightlifting',
      icon: 'barbell-outline',
      description: 'Weightlifting is a form of strength training that helps increase muscle mass, improve posture, and boost metabolism.',
    },
    {
      name: 'Walking',
      icon: 'walk-outline',
      description: 'Walking is a simple, low-impact exercise that promotes cardiovascular health and helps reduce stress.',
    },
    {
      name: 'Football',
      icon: 'football-outline',
      description: 'Football is a popular sport that improves coordination, teamwork skills, and overall physical fitness.',
    },
    {
      name: 'Basketball',
      icon: 'basketball-outline',
      description: 'Basketball enhances hand-eye coordination, flexibility, and endurance. It’s great for building teamwork and social skills.',
    },
    {
      name: 'Zumba',
      icon: 'musical-notes-outline',
      description: 'Zumba is a fitness program that combines dance and aerobics, offering a fun way to burn calories and improve cardiovascular health.',
    },
    {
      name: 'Dance',
      icon: 'body-outline',
      description: 'Dancing improves flexibility, strength, and stamina. It also boosts mood and helps reduce stress.',
    },
    {
      name: 'Yoga',
      icon: 'leaf-outline',
      description: 'Yoga promotes relaxation, flexibility, and mental well-being through physical postures, breathing techniques, and meditation.',
    },
    {
      name: 'Other description',
      icon: 'ellipsis-horizontal-outline',
      
      description: 'Physical education encompasses a wide range of activities beyond traditional sports. It includes exercises that promote strength, flexibility, endurance, and mental wellness. From outdoor adventures like hiking to recreational activities such as swimming, the goal is to encourage a holistic approach to physical fitness and lifelong healthy habits.',
    },
  ];

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleActivityPress = (activity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged in state to false
    setLogoutConfirmationVisible(false); // Close the confirmation modal
    // You can navigate to the login screen if needed
    // navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <View style={styles.dashboardBox}>
        <View style={styles.photoSliderContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={({ nativeEvent }) => {
              const index = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width) + 1;
              setCurrentIndex(index);
            }}
            scrollEventThrottle={16}
          >
            <Image source={require('./assets/womantread.png')} style={styles.photoSliderLarge} />
            <Image source={require('./assets/womantread.png')} style={styles.photoSliderLarge} />
            <Image source={require('./assets/womantread.png')} style={styles.photoSliderLarge} />
          </ScrollView>
          <View style={styles.indicatorContainer}>
            <Text style={styles.indicatorText}>{currentIndex}/3</Text>
          </View>
        </View>
      </View>

      <Text style={styles.welcomeText}>Welcome to your Physical Education.</Text>
      <View style={styles.lineContainer}>
        <View style={styles.dot} />
        <View style={styles.separatorLine} />
        <View style={styles.dot} />
      </View>

      <Text style={styles.physicalEducationDescription}>
        Physical education promotes physical fitness, skill development, and overall well-being.
        It encourages a healthy lifestyle, teamwork, and personal growth through various sports and activities.
      </Text>

      <View style={styles.activitiesContainer}>
        {activities.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityItem} onPress={() => handleActivityPress(activity)}>
            <View style={styles.iconContainer}>
              <Ionicons name={activity.icon} size={60} color="#000" style={styles.iconBackground} />
            </View>
            <Text style={styles.activityText}>{activity.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setShowAboutUs(false)}>
          <Ionicons name="home-outline" size={30} color="#000" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setShowAboutUs(true)}>
          <Ionicons name="information-circle-outline" size={30} color="#000" />
          <Text style={styles.footerButtonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setLogoutConfirmationVisible(true)}>
          <Ionicons name="log-out-outline" size={30} color="#000" />
          <Text style={styles.footerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

{/* Logout Confirmation Modal */}
<Modal
        visible={logoutConfirmationVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLogoutConfirmationVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Do you want to log out?</Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setLogoutConfirmationVisible(false)}>
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

       {/* Existing modal for selected activity */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedActivity({});
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={35} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedActivity.name}</Text>
            {selectedActivity.images ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.imageScrollView}
                showsHorizontalScrollIndicator={false}
              >
                {selectedActivity.images.map((image, idx) => (
                  <Image key={idx} source={image} style={styles.modalImage} />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.modalDescription}>{selectedActivity.description}</Text>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


  const styles = StyleSheet.create({
    
      dashboardContainer: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#f4c983',
        paddingBottom: 20,
      },
      dashboardBox: {
        marginTop: 65,
        backgroundColor: '#f0ad4e',
        borderRadius: 20,
        padding: 10,
        width: width * 0.9,
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 },
        elevation: 10,
      },
      photoSliderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      photoSliderLarge: {
        width: width * 0.7,
        height: height * 0.35,
        borderRadius: 1,
        marginHorizontal: 1,
      },
      indicatorContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
      },
      indicatorText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      
      lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      },
      dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#000',
      },
      separatorLine: {
        width: 200,
        height: 2,
        backgroundColor: '#000',
        marginHorizontal: 10,
      },
      dashboardImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        fontFamily: 'Outfit',
        textAlign: 'center',
      },
      physicalEducationDescription: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
      },
      activitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        width: '90%',
      },
      activityItem: {
        alignItems: 'center',
        marginBottom: 20,
        width: '30%', // Adjust width to fit three items per row
      },
      
      activityText: {
        marginTop: 5,
        fontSize: 14,
        color: '#000',
        textAlign: 'center', // Center-align the text
        fontWeight: 'bold',

      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#efb572', // You can change this to a gradient if desired
        
        paddingVertical: 15,
        elevation: 5, // Adding shadow for depth
        position: 'absolute',
        bottom: -50,
        width: '100%',
      },
      footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      footerButtonText: {
        color: '#00000',
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'Outfit', // Ensure the font is applied
        fontWeight: 'bold',

      },
      logoutButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
      },
      modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
      },
      modalImage: {
    width: 150, // Set a larger width for better visibility
    height: 150, // Set a matching height
    borderRadius: 10,
    marginHorizontal: 5, // Add margin for better spacing between images
  },
  imageScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5, // Adjust padding to fit the new image sizes
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '45%', // Adjust width for button
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: '45%', // Adjust width for button
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

      
    

  export default Dashboard;
