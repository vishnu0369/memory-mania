import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const WordChooserBox = ({ words, onWordSelect ,turn,own}) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [customWord, setCustomWord] = useState('');

  const handleWordSelect = (word) => {
    //console.log(word)
    setSelectedWord(word);
    onWordSelect(word);
  };

  const handleCustomWordSelect = () => {
    if (customWord) {
      setSelectedWord(customWord);
      onWordSelect(customWord);
    }
  };

  return (
    <View style={styles.container}>
       
      
      <Text style={styles.title}>Choose your {turn} word:</Text>
      <View style={styles.buttonsContainer}>
        {words.map((word) => (
          <TouchableOpacity
            key={word}
            style={[
              styles.wordButton,
              selectedWord === word && styles.selectedWordButton,
            ]}
            onPress={() => handleWordSelect(word)}
          >
            <Text style={[
              styles.wordButtonText,
              selectedWord === word && styles.selectedWordButtonText,
            ]}>{word}</Text>
          </TouchableOpacity>
        ))}

        {own && <View style={styles.customWordContainer}>
          <TextInput
            style={styles.customWordInput}
            placeholder="Enter your own word"
            value={customWord}
            onChangeText={setCustomWord}
          />
          <TouchableOpacity
            style={styles.customWordButton}
            onPress={handleCustomWordSelect}
          >
            <Text style={styles.customWordButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>}


      </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#54cc6e',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height:340
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"green"
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordButton: {
    width: '48%',
    height: 60,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWordButton: {
    backgroundColor: '#3f51b5',
  },
  wordButtonText: {
    fontSize: 18,
    color: '#333',
  },
  selectedWordButtonText: {
    color: '#fff',
  },
  customWordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  customWordInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  customWordButton: {
    height: 40,
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customWordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});

export default WordChooserBox;
