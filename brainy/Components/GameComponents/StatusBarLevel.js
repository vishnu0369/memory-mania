import React from 'react';
import { View, StyleSheet } from 'react-native';

const StatusBarLevel = ({ n, k }) => {
  //console.log(n,k)
  const filledParts = Math.min(n || 0, k || 0);
  const unfilledParts = Math.max(0, n - filledParts);

  return (
    <View style={styles.container}>
      <View style={[styles.filled, { flex: filledParts }]} />
      <View style={[styles.unfilled, { flex: unfilledParts }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e6e6e6',
  },
  filled: {
    height: '100%',
    backgroundColor: '#1abc9c',
  },
  unfilled: {
    height: '100%',
    backgroundColor: '#e6e6e6',
  },
});

export default StatusBarLevel;
