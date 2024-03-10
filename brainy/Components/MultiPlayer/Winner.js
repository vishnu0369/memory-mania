import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Winner = ({ scores, players }) => {
  const [winnerName, setWinnerName] = useState('');

  useEffect(() => {
    let maxScore = Math.max(...scores);
    let maxScoreCount = scores.filter(score => score === maxScore).length;
    
    if (maxScoreCount === 1) {
      let winnerIndex = scores.indexOf(maxScore);
      setWinnerName(players[winnerIndex]);
    } else {
      let winners = scores.reduce((acc, score, index) => {
        if (score === maxScore) {
          acc.push(players[index]);
        }
        return acc;
      }, []);
      setWinnerName(`Draw between ${winners.join(' and ')}`);
    }
  }, [scores, players]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {winnerName ? `Hurray the winner is ${winnerName}` : 'Calculating winner...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"green",
    marginVertical:5
  },
});

export default Winner;
