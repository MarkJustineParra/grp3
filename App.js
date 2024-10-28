// App.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './Login';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';
import CreateAccount from './CreateAccount';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <View style={styles.container}>
      {showAboutUs ? (
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
