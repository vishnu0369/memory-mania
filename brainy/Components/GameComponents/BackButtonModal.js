import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity ,BackHandler, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

const BackButtonModal = ({goBackName}) => {
  const [showModal, setShowModal] = useState(false);
  const navigation= useNavigation();
  useFocusEffect(() => {
    const onBackPress = () => {
      setShowModal(true);
      return true;
    };

    // Add hardware back button listener
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Remove hardware back button listener on unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  const handleGoBack = () => {
    setShowModal(false);
    navigation.navigate(goBackName);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Modal visible={showModal} transparent={true} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={styles.modal}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Are you sure you want to go back?
          </Text>
          <View  style={{ flexDirection:"row", justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleGoBack} style={[styles.button,styles.homeButton]}>
            <Text style={styles.buttonText}>Yes, go back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.nextButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {

    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    borderColor:"blue",
    borderWidth:2,
    justifyContent:"center"
  },
  button: {
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 15,
  marginHorizontal: 10,
},
nextButton: {
  backgroundColor: '#5BC236',
},
homeButton: {
  backgroundColor: '#FF4141',
},
buttonText: {
  fontSize: 18,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
});


export default BackButtonModal;

