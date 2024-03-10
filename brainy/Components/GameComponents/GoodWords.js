import React from 'react';
import { Text, View, StyleSheet } from 'react-native';



const Goodwords = ({ text }) => {
  
  return (
    <View style={styles.container}>
     <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: '#19062e',
    padding: 10,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Goodwords;
