

import { View, Text, StyleSheet, ImageBackground  } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import WordChooserBox from './../GameComponents/WordChooserBox'
import YouChoosed from '../GameComponents/YouChoosed';
import WhichWordBox from '../GameComponents/WhichWordBox';
import GameOverModal from '../GameComponents/GameOverModal';
import { useRoute } from '@react-navigation/native';
import Data from './../Data/Data'
import ScoreCard from '../GameComponents/ScoreCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import GoodWords from '../GameComponents/GoodWords'
import BackButtonModal from '../GameComponents/BackButtonModal';
import Timer from '../GameComponents/Timer';
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {  InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';



// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest("ca-app-pub-3131514056752591/4985894872", {
//   requestNonPersonalizedAdsOnly: true
// });

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL, {
//   requestNonPersonalizedAdsOnly: true
// });
export default function SinglePlayerGame() {

  // const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);

  // const loadRewardedInterstitial = () => {
  //   console.log("started Loading")
  //   const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       console.log("loaded")
  //       setRewardedInterstitialLoaded(true);
  //     }
  //   );

  //   const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       handleContinue();
  //     }
  //   );

  //   const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
  //     AdEventType.CLOSED,
  //     () => {
  //       setRewardedInterstitialLoaded(false);
  //       rewardedInterstitial.load();
  //     }
  //   );

  //   rewardedInterstitial.load();

  //   return () => {
  //     console.log("closed")
  //     unsubscribeLoaded();
  //     unsubscribeClosed();
  //     unsubscribeEarned();
  //   }
  // };

  const [nooflives, setnooflives] = useState(1);

  const navigation= useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    })
  }, [])
  const isNotContain=(s,li)=>{
    for (let ii of li){
      if (ii==s){
        return false;
      }
    }
    return true
  }
const [fullData, setfullData] = useState([])
  const route = useRoute();


var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

function stringifyNumber(n) {


  if (n < 20) return special[n];
  if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
  return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}

