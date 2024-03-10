import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Components/HomeScreen";
import SinglePlayerHome from "./Components/SinglePlayerr/SinglePlayerHome";
import SinglePlayerGame from "./Components/SinglePlayerr/SinglePlayerGame";
import Levels from "./Components/Levels/Levels";
import LevelPlayGame from "./Components/Levels/LevelPlayGame";
import MultiPlayerHome from "./Components/MultiPlayer/MultiPlayerHome";
import MultiPlayerGame from "./Components/MultiPlayer/MultiPlayerGame";
import HowToPlay from "./Components/HowToPlay";
import MultiplayerThemes from "./Components/MultiPlayer/MultiplayerThemes";
import LevelsTheme from "./Components/Levels/LevelsTheme";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
       <Stack.Screen name="singlePlayerHome" component={SinglePlayerHome}></Stack.Screen>
       <Stack.Screen name="singlePlayerGame" component={SinglePlayerGame}></Stack.Screen>

       <Stack.Screen name="levels" component={Levels}></Stack.Screen>
       <Stack.Screen name="levelstheme" component={LevelsTheme}></Stack.Screen>
       <Stack.Screen name="levelplaygame" component={LevelPlayGame}></Stack.Screen>


       <Stack.Screen name="multiplayerhome" component={MultiPlayerHome}></Stack.Screen>
       <Stack.Screen name="multiplayertheme" component={MultiplayerThemes}></Stack.Screen>
       <Stack.Screen name="multiplayergame" component={MultiPlayerGame}></Stack.Screen>

       <Stack.Screen name="howtoplay" component={HowToPlay}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}
