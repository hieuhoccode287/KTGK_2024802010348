
import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform} from 'react-native';
import React, { useState, useEffect } from "react";
import { Text, TextInput } from "react-native-paper";
import { useMyContextController, login } from "../store";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const hasErrorEmail = () => !email.includes("@");
    useEffect(() => {
      if (userLogin) {
        navigation.navigate("Home");
      }
    }, [userLogin]);
    
  
    const loginSubmit = () => {
      login(dispatch, email, password);
      
    };

    return (
        <SafeAreaView>
            <View style={{ padding: 20 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        resizeMode='contain'
                        source={require('../assets/firebase.png')}
                        style={{ width: '100%', height: 200, display: focused ? 'none' : 'flex' }}
                    />
                    <Text style={{ fontSize: 30, color: '#f6880e', fontWeight: 'bold', marginTop: 10 }}>Login Here</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <TouchableWithoutFeedback onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                        <View style={{ justifyContent: 'space-around', marginTop: 20 }}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            mode="outlined"
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            mode="outlined"
                        />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={loginSubmit} style={{ marginTop: 20 }}>
                        <Text style={{ padding: 15, textAlign: 'center', color: 'white', backgroundColor: 'orange', borderRadius: 10 }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
                        <Text style={{ padding: 15, textAlign: 'center', color: '#000', borderRadius: 10 }}>Create new account!</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default Login;