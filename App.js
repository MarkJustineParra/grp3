import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './Login';
import Dashboard from './Dashboard';
import AboutUs from './AboutUs';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  return (
    <View style={styles.container}>
      {showAboutUs ? (
        <AboutUs setIsLoggedIn={setIsLoggedIn} setShowAboutUs={setShowAboutUs} />
      ) : isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} setShowAboutUs={setShowAboutUs} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
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
