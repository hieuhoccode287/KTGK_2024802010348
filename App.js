
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MyContextControllerProvider } from './store';
import Router from './store/Router';


const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </MyContextControllerProvider>
  </PaperProvider>
  );
};

export default App