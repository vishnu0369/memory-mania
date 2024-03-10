
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av';
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import { useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
const MultiPlayerHome = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    });
    
  }, []) 

  const route = useRoute();
  const { theme} = route.params;

  const  handlePress = async() =>{
    try {
       const { sound: soundObject, status } = await 
          Audio.Sound.createAsync(require("./../../assets/clicked.mp3"), { shouldPlay: true });
       await soundObject.playAsync();
       } catch (error) { console.log(error); }
   }
  
    const navigation= useNavigation();
  const [numPlayers, setNumPlayers] = useState(2);
  const [strings, setStrings] = useState(['Player 1','Player 2']);

  const handleNumPlayersChange = (value) => {
    //console.log(value);
    
    let temp=[];
    for(let i=1;i<=value;i++){
      //console.log(i)
        if(i<strings.length){
            temp.push(strings[i-1]);
        }else{
            temp.push(`Player ${i}`);
        }
        
    }

    //console.log(temp)
    setStrings(temp);
    setNumPlayers(value);
  };

  const handleStringChange = (index, value) => {
    const newStrings = [...strings];
    newStrings[index] = value;
    setStrings(newStrings);
  };

  const handleAddString = () => {
    setStrings([...strings, '']);
  };

  const handleRemoveString = (index) => {
    const newStrings = [...strings];
    newStrings.splice(index, 1);
    setStrings(newStrings);
  };

  const handleTransferData = () => {
    // TODO: Implement transfer data logic
  

     // Handle level click here
     handlePress()
  

  
 
     navigation.navigate('multiplayergame', { players: strings, theme:theme, noofplayers:numPlayers });
    // //console.log(numPlayers,strings)
    
    
  };

  return (
    <>
      <SafeAreaView>
         <StatusBar style="light" backgroundColor='#6a148c' />
         </SafeAreaView>

      
    <ImageBackground
        source={require("./../../assets/spaceBackground.jpg")
      }
        resizeMode="stretch"
        style={{"height":"100%"}}
        >
    <View style={styles.container}>
      <Text style={styles.label}>Number of players:</Text>
      <View className="h-20">
      <ScrollView horizontal={true} style={styles.numPlayersContainer}>
        {[...Array(9)].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => handleNumPlayersChange(i + 2)}>
            <View style={[styles.numPlayer, numPlayers === i + 2 && styles.numPlayerActive]}>
              <Text  style={[styles.numPlayerText, numPlayers === i + 2 && styles.numPlayerTextActive]}>{i + 2}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
        

      <View className="flex-row"><Text style={styles.label}>Change Player Names:</Text><Text style={styles.label2}> Optional</Text></View>
      <View className="h-80 w-72">
      <ScrollView style={styles.stringsContainer}>
        {strings.map((str, i) => (
          <View key={i} style={styles.stringContainer}>
            <TextInput
              style={styles.stringInput}
              value={str}
              onChangeText={(value) => handleStringChange(i, value)}
            />
            {/* {i !== 0 && i!==1 && (
              <TouchableOpacity onPress={() => handleRemoveString(i)}>
                <Text style={styles.removeStringButton} className="p-2">x</Text>
              </TouchableOpacity>
            )} */}
          </View>
        ))}
        {/* <TouchableOpacity onPress={handleAddString}>
          <Text style={styles.addStringButton}>+ Add another Choice</Text>
        </TouchableOpacity> */}
      </ScrollView>
      </View>

      <TouchableOpacity onPress={handleTransferData} className="mb-7">
        <Text style={styles.transferButton}>Lets Go...</Text>
      </TouchableOpacity>
      <View style={styles.container2}>
      <BannerAd 
        unitId={"ca-app-pub-3131514056752591/3195135209"}
        // unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}

      />
      </View>
    </View>
    </ImageBackground>
    </>
  );
};

const styles = {
  
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  
    container2: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 30,
      paddingBottom: 50,
    },
 
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color:"white"
  },
  label2: {
    
    fontSize: 14,
    marginTop: 22,
    marginBottom: 2,
    alignSelf: 'flex-start',
    color:"white"
  },
  numPlayersContainer: {
    marginTop: 10,
    marginBottom: 20,
   
 
  
  },
  numPlayer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor:"white"
  },
  numPlayerText: {
    fontWeight: 'bold',
    color:"black"
  },
  numPlayerActive: {
    backgroundColor: 'blue',
  },
  numPlayerTextActive: {
    color: 'orange',
  },
  stringsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  stringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    stringInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 10,
    borderRadius: 5,
    color:"white"
    
    },
    removeStringButton: {
    color: 'red',
    marginLeft: 10,
    fontSize:40
    },
    addStringButton: {
    color: '#0000ff',
    fontWeight: 'bold',
    marginTop: 10,
    },
    transferButton: {
    backgroundColor: '#0000ff',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    },
    };
    
    export default MultiPlayerHome;
