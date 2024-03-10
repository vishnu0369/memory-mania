import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
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
import AllPlayersScores from '../GameComponents/AllPlayersScores';
import MultiPlayerGameDone from './MultiPlayerGameDone';
import MultiPlayerOneLost from './MultiPlayerOneLost';
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
export default function MultiPlayerGame() {

  const [nooflives, setnooflives] = useState(0);
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
const [score, setscore] = useState([])
const [took, settook] = useState([])
const [playeresnthtook,setplayeresnthtook] = useState([])
const [whichplayertook,setwhichplayertook]=useState([])
const [showChoosed, setshowChoosed] = useState(false) 
const [prevShowing, setprevShowing] = useState(false)
  const [presentSelectedWord, setpresentSelectedWord] = useState("");
  const [HowManyAddedPlayerWise, setHowManyAddedPlayerWise] = useState([]);

  const [prevCount, setprevCount] = useState(1)
  const [GameOver, setGameOver] = useState(false)
  const [presPlayerIndex, setpresPlayerIndex] = useState(0);

  const [playerIndexList, setplayerIndexList] = useState([]);
    const incrementplaayerIndex=()=>{

      if(presPlayerIndex==playerIndexList.length-1){
        setpresPlayerIndex(0);
      }else{
        setpresPlayerIndex(presPlayerIndex+1);
      }
    }
  const { players, theme, noofplayers} = route.params;
    const [data,setData]= useState([]);
    const [oneLost, setoneLost] = useState(false);



   const hisIsHighest = (fakeind,inc) =>{
    let ind=playerIndexList[fakeind];
    for (let i in score){
      if(i!=ind && ( (inc &&  score[ind]<score[i]) || (!inc && score[ind]<=score[i]) )){
        return false;
      }
    }
    return true;
   }
    


    const handleSelectedWord = (word) => {

      let twhichadd=HowManyAddedPlayerWise;
      twhichadd[playerIndexList[presPlayerIndex]]+=1
      setHowManyAddedPlayerWise(twhichadd)
      setplayeresnthtook([...playeresnthtook,HowManyAddedPlayerWise[ playerIndexList[presPlayerIndex]]]);
      
      setpresentSelectedWord(word)
      settook([...took,word])
      setwhichplayertook([...whichplayertook,playerIndexList[presPlayerIndex]])
      incrementplaayerIndex()
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
        if(word!=took[prevCount-1] && playerIndexList.length==1 ){
          
          temp=playerIndexList
      temp.splice(presPlayerIndex,1);
      setplayerIndexList(temp);

          setGameOver(true)
        }else if( playerIndexList.length==1 && hisIsHighest(0,true)){
          let tscore=score;
          tscore[playerIndexList[ presPlayerIndex]]+=1
          setscore(tscore);
          setGameOver(true)
        }
        else if(word!=took[prevCount-1] && playerIndexList.length==2 && (hisIsHighest((presPlayerIndex+1)%2,false))){

          setGameOver(true)
          //console.log("wrong")
        }
       else if(word!=took[prevCount-1]){
          console.log("Ï am comming here")
          setoneLost(true);

        }else{

          //console.log(presPlayerIndex,"presPlayerIndex")
          let tscore=score;
          tscore[playerIndexList[ presPlayerIndex]]+=1
          //console.log("score",tscore)
          setscore(tscore);
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
      settimeup(false)
      setscore(0);
      setGameOver(false)
      setprevCount(1)
      setpresentSelectedWord("")
      setprevShowing(false)
      setshowChoosed(false)
      settook([])
      setnoTurn(1)
      let temps=[];
      let temppi=[]
      //console.log("no of players",noofplayers)
      for(let i=0;i<noofplayers;i++){
        temps.push(0);
        temppi.push(i)
      }
      setscore([...temps]);
      setHowManyAddedPlayerWise([...temps]);
      setplayerIndexList(temppi);
      setplayeresnthtook([])
      setwhichplayertook([])
      setpresPlayerIndex(0);
      setoneLost(false);
      setGameOver(false);



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

    const handleContinueWithOthersMain =()=>{
      temp=playerIndexList
      settimeup(false)
      temp.splice(presPlayerIndex,1);
      setplayerIndexList(temp);

      if(presPlayerIndex==temp.length){
        setpresPlayerIndex(0);
      }
      // incrementplaayerIndex();
      // setprevShowing(false);


      if(took.length!=0){
      setprevCount(1);
      let lar=0;
          let tempData=[]
          
              x=took[0];
            

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

           
      } 
      setoneLost(false);


    }


   
    useEffect(() => {

      let temps=[];
      let temppi=[]
      //console.log("no of players",noofplayers)
      for(let i=0;i<noofplayers;i++){
        temps.push(0);
        temppi.push(i)
      }
      setscore([...temps]);
      setHowManyAddedPlayerWise([...temps]);
      setplayerIndexList(temppi);

      // //console.log("scores in useState",)

      //console.log("IN useEffect")
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
      style={{"height":"100%"}}
        resizeMode="stretch"
        >
    <View>
   <GoodWords text={"Memory Mania"}/>
   <BackButtonModal goBackName={"home"} />
     {playerIndexList.length!=0 && <ScoreCard  score={score[playerIndexList[presPlayerIndex]]} text={players[playerIndexList[presPlayerIndex]]+" Turn"} target={null}/>}
      
      {!prevShowing && !showChoosed && <WordChooserBox own={true} words={data} onWordSelect={handleSelectedWord} turn={stringifyNumber(HowManyAddedPlayerWise[playerIndexList[presPlayerIndex]]+1)}/>}
      {!prevShowing && showChoosed && <YouChoosed title={" CHOOSED"} name={presentSelectedWord} />}
      {!GameOver && prevShowing && <WhichWordBox timeup={timeup} gameover={oneLost} settimeup={settimeup}  n={noTurn-1} k={prevCount} playerName={players[whichplayertook[prevCount-1]]} words={data} onWordSelect={handleSelectedPrev} turn={"their "+stringifyNumber(playeresnthtook[prevCount-1])}/>}
      {(GameOver || (timeup && playerIndexList.length==1)|| (timeup && playerIndexList.length==2 && (hisIsHighest((presPlayerIndex+1)%2,false)))) && <MultiPlayerGameDone scores={[...score]} players={players} playerIndexList={playerIndexList} onTryAgain={handleTryAgain} onGoHome={()=>{   navigation.navigate('home');}}/>}
      <View className="flex-row h-40">
      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{justifyContent:'center',alignItems:"center",flex:0}} horizontal={false} >
      <View className="w-full">
      {score.length!=0 && <AllPlayersScores scores={[...score]} players={players} playerIndexList={playerIndexList}/>}
      {(timeup || oneLost) && playerIndexList.length!=1 && !( playerIndexList.length==2 && (hisIsHighest((presPlayerIndex+1)%2,false))) && <MultiPlayerOneLost  timeup={timeup}  answer={took[prevCount-1]} name={players[playerIndexList[presPlayerIndex]]} revive={()=>{setoneLost(false),settimeup(false)}} continueWithOthers={handleContinueWithOthersMain}/>}
      </View>
      </ScrollView>
      </View>
    </View>
    <View style={styles.container}>
      <BannerAd 
        unitId={"ca-app-pub-3131514056752591/5856957569"}
        // unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
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
  },
})