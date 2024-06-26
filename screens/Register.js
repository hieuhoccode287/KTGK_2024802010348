import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { createAccount, register } from '../store';

const Register = ({ navigation }) => {
    const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });

    const updateInputval = (val, key) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: val
        }));
    };

    const registerSubmit = async () => {
        createAccount(values.email,values.password,values.fullname,navigation); 
        
        
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Register Here</Text>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.form}>
                    <TextInput
                            placeholder='Full Name'
                            value={values.fullname}
                            onChangeText={val => updateInputval(val, 'fullname')}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Email'
                            value={values.email}
                            onChangeText={val => updateInputval(val, 'email')}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Password'
                            value={values.password}
                            onChangeText={val => updateInputval(val, 'password')}
                            secureTextEntry
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Confirm Password'
                            value={values.confirmPassword}
                            onChangeText={val => updateInputval(val, 'confirmPassword')}
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={registerSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
                        <Text style={styles.linkText}>Already have an account? Sign in</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
    },
    title: {
        fontSize: 30,
        color: '#f6880e',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    link: {
        marginBottom: 10,
    },
    linkText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 16,
    },
});

export default Register;
