import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUs = ({ setIsLoggedIn, setShowAboutUs }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] = useState(false);

  const photos = [
    { uri: require('./assets/members/andrey.jpg'), name: 'Andrey Caburnay', role: 'Typography', description: 'As the typographer, I ensure that text is visually appealing, readable, and aligns with the design, using fonts like Outfit-Medium to create a cohesive, user-friendly experience.' },
    { uri: require('./assets/members/Mark.jpg'), name: 'Mark Justine L. Parra', role: 'UI/UX Designer', description: 'As a UI/UX designer is about creating a products visual layout and interactive elements (UI) while ensuring it provides a smooth, intuitive, and satisfying experience for the user (UX). Together, they aim to make the product not only visually appealing but also functional and easy to navigate.' },
    { uri: require('./assets/members/bravo.jpg'), name: 'ReneBoy Bravo', role: 'User Persona/Lazy link Prototyping', description: 'The user persona for this app is a person who wants to learn more about physical education benefits. The user is likely to be a student or a teacher who is looking for a simple and easy to use app to learn about the benefits of physical education.' },
    { uri: require('./assets/members/inidal.jpg'), name: 'Jasmin Inidal', role: 'Color Theory', description: 'I am in charge of using color theory to create a visually calming effect. By carefully selecting and balancing colors, I aim to make the design more soothing to the eyes. This approach helps create a more comfortable viewing experience for users.' },
    { uri: require('./assets/members/plaba.jpg'), name: 'Josh Andrei Plaba', role: 'Spacing', description: 'Spacing is used in design to create visual separation between elements, making the layout more organized and easier to read. It helps guide the users eye through the content and improves the overall user experience by reducing clutter.' },
    { uri: require('./assets/members/contamina.png'), name: 'Romnic Contamina', role: '60 30 10 Rule', description: 'I represented the color of 60 30 10 by the HSL color model, which consists of hue (60%), saturation (30%), and lightness (10%). A hue of 60 degrees corresponds to yellowish colors, while a saturation of 100% results in a muted yellow.' },
  ];

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePhotoPress(item)} style={styles.photoItem}>
      <Image source={item.uri} style={styles.groupMembersImage} />
    </TouchableOpacity>
  );

  const handleLogout = () => {
    setIsLoggedIn(false); // Update parent state to log out
    setLogoutConfirmationVisible(false); // Close the confirmation modal
    setShowAboutUs(false); // Optionally, hide the About Us view immediately
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/manong.jpg')} style={styles.backgroundImage} />

      <View style={styles.aboutUsCard}>
        <Text style={styles.aboutUsTitle}>ABOUT US</Text>
        <Text style={styles.aboutUsSubtitle}>BSIT 3B Group 3</Text>
        <Image source={require('./assets/heart_icon.png')} style={styles.aboutUsIcon} />
      </View>

      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.photoContainer}
        showsVerticalScrollIndicator={false}
      />

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
            <Text style={styles.memberName}>{selectedPhoto.name}</Text>
            <Text style={styles.memberRole}>{selectedPhoto.role}</Text>
            <Text style={styles.modalDescription}>{selectedPhoto.description}</Text>
          </View>
        </Modal>
      )}

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutConfirmationVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLogoutConfirmationVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.confirmationCard}>
            <Text style={styles.confirmationText}>Do you want to log out?</Text>
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
    height: 300,
    resizeMode: 'cover',
  },
  aboutUsCard: {
    position: 'absolute',
    top: 260,
    alignItems: 'center',
    width: '90%',
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
  aboutUsSubtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  aboutUsMembers:{
    fontSize: 10,
    
  },
  aboutUsIcon: {
    position: 'absolute',
    right: 15,
    top: 20,
    width: 40,
    height: 40,
  },
  photoContainer: {
    top: 370,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  photoItem: {
    margin: 5,
    alignItems: 'center',
  },
  groupMembersImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#efb572',
    paddingVertical: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerButtonText: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Outfit',
    fontWeight: 'bold',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  memberName: {
    fontSize: 18,
    color: '#F0E68C',
    fontWeight: 'bold',
    marginTop: 10,
  },
  memberRole: {
    fontSize: 16,
    color: '#fff',
  },
  modalDescription: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  confirmationCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  confirmationText: {
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

export default AboutUs;