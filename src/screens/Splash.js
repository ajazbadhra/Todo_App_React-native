import React,{useEffect} from 'react'
import { StyleSheet, Text, SafeAreaView, Image,s} from 'react-native'


export default function Splash({navigation}) {
    useEffect(() => {
        setTimeout(()=>{
            navigation.replace('mytask')
        },2000)
    }, [])
    return (
        <SafeAreaView style = {styles.container}>
            <Image 
                style = {styles.image}
                source={
                    require('../../assets/todo.png')
                }
            />
            <Text style = {styles.text}>To Do List</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : 'rgb(1,115,191)',
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        fontSize : 40,
        fontWeight : 'bold',
        color : 'white'
    },
    image : {
        height : 200,
        width : 200,
        marginBottom : 30
    }
})
