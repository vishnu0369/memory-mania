import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

export default function YouChoosed({name,title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>{title}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    height:340,
    justifyContent:"center"
  },
  head:{
    fontSize: 20,
    fontWeight:'600'
  },
  name:{
    fontSize: 40,
    fontWeight:'900'
  }
})