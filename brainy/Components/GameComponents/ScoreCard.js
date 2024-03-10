import React, { useState, useEffect } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

const ScoreBoard = ({ score,target ,text}) => {
  const [animValue, setAnimValue] = useState(new Animated.Value(0));
  const [currentScore, setCurrentScore] = useState(score);

  useEffect(() => {
    //console.log("target",target)
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setAnimValue(new Animated.Value(0));
      setCurrentScore(score);
    });
  }, [score]);

  const digitStyle = (digit) => {
    let color = 'red';
    if (digit === '0') {
      color = 'green';
    } else if (digit % 2 === 0) {
      color = 'blue';
    }
    return {
      backgroundColor: color,
      borderRadius: 50,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      transform: [
        {
          scale: animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.5, 1],
          }),
        },
        {
          translateY: animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, -10, 0],
          }),
        },
        {
          rotate: animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '10deg', '0deg'],
          }),
        },
      ],
    };
  };

  const digits = currentScore
    .toString()
    .split('')
    .map((digit, index) => (
      <Animated.View key={index} style={digitStyle(digit)}>
        <Text style={styles.digitText}>{digit}</Text>
      </Animated.View>
    ));

  return (<View>
    <View style={styles.scorecont}>
    <Text  style={styles.scoretext}>{text}</Text>
    {target!==null && <Text  style={styles.scoretext}>Target {target}</Text>}
    </View>
    <View style={styles.container}>{digits}</View></View>);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  scoretext: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
  ,
  digitText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scorecont:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
});

export default ScoreBoard;
