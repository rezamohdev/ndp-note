import React from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';

const Note = ({item, onPress}) => {
    const {title, desc} = item;
    return (

        

        <TouchableOpacity onPress={onPress} style={styles.container} >
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text  style={styles.desc} numberOfLines={5}>{desc}</Text>
        </TouchableOpacity>
  )
};   

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
      container:{
        backgroundColor: '#F6D09E',
        // borderEndColor: 'black',
        // borderColor: '#888',
        // borderWidth: 0.5,
        color: '#fff',
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 5,
        marginTop: 20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.25,
shadowRadius: 0.84,

elevation: 1,

      },
      title: {
        fontSize: 20
      },
      desc: {
        fontSize: 14,
        color: 'grey',
        lineHeight: 22
      }
});

export default Note;