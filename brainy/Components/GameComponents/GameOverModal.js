import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import HighScore from './HighScore';
import { RewardedAd, BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

// import {
//   RewardedAd,
//   RewardedAdEventType,
//   TestIds,
// } from 'react-native-google-mobile-ads';

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest("ca-app-pub-3131514056752591/8868674849", {
//   requestNonPersonalizedAdsOnly: true
// });



// const rewardedInterstitial = RewardedAd.createForAdRequest(TestIds.REWARDED, {
//   requestNonPersonalizedAdsOnly: true
// });
const rewardedInterstitial = RewardedAd.createForAdRequest("ca-app-pub-3131514056752591/8868674849", {
  requestNonPersonalizedAdsOnly: true
});
const GameOverModal = ({nooflives,  onTryAgain, onGoHome ,answer,highScore , currentScore, handleContinue,timeup}) => {
  

  


  const loadRewardedInterstitial = () => {

    if(nooflives>0){
    console.log("started Loading")
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("loaded")
        setRewardedInterstitialLoaded(true);
      }
    );

 
  
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        handleContinue();
      }
    );
  
    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        console.log("failed")
        rewardedInterstitial.load();
      }
    );
  
    rewardedInterstitial.load();
  
    return () => {
      console.log("closed")
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    }
  }
  };
  
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);

  // const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest("ca-app-pub-3131514056752591/4985894872", {
  //   requestNonPersonalizedAdsOnly: true
  // });

  


  useEffect(() => {
    console.log(nooflives);
    if(nooflives>0){

    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();
      console.log(rewardedInterstitialLoaded)
    return () => {  
  
      unsubscribeRewardedInterstitialEvents();
    };
  }
  }, [])

  return (
    <Modal animationType="fade" transparent={true}> 
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>Game over</Text>
          {timeup && <Text style={styles.message}>Time Up</Text>}
          <Text style={styles.messageans}>Answer: {answer}</Text>
          

          {highScore!=false && <HighScore currentScore={currentScore}/>}
          {/* {console.log(nooflives,"nooflives",rewardedInterstitialLoaded)} */}
         {nooflives>0 && rewardedInterstitialLoaded   &&<><View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={ ()=>{rewardedInterstitial.show()}}>
              <Text style={styles.buttonText}>Watch Add to Continue</Text>
            </TouchableOpacity>
            
            </View>
            <Text>{nooflives} chance left</Text></> }
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onTryAgain}>
              <Text style={styles.buttonText}>Try again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onGoHome}>
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"red"
  },
  messageans: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"green"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 10
  },
  button: {
    backgroundColor: '#0099ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverModal;