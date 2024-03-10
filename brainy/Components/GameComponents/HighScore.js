import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HighScore({ currentScore}) {

    const [newHigh, setnewHigh] = useState(false)
    const [prevHigh, setprevHigh] = useState(0)
    async function checkHighScore(score) {
        try {
          const highScore = await AsyncStorage.getItem('highScoreIndividual');
          //console.log(highScore) 
          setprevHigh(highScore);
          if (highScore === null || score > parseInt(highScore)) {
            setnewHigh(true);
            await AsyncStorage.setItem('highScoreIndividual', score.toString());
          }
        } catch (error) {
          //console.log(error);
        }
      }
    
    useEffect(() => {

     checkHighScore(currentScore);

    }, [])
    
    return (
    <View style={{"padding":10}}>
        {newHigh && <Text style={styles.text}>You Scored the new High {currentScore}</Text>}
        {!newHigh && <Text style={styles.text}>HighScore : {prevHigh} </Text>}
        {!newHigh && <Text style={styles.text}>currentScore : {currentScore} </Text>}
      
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      color:"blue",
      fontSize:20,
      fontWeight:'900'
    },
})