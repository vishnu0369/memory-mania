import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import LevelClickable from './LevelClickable';
import LevelColorView from './LevelColorView';
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').Height;

const Levels = () => {

  const navigation= useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    });
    
  }, []) 
  const route = useRoute();
  const { theme} = route.params;

  const [levels, setLevels] = useState([]);
    const [level, setlevel] = useState(1)

    async function getLevel() {
        
          const plevel = await AsyncStorage.getItem('presentLevel');
          let plevel3=level
          if (plevel !== null) {
            setlevel(parseInt(plevel))
            plevel3=parseInt(plevel)
          }

          const start = Math.floor((plevel3 - 1) / 8) * 8 + 1;
    const end = start + 7;
    // Generate an array of levels from start to end
    const newLevels = Array.from({ length: 8 }, (_, i) => start + i);
    setLevels(newLevels);

    }

  useEffect(() => {

    getLevel()
    // Calculate the start and end levels based on the given level prop
    
  }, []);

  return (
    <>
    
    <SafeAreaView>
    <StatusBar style="light" backgroundColor='#1f0f99' />
         </SafeAreaView>

    <View >
    <ImageBackground
        source={require("./../../assets/sunset.jpg")}
        resizeMode="cover"
        style={{"height":"100%"}}
        > 
    <View style={styles.titleView}>
      <Text style={styles.title}>Levels</Text>
      </View>
      <View style={styles.levelsContainer}>
        {levels.map((lvl) => (
          <LevelClickable key={lvl} theme={theme} level={lvl} currentLevel={level} />
        ))}
      </View>
      <LevelColorView/>

          <View style={styles.container}>
      <BannerAd 
        unitId={"ca-app-pub-3131514056752591/9068324700"}
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingBottom: 50,
    position:"relative",
    bottom:-20
  },
  title: {
    color:"white",
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleView: {
    
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    marginTop:10
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Levels;
