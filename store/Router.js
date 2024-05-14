import 'react-native-gesture-handler';  
import React from "react"   
import { useMyContextController } from "../store"  
import { createStackNavigator } from '@react-navigation/stack';   
import Register from './../screens/Register';
import Home from './../screens/Home';
import Login from './../screens/Login';


const Stack = createStackNavigator();  


export default Router = () =>{  
    const [controller, dispatch] = useMyContextController();  
    const {userLogin} = controller;  
    console.log(userLogin)  
    return (  
        <Stack.Navigator initialRouteName='Login'  
            screenOptions={{  
                headerTitleAlign: 'center'  
            }}  
        >  
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>   
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Register"component={Register} />
        </Stack.Navigator>  
    )  
}