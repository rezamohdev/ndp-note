import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RoundIconBtn from '../components/RoundIconBtn';

const Intro = ({onFinish}) => {
    const [name, setName]= useState('')
    const handleOnChangeText = (text) => setName(text);
    // console.log(user);

    const handleSubmit = async () => {
        const user = {name: name}
       await AsyncStorage.setItem('user', JSON.stringify(user));

        if(onFinish) onFinish();
    }

    return (
        <>
        <StatusBar />
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Please enter your name</Text>
            <TextInput 
            value={name} 
            onChangeText={handleOnChangeText}
             placeholder='Enter name here ' 
             style={styles.TextInput}
             />
      {name.trim().length > 3 ? (<RoundIconBtn antIconName='arrowright' onPress={handleSubmit}/>
      ) : null}
        </View>
        </>
    )
}
const width= Dimensions.get('window').width - 80;
// console.log(width) 
 const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:220
    },
    TextInput: {
        borderColor: Colors.PRIMARY,
        Color: Colors.PRIMARY,
        borderWidth: 1,
        width,
        height:40,
        marginTop: 20,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 20,
        

    },
    inputTitle: {
        color: 'grey',
        fontSize: 17
    }
 })

 export default Intro;