import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal,} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setTask, setTaskID } from '../redux/actions'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function task({ navigation }) {

    useEffect(() => {
        getTask()
    }, [])

    const { tasks, taskID } = useSelector(state => state.taskReducer)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [done, setDone] = useState(false)
    const [color, setColor] = useState('white')
    const [showBellModal, setShowBellModal] = useState(false)
    const [bellTime,setBellTime] = useState('1')

    const getTask = () => {
        const Task = tasks.find(task => task.ID === taskID)
        if (Task) {
            setTitle(Task.Title)
            setDesc(Task.Desc)
            setDone(Task.Done)
        }
    }

    const saveTask = () => {
        if (title.length == 0) {
            Alert.alert('Warning!', 'Enter Title')
        }
        else {
            try {
                var Task = {
                    ID: taskID,
                    Title: title,
                    Desc: desc,
                    Done: done,
                    Color: color,
                }
                const index = tasks.findIndex(task => task.ID === taskID)
                let newTask = []
                if (index > -1) {
                    newTask = [...tasks]
                    newTask[index] = Task
                }
                else {
                    newTask = [...tasks, Task]
                }
                AsyncStorage.setItem('Tasks', JSON.stringify(newTask))
                    .then(() => {
                        dispatch(setTask(newTask))
                        Alert.alert('Success', 'Task Saved Successfully')
                        navigation.goBack()
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                console.log(error)
            }
        }
    }

    // const setTaskAlarm = () => {
    //     PushNotificationIOS.localNotificationSchedule({

    //     })
    // }
    return (
        <View style={styles.body}>
{/* 
            <Modal
                visible = {showBellModal}
                transparent
                onRequestClose={()=>{setShowBellModal(false)}}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.center_view}>
                    <View style={styles.bell_model}>
                        <View style={styles.bell_body}>
                            <Text style={styles.bell_text}>Remind Me After</Text>
                            <TextInput 
                                keyboardType='numeric'
                                value={bellTime}
                                style = {styles.time_input}
                                onChangeText={(value) => setBellTime(value)}
                            />
                            <Text style={styles.bell_text}>Minutes</Text>
                        </View>
                        <View style={styles.bell_buttons}>
                            <TouchableOpacity style={styles.bell_cancel}
                                onPress={()=>{
                                    setShowBellModal(false)
                                }}
                            >
                                <Text style={styles.bell_text}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bell_ok}
                                onPress={()=>{
                                    
                                    setShowBellModal(false)
                                }}
                            >
                                <Text style={styles.bell_text}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}

            <TextInput
                value={title}
                style={styles.input}
                placeholder='Enter Title'
                onChangeText={(value) => setTitle(value)}
            />
            <TextInput
                value={desc}
                style={styles.input}
                placeholder='Enter Discription'
                multiline
                onChangeText={(value) => setDesc(value)}
            />

            <View style={styles.color_bar}>
                <TouchableOpacity
                    style={styles.color_white}
                    onPress={() => { setColor('#ffffff') }}
                >
                    {color === '#ffffff' &&
                        <FontAwesome
                            name='check'
                            size={20}
                            color={'black'}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.color_red}
                    onPress={() => { setColor('#f28b82') }}
                >
                    {color === '#f28b82' &&
                        <FontAwesome
                            name='check'
                            size={20}
                            color={'black'}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.color_blue}
                    onPress={() => { setColor('#aecbfa') }}
                >
                    {color === '#aecbfa' &&
                        <FontAwesome
                            name='check'
                            size={20}
                            color={'black'}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.color_green}
                    onPress={() => { setColor('#ccff90') }}
                >
                    {color === '#ccff90' &&
                        <FontAwesome
                            name='check'
                            size={20}
                            color={'black'}
                        />
                    }
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.reminder_button}
                onPress={()=> {setShowBellModal(true)}}
            >
                <FontAwesome
                    name='bell'
                    size={25}
                    color={'white'}
                />
            </TouchableOpacity> */}
            <View style={styles.check}>
                <CheckBox
                    value={done}
                    onValueChange={(newValue) => { setDone(newValue) }}
                />
                <Text style={styles.check_text}>Is Done</Text>
            </View>
            <TouchableOpacity style={styles.button}
                onPress={saveTask}
            >
                <Text style={styles.text}>Save Task</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        margin: 10,
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#1eb900',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    bell_model :{
        height : 200,
        width : 300,
        backgroundColor : '#ffffff',
        borderRadius : 20,
        borderWidth : 1,
        borderColor : '#000000'
    } ,
    bell_body :{
        height : 150,
        alignItems : 'center',
        justifyContent : 'center'
    },
    bell_buttons :{
        flexDirection : 'row',
        height : 50
    },
    bell_text : {
        fontSize : 20,
    },
    bell_cancel:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderBottomLeftRadius : 20,
    },
    bell_ok:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderBottomRightRadius : 20,
    },
    center_view : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#00000099'

    },
    reminder_button: {
        height: 50,
        backgroundColor: 'blue',
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    check: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    check_text: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    color_bar: {
        height: 50,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 1,
        marginTop: 30,
    },
    color_red: {
        flex: 1,
        backgroundColor: '#f28b82',
        alignItems: 'center',
        justifyContent: 'center'
    },
    color_white: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    color_blue: {
        flex: 1,
        backgroundColor: '#aecbfa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    color_green: {
        flex: 1,
        backgroundColor: '#ccff90',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    time_input : {
        borderColor : '#555555',
        borderWidth : 1,
        height : 40,
        width : 50,
        backgroundColor :'#ffffff',
        fontSize : 20,
        borderRadius : 10,
        textAlign : 'center'
    }
})
