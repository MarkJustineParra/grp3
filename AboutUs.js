import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUs = ({ setIsLoggedIn, setShowAboutUs }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Sample data for images and descriptions
  const photos = [
    { uri: require('./assets/members/andrey.jpg'), description: 'Description for photo 1' },
    { uri: require('./assets/members/justine.jpg'), description: 'Description for photo 1' },
    { uri: require('./assets/members/bravo.jpg'), description: 'Description for photo 1' },

    // Add more photos as needed
  ];

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
        <Ionicons name="log-out-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={require('./assets/manong.jpg')} style={styles.backgroundImage} />
      
      <View style={styles.aboutUsCard}>
        <Text style={styles.aboutUsTitle}>ABOUT US</Text>
        <Text style={styles.aboutUsSubtitle}>BSIT 3B Group 3</Text>
        <Image source={require('./assets/heart_icon.png')} style={styles.aboutUsIcon} />
      </View>
      
      <Text style={styles.groupMembersText}>Group Members:</Text>
      <ScrollView horizontal style={styles.photoContainer}>
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => handlePhotoPress(photo)}>
            <Image source={photo.uri} style={styles.groupMembersImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setShowAboutUs(false)}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Photo Description */}
      {selectedPhoto && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setSelectedPhoto(null);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Image source={selectedPhoto.uri} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{selectedPhoto.description}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4c983',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  aboutUsCard: {
    position: 'absolute',
    top: 390,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#f5c1a2',
    borderRadius: 10,
    marginTop: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aboutUsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  aboutUsIcon: {
    position: 'absolute',
    left: 310,
    top: 10,
    width: 40,
    height: 40,
  },
  groupMembersText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 450,
  },
  photoContainer: {
    flexDirection: 'row',
    marginVertical: 50,
  },
  groupMembersImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make circular
    marginHorizontal: 5,
    
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
  footerButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    padding: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modalDescription: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AboutUs;
