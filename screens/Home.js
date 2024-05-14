import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Alert, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Appbar, TextInput, Button, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController, logout } from '../store/index'; 
import Jobs from '../component/Jobs';

const Home = () => {
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [ controller, dispatch ] = useMyContextController(); 
    const { userLogin } = controller || {};
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const ref = firestore().collection('jobs');

    async function addJob() {
        if (job.trim()) {
            await ref.add({ title: job }).catch(error => Alert.alert('Error', error.message));
            setJob('');
        } else {
            Alert.alert('Validation', 'Job title cannot be empty');
        }
    }

    useEffect(() => {
        const unsubscribe = ref.onSnapshot(
            querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const { title } = doc.data();
                    list.push({ id: doc.id, title });
                });
                setJobs(list);
                setLoading(false);
            },
            error => {
                Alert.alert('Error', error.message);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title={`Welcome, ${userLogin ? userLogin.fullname : 'Guest'}`} />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="cog" onPress={openMenu} />}
                >
                    <Menu.Item
                        onPress={() => {
                            navigation.navigate('Home');
                            closeMenu();
                        }}
                        title="Home"
                    />
                    <Menu.Item
                        onPress={() => {
                            logout(dispatch, navigation);
                            closeMenu();
                        }}
                        title="Logout"
                    />
                </Menu>
            </Appbar.Header>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Add new job"
                    value={job}
                    onChangeText={setJob}
                    style={styles.textInput}
                />
                <Button
                    onPress={addJob}
                    mode="contained"
                    style={styles.addButton}
                >
                    Add
                </Button>
            </View>
            <FlatList
                data={jobs}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Jobs {...item} />}
                contentContainerStyle={jobs.length === 0 ? styles.emptyList : null}
                ListEmptyComponent={() => (
                    <View style={styles.emptyListContainer}>
                        <Text>No jobs available. Add a job to get started!</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    textInput: {
        flex: 1,
        marginRight: 8,
    },
    addButton: {
        borderRadius: 5,
        height: 55,
        justifyContent: 'center',
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
