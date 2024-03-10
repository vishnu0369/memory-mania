import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const HowToPlay = () => {
  return (
    <>
    <SafeAreaView>
    <StatusBar style="auto" backgroundColor='#3f51b5' />
    </SafeAreaView>

<View style={styles.container}>
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:"center",flex:0}} horizontal={false} >
 
      <Text style={styles.title}>How to Play Memory Mania</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tutorial</Text>
        <Text style={styles.sectionText}>First time You should say a word, ex : apple</Text>
        <Text style={styles.sectionText}>Second time You should say first word and add another word, ex : apple-grapes</Text>
        <Text style={styles.sectionText}>Third time You should say first two words and add another word, ex : apple-grapes-YouGotIt</Text>

      </View>
      <Text style={styles.title}>Other Features</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Play Levels</Text>
        <Text style={styles.sectionText}>In Play Levels mode, you will be assigned a target score for each level. Once you reach the target score, you can advance to the next level. Each level will be more challenging than the last, with longer word sequences and less time to remember them.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Single Player Infinity Mode</Text>
        <Text style={styles.sectionText}>In Single Player Infinity mode, there is no target score. You can keep playing as long as you like, trying to beat your previous high score and improve your memory power.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiplayer</Text>
        <Text style={styles.sectionText}>In Multiplayer mode, you can play against your friends offline. You can challenge them to remember longer and more complex word sequences, and see who has the best memory power.</Text>
      </View>
      
      <Text style={styles.footer}>Start playing and train your brain to have a better memory!</Text>
      <TouchableOpacity className="bg-green-500 rounded-lg py-3 px-6" onPress={() =>Linking.openURL('mailto:vigneshreddyjulakanti@gmail.com?subject=Regarding Memory Mania')}>
          <Text className="text-lg font-semibold text-white ">Click Me to Contact Us</Text>
        </TouchableOpacity>
      <Text style={styles.footer}>Contact : vigneshreddyjulakanti@gmail.com</Text>


      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:10
    },
});

export default HowToPlay;
