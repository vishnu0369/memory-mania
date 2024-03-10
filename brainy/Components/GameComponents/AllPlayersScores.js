import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllPlayersScores = ({ scores, players, playerIndexList }) => {
  // Sort the scores in descending order

  // Get the top 3 scores

 


  const [tli, settli] = useState([]);

  const everytimedo=()=>{
    let a=[];
    for(let i=0;i<scores.length;i++){
      a.push([scores[i],i]);
    }
    a.sort((a,b)=>{return b[0]-a[0]});
    
    //console.log(a.slice(0,3),"final scores")
    settli([...a]);
  }
  

useEffect(() => {
  everytimedo();
  //console.log("useEffect 1")
}, [scores]);


  
  //console.log("score here all ",scores)
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scores</Text>
      <View style={styles.scoresContainer}>
        {tli.length!=0 && tli.map((playe) => (
          <View
            key={playe[1]}
            style={[
              styles.scoreItem,
              playerIndexList.includes(playe[1]) ? styles.green : styles.red,
            ]}
          >
            <Text style={styles.score}>{playe[0]}</Text>
            <Text style={styles.playerName}>{players[playe[1]]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    // flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  scoresContainer: {
    flexDirection: 'column',
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 16,
  },
  green: {
    backgroundColor: '#6CD662',
  },
  red: {
    backgroundColor: '#FF6961',
  },
});

export default AllPlayersScores;
