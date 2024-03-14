import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundIconBtn = ({antIconName, size, color, style, onPress}) => {
    return (
      
        <AntDesign 
        name={antIconName}
         size={size || 25}
         color={color || 'white'}
         style={[styles.icon, {...style}]}
         onPress={onPress}
         />
  )
};   

const styles = StyleSheet.create({
      container:{},
      icon: {
        backgroundColor: '#1e90ff',
        padding:15,
        borderRadius: 50,
        marginTop: 20,
        elevation: 5,
        // shadowOffset
      }
});

export default RoundIconBtn;