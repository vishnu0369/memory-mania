import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ time, onTimeEnd }) => {
  const [secondsLeft, setSecondsLeft] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
    }, 1000);

    if (secondsLeft === 0) {
      clearInterval(intervalId);
      onTimeEnd();
    }

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeEnd]);

  const perimeter = 2 * Math.PI * 50;
  const strokeWidth = 10;
  const strokeDashoffset = perimeter * ((time - secondsLeft) / time);

  const strokeColor = secondsLeft > 5 ? 'green' : 'red';

  return (
    <View style={styles.container}>
     
      <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <View style={styles.outerCircle}>
            <View style={[styles.innerCircle, { borderColor: strokeColor }]}>
              <Text style={styles.circleText}>{secondsLeft}</Text>
            </View>
          </View>
          <View
            style={[
              styles.timerFill,
              {
                strokeDashoffset,
                strokeColor,
                strokeWidth,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const strokeWidth=2;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: "absolute",
    top : -40,
    right:20,
    zIndex: 40
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    position: 'relative',
  },
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color:"white",
    fontSize: 32,
    fontWeight: 'bold',
  },
  timerFill: {
    position: 'absolute',
    top: strokeWidth / 2,
    left: strokeWidth / 2,
    width: 80 - strokeWidth,
    height: 80 - strokeWidth,
    borderRadius: 40 - strokeWidth / 2,
    borderWidth: strokeWidth,
    transform: [{ rotate: '-90deg' }],
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Timer;

