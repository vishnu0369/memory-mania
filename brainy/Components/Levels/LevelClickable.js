import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'

const LevelClickable = ({ level, currentLevel ,theme}) => {

  const navigation= useNavigation();

  const isClickable = level <= currentLevel;
  const  handlePress = async() =>{
    try {
       const { sound: soundObject, status } = await 
          Audio.Sound.createAsync(require("./../../assets/clicked.mp3"), { shouldPlay: true });
       await soundObject.playAsync();
       } catch (error) { console.log(error); }
   }
  
  const handleClick = () => {
    handlePress();
    // Handle level click here


 

    navigation.navigate('levelplaygame', { theme,plevel:level });
    //console.log(`Clicked on level ${level}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.level,
        isClickable && styles.clickable,
        !isClickable && styles.notclickable,
        level === currentLevel && styles.currentLevel,
      ]}
      onPress={isClickable ? handleClick : null}
    >
      <Text style={styles.levelText}>{level}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  level: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 24,
  },
  clickable: {
    backgroundColor: '#e3e84f',
  },
  currentLevel: {
    backgroundColor: '#4fb069',
  },
  notclickable:{
    backgroundColor:"#e63749"
  }
});

export default LevelClickable;