const [noTurn, setnoTurn] = useState(1)
const [score, setscore] = useState(0)
const [took, settook] = useState([])
const [showChoosed, setshowChoosed] = useState(false) 
const [prevShowing, setprevShowing] = useState(false)
  const [presentSelectedWord, setpresentSelectedWord] = useState("");
  const [prevCount, setprevCount] = useState(1)
  const [GameOver, setGameOver] = useState(false)

  const { theme } = route.params;
    const [data,setData]= useState([]);



   
    


    const handleSelectedWord = (word) => {

 


      //console.log("hai")
      setpresentSelectedWord(word)
      settook([...took,word])
      setnoTurn(noTurn+1)
        //console.log(`Selected word: ${word}`);
      setshowChoosed(true)
        const timer = setTimeout(() => {
          setshowChoosed(false)
          setprevShowing(true);
          let lar=0;
          let tempData=[]
          x=word
            if(took.length!=0){
              x=took[0];
            }

            let prevSelectedno=0;
          while(lar<5){
            //console.log(lar)

            if(prevSelectedno<took.length && Math.floor(Math.random()*2)==1){
              temp=Math.floor(Math.random()*took.length)
            
            
              if(took[temp]!=x && isNotContain(took[temp],  tempData)){
                tempData.push(took[temp])
                  lar+=1;
                  prevSelectedno+=1;
                  
              }
      
            }
            
            else{
            temp=Math.floor(Math.random()*fullData.length)
            
            
            if(fullData[temp]!=x && isNotContain(fullData[temp],  tempData)){
              tempData.push(fullData[temp])
                lar+=1;
                
            }
    
          }
          
        }
        tempData.splice(Math.floor(Math.random()*5),0,x);
            
            setData(tempData);
        }, 1500);

        timer;
       

      };

      const handleSelectedPrev=(word)=>{
        if(word!=took[prevCount-1]){
          setGameOver(true)
          //console.log("wrong")
        }else{
          setscore(score+1);
          if(prevCount==noTurn-1){
            setprevCount(1)
            setprevShowing(false)
            let lar=0;
           let tempData=[]
            while(lar<6){
              //console.log(lar)
              temp=Math.floor(Math.random()*fullData.length)
              if(isNotContain(fullData[temp],  tempData)){
                tempData.push(fullData[temp])
                  lar+=1;
                  
              }
      
            }
            
            setData(tempData)
          }else{

            let x=took[prevCount];
            let lar=0;
          let tempData=[]

            let prevSelectedno=0;
          while(lar<5){
            //console.log(lar)

            if(prevSelectedno<took.length && Math.floor(Math.random()*2)==1){
              temp=Math.floor(Math.random()*took.length)
            
            
              if(took[temp]!=x && isNotContain(took[temp],  tempData)){
                tempData.push(took[temp])
                  lar+=1;
                  prevSelectedno+=1;
                  
              }
      
            }
            
            else{
            temp=Math.floor(Math.random()*fullData.length)
            
            
            if(fullData[temp]!=x && isNotContain(fullData[temp],  tempData)){
              tempData.push(fullData[temp])
                lar+=1;
                
            }
    
          }
          
        }
        tempData.splice(Math.floor(Math.random()*5),0,x);
            
            setData(tempData)



          setprevCount(prevCount+1)
    
          }
          
          //console.log("correct")
        }
      }

    const handleTryAgain=()=>{
      setnooflives(1);
      settimeup(false)
      setscore(0);
      setGameOver(false)
      setprevCount(1)
      setpresentSelectedWord("")
      setprevShowing(false)
      setshowChoosed(false)
      settook([])
      setnoTurn(1)

      let lar=0;
      let tempData=[]
      while(lar<6){
        temp=Math.floor(Math.random()*fullData.length)
        if(isNotContain(fullData[temp],  tempData)){
          tempData.push(fullData[temp])
            lar+=1;
            
        }

      }
      setData(tempData)
      
    }


    const handleContinue=()=>{
      setnooflives(nooflives-1);
      setGameOver(false)
      settimeup(false);
    }

    useEffect(() => {

      //console.log("IN useEffect")
      // console.log(Data["Data"][theme])
      let fullData2=Data["Data"][theme]
      setfullData([...Data["Data"][theme]])
      
      
      let lar=0;
      let tempData=[]
      while(lar<6){
        temp=Math.floor(Math.random()*fullData2.length)
        if(isNotContain(fullData2[temp],  tempData)){
          tempData.push(fullData2[temp])
            lar+=1;
            
        }

      }
      setData(tempData)


    //   const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();
    //   console.log(rewardedInterstitialLoaded)

     
    //   console.log("I am in single player use Effect")
    // return () => {  
  
    //   unsubscribeRewardedInterstitialEvents();
    // };

    }, [])
    


    const [timeup, settimeup] = useState(false)

      
  return (
    <>
     <SafeAreaView>
         <StatusBar style="light" backgroundColor='#19062e' />
         </SafeAreaView>
         <ImageBackground
        source={require("./../../assets/spaceBackground.jpg")
      }
        resizeMode="stretch"
        style={{"height":"100%"}}
        >
    
    <View>
    
        
      
   <GoodWords text={"Memory Mania"}/>
   <BackButtonModal goBackName={"home"} />
      <ScoreCard score={score} target={null} text={"Score"}/>
      
      
     
      
      {!prevShowing && !showChoosed && <WordChooserBox own={true} words={data} onWordSelect={handleSelectedWord} turn={stringifyNumber(noTurn)}/>}
      {!prevShowing && showChoosed && <YouChoosed title={"YOU CHOOSED"} name={presentSelectedWord} />}
      {prevShowing && <WhichWordBox timeup={timeup} gameover={GameOver} settimeup={settimeup} n={noTurn-1} k={prevCount} playerName={"you"} words={data} onWordSelect={handleSelectedPrev} turn={stringifyNumber(prevCount)}/>}
      {(timeup || GameOver) && <GameOverModal nooflives={nooflives} timeup={timeup} highScore={true} handleContinue={handleContinue} currentScore={score} answer={took[prevCount-1]} onTryAgain={handleTryAgain} onGoHome={()=>{   navigation.navigate('home');}}/>}
      
    </View>
    <View style={styles.container}>
      <BannerAd 
        unitId={"ca-app-pub-3131514056752591/5201231884"}
        // unitId={TestIds.BANNER}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}

      />
      </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingBottom: 50,
  }
})