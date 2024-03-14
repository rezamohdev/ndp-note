import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const SearchBar = ({containerStyle, value,onClear, onChangeText}) => {
    return (
        <View style={styles.container} >
            <TextInput value={value} onChangeText={onChangeText} placeholder='Search notes' style={styles.searchBar}
            /> 
            {value ? <AntDesign name='close' size={20   } color="#000" onPress={onClear} style={styles.clearIcon} /> :null}
        </View>
  )
};   

const styles = StyleSheet.create({
    searchBar:{
        borderWidth: 0.5,
        borderColor: 'black',
        // width: '80%',
        borderRadius: 40,
        height: 40,
        fontSize: 20,
        paddingLeft: 20

    },
    container:{
        justifyContent: 'center'
    },
    clearIcon: {
        position: 'absolute',
        right: 10,
    }
});

export default SearchBar;