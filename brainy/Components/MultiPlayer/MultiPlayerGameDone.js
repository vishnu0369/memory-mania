import React, { useEffect, useState } from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import AllPlayersScores from '../GameComponents/AllPlayersScores';
import Winner from './Winner';

const MultiPlayerGameDone = ({scores, players, playerIndexList,onGoHome,onTryAgain}) => {
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
    ]).start(() => onGoHome());
  };

  return (
    <Modal transparent visible animationType="none">
      <View style={styles.container}>
        <Animated.View style={[styles.modal, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {/* <View className=" max-h-64">
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{justifyContent:'center',alignItems:"center",flex:0}} horizontal={false} > */}
  	       {/* <Text style={styles.heading}></Text>
          {/* <Text style={styles.text}>Level {level} Completed</Text> */}

          <Winner scores={scores} players={players} />
            <View className="w-60">
          <AllPlayersScores scores={scores} players={players} playerIndexList={playerIndexList}/>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={onTryAgain}>
              <Text style={styles.buttonText}>One More Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleGoToHome}>
              <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
          {/* </ScrollView>
          </View> */}
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

export default MultiPlayerGameDone