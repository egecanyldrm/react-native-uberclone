import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Map from './src/screens/Map';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

