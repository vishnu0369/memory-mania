import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import Data from './../Data/Data'
const LevelsTheme = () => {

  
  const  handlePress = async() =>{
    try {
       const { sound: soundObject, status } = await 
          Audio.Sound.createAsync(require("./../../assets/clicked.mp3"), { shouldPlay: true });
       await soundObject.playAsync();
       } catch (error) { console.log(error); }
   }
  
  const themes =Data["ThemesArr"];

  const navigation= useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    })
  }, []) 
  

  const handleThemeSelection = (theme) => {
    handlePress();
    navigation.navigate('levels', { theme });
  };

  return (
    <>
        <SafeAreaView>
        <StatusBar style="light" backgroundColor='#1f0f99' />
         </SafeAreaView>
    <View style={styles.container}>
    <ImageBackground
        source={require("./../../assets/sunset.jpg")}
        resizeMode="cover"
        > 
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:"center",flex:0}} horizontal={false} >
   
      <Text style={styles.heading}>Select a Theme</Text>
      <View style={styles.buttonContainer}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme}
            style={styles.button}
            onPress={() => handleThemeSelection(theme)}
          >
            <Text style={styles.buttonText}>{theme}</Text>
          </TouchableOpacity>
        ))}
      </View>
     
      </ScrollView>
      <Text style={styles.bot}>{themes.length} Themes available</Text>
    <View style={styles.container2}>
      <BannerAd 
        unitId={"ca-app-pub-3131514056752591/7492708522"}
        // unitId={TestIds.BANNER}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}

      />
      </View>

      </ImageBackground>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
 
    position:"relative",
    bottom:-20
  },
  bot:{
    color:"green",
    alignSelf:"center",
      },
  heading: {
    color:"white",
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:90
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2e8b57',
    width: '40%',
    height: 120,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LevelsTheme;
