import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated ,Easing, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

var deviceWidth = Dimensions.get('window').width;

const LandingPage = () => { 
  const scaleValue = useRef(new Animated.Value(0.5)).current
  const scaleValueTrain = useRef(new Animated.Value(0.5)).current

  const navigation= useNavigation();

//   const Sound = require('react-native-sound')

// let hello = new Sound(require("./../assets/clicked.mp3"), Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     //console.log(error)
//   }
// }) 

const  handlePress = async() =>{
  try {
     const { sound: soundObject, status } = await 
        Audio.Sound.createAsync(require("./../assets/clicked.mp3"), { shouldPlay: true });
     await soundObject.playAsync();
     } catch (error) { console.log(error); }
 }



  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    });
    
  }, []) 

  
  
  

  const handleSinglePlayerClick = () => {
    handlePress()
    navigation.navigate('singlePlayerHome');
    
  };

  // const handleVsRoboClick = () => {
  //   navigation.navigate('VersussRobo');
  //   playSound();
  // };

  const handleMultiplayerClick = () => {
    handlePress() 
    navigation.navigate('multiplayertheme');
  };

  const handleHowToPlayClick = () => {
    handlePress()
    navigation.navigate('howtoplay');
  };
  const handlelevelClick = () => {
    handlePress()
    navigation.navigate('levelstheme');
  };
  const handlegraphClick = () => {
    handlePress()
    navigation.navigate('graphscore');
  };
  const animateLogo = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  const animateTrain = () => {
    Animated.timing(scaleValueTrain, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    animateLogo();
    animateTrain();
    
  }, []);

  return (
    <>

    <SafeAreaView>
         <StatusBar style="auto" backgroundColor='#6a148c' />
         </SafeAreaView>

      
    
    <View style={styles.container}>
        <ImageBackground
        source={require("./../assets/rocket.jpg")}
        resizeMode="cover"
        // style={styles.bimg}
        > 
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:"center",flex:0,width:deviceWidth}} horizontal={false} >
      {/* <View style={styles.logoContainer}>
        <Image
          source={require('./../assets/brain.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Memory Mania</Text>
        <Text style={styles.appName2}>-Train Your Brain Daily</Text>
      </View> */}
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleValue }] }]}>
            <Image
              source={require('./../assets/brain.png')}
              style={styles.logo}
            />
            {/* <Animated.Image
        source={require('./../assets/brain.png')}
        style={[styles.logo, { transform: [{ translateY: moveAnim.y }] }]}
      /> */}
            <Text style={styles.appName}>Memory Mania</Text>
            <Animated.View style={[styles.appName2,{ transform: [{ scale: scaleValueTrain }] }]}>
            <Text style={styles.appName2Text}>-Train Your Brain Daily</Text>
            </Animated.View>
          </Animated.View>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button } onPress={handlelevelClick}>
       
          
          <Text style={styles.buttonText}>Play Levels</Text>
          <Text style={styles.buttonText2}>-Ready?</Text>
    
         
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSinglePlayerClick}>
          <Text style={styles.buttonText}>Single Player</Text>
          <Text style={styles.buttonText2}>-Infinity Mode</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={handleVsRoboClick}>
          <Text style={styles.buttonText}>Versus Robo</Text>
          <Text style={styles.buttonText2}>-Chitti Mode</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={handleMultiplayerClick}>
          <Text style={styles.buttonText}>Multiplayer</Text>
          <Text style={styles.buttonText2}>-Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleHowToPlayClick}>
          <Text style={styles.buttonText}>How to Play</Text>
          <Text style={styles.buttonText2}>-Help?</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={handlegraphClick}>
          <Text style={styles.buttonText}>Your Graph</Text>
          <Text style={styles.buttonText2}>-suii?</Text>
        </TouchableOpacity> */}
        




      </View>
    </ScrollView>
    </ImageBackground>
    </View>
  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f51b5',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
   
  },
  appName2: {
   
    marginTop: 10,
    marginBottom:80,
    alignSelf: "flex-end"
 
  },
  appName2Text:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:"65%"
  },
  button: {
    width: '80%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    
    padding:10
  },
  // buttonImage:{
   
  //   height:"100%",
  //   width:"100%"
  // },
  buttonText: {
    color: '#3f51b5',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText2: {

    fontSize: 14,
    alignSelf: 'flex-end'
  },

  // bimg:{
  //   flex:0
  // }
});

export default LandingPage;
