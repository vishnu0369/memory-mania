import React, { useEffect, useState } from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const GameWon = ({ level, onNextLevel, onGoToHome }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleNextLevel = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start(() => onNextLevel());
  };

  const handleGoToHome = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start(() => onGoToHome());
  };

  return (
    <Modal transparent visible animationType="none">
      <View style={styles.container}>
        <Animated.View style={[styles.modal, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.heading}>Hurray! You Won</Text>
          <Text style={styles.text}>Level {level} Completed</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleGoToHome}>
              <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNextLevel}>
              <Text style={styles.buttonText}>Go to Next Level</Text>
            </TouchableOpacity>
            
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  nextButton: {
    backgroundColor: '#5BC236',
  },
  homeButton: {
    backgroundColor: '#FF4141',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameWon