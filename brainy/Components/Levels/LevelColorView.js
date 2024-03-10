import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LevelColorView = () => {
  return (
    <View style={styles.container}>
        <View style={styles.container2}>
      <View style={styles.colorBoxYellow}></View>
      <Text style={styles.colorText}>Successfully Completed Levels</Text>
      </View>
      <View style={styles.container2}>
      <View style={styles.colorBoxGreen}></View>
      <Text style={styles.colorText}>Current Level</Text>
      </View>
      <View style={styles.container2}>
      <View style={styles.colorBoxRed}></View>
      <Text style={styles.colorText}>Locked Levels</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    // alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingLeft:20,
    margin:10,
    marginBottom:70
  },
  container2: {
   
    flexDirection:'row',
   margin:5
    
  },
  colorBoxYellow: {
    width: 30,
    height: 30,
    backgroundColor: '#e3e84f',
    
    
  },
  colorBoxGreen: {
    width: 30,
    height: 30,
    backgroundColor: '#4fb069',

  },
  colorBoxRed: {
    width: 30,
    height: 30,
    backgroundColor: '#e63749',
 
  },
  colorText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop:10
  },
});

export default LevelColorView;
