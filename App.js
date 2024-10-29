// App.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './Login';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';
import CreateAccount from './CreateAccount';
import GetStarted from './GetStarted';  // Import GetStarted


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(true); // New state for GetStarted

  return (
    <View style={styles.container}>
      {showGetStarted ? (
        <GetStarted setShowGetStarted={setShowGetStarted} />  // Show GetStarted
        
      ) : showAboutUs ? (
        <AboutUs 
          setIsLoggedIn={setIsLoggedIn} 
          setShowAboutUs={setShowAboutUs} 
        />
      ) : showCreateAccount ? (
        <CreateAccount 
          setIsLoggedIn={setIsLoggedIn} 
          setShowCreateAccount={setShowCreateAccount} 
        />
      ) : isLoggedIn ? (
        <Dashboard 
          setIsLoggedIn={setIsLoggedIn} 
          setShowAboutUs={setShowAboutUs} 
        />
      ) : (
        <Login 
          setIsLoggedIn={setIsLoggedIn} 
          setShowCreateAccount={setShowCreateAccount} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
