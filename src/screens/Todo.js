import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, FlatList, View, Alert, Touchable } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
import { setTask, setTaskID } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'

export default function Todo({ navigation }) {

    const { tasks, taskID } = useSelector(state => state.taskReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = () => {
        AsyncStorage.getItem('Tasks')
            .then(task => {
                const parsedTask = JSON.parse(task)
                if (parsedTask && typeof parsedTask === 'object') {
                    dispatch(setTask(parsedTask))
                }
            })
            .catch(err => { console.log(err) })
    }

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.ID !== id)
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTask(filteredTasks))
                Alert.alert('Success!', 'Deleted Successfully')
            })
            .catch(err => console.log(err))
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.ID === id)
        var newTasks = []
        if (index >= 0) {
            newTasks = [...tasks]
            newTasks[index].Done = newValue
            AsyncStorage.setItem('Items', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTask(newTasks))
                    Alert.alert('Success!', 'Task State Chnage Done')
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <SafeAreaView style={styles.body}>

            <FlatList
                data={tasks.filter(task => task.Done === false)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.list}
                        onPress={() => {
                            console.log('itemID', item)
                            dispatch(setTaskID(item.ID))
                            navigation.navigate('Task')
                        }}
                    >
                        <View style={styles.item}>
                            <View
                                style={[{ backgroundColor: item.Color }
                                    , styles.color]}
                            ></View>
                            <TouchableOpacity style={styles.check}>
                                <CheckBox
                                    value={item.Done}
                                    onValueChange={(newValue) => { checkTask(item.ID, newValue) }}
                                />
                            </TouchableOpacity>
                            <View style={styles.item_body}>
                                <Text
                                    style={styles.title}
                                    numberOfLines={1}
                                >
                                    {item.Title}
                                </Text>
                                <Text
                                    style={styles.subTitle}
                                    numberOfLines={1}
                                >
                                    {item.Desc}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { deleteTask(item.ID) }}
                            >
                                <FontAwesome
                                    name='trash'
                                    size={25}
                                    color={'red'}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    dispatch(setTaskID(tasks.length + 1))
                    navigation.navigate('Task')
                }}
            >
                <FontAwesome
                    name={'plus'}
                    size={20}
                    color={'#ffffff'}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    button: {
        justifyContent: 'flex-end',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 10,
    },
    color: {
        width: 20,
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    check: {
        marginHorizontal: 5,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        marginHorizontal: 10,
        marginVertical: 7,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 10,
        justifyContent: 'center',
        paddingRight: 10
    },
    title: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
        fontWeight: 'bold'
    },
    subTitle: {
        color: '#999999',
        margin: 5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_body: {
        flex: 1,
    },
})