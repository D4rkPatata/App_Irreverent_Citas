import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Calendario from './screens/Calendario';
import Citas from './screens/Citas';
import FormCitas from './screens/FormCitas';
import DetalleCita from './screens/DetalleCita';
import { createTables, funcion, readCitas, readCitasDia, readCitasOrder } from './Database';


const Tab = createBottomTabNavigator();
const CitasStack = createNativeStackNavigator();
function CitasStackScreen() {
  return (
    <CitasStack.Navigator>
      <CitasStack.Screen name="Citas" component={Citas} />
      <CitasStack.Screen name="FormCita" component={FormCitas} />
      <CitasStack.Screen name="DetalleCita" component={DetalleCita} />
    </CitasStack.Navigator>
  );
}

function CitasScreen(){
  return(
    <MyStack/>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator  >
      <Tab.Screen
        name="CitasStack"
        component={CitasStackScreen}
        options={{ headerShown: false }}
        
      />
      <Tab.Screen
        name="Calendario"
        component={Calendario}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  createTables();
  
  
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
