import React from 'react';
import {ScrollView, View, StyleSheet, Text,Alert} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import Note from '../components/Note';
import RoundIconBtn from '../components/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import { useState } from 'react';
import NoteInputModal from './NoteInputModal';
   const formDate = ms => {
      const date = new Date(ms);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      var hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      var ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12;// the hour zero shoud be 12 

      return `${month}/${day}/${year} - ${hour}:${min}:${sec} ${ampm}`
  }
const NoteDetail = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const {setNotes} = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);



const deleteNote = async () => {
  const result = await AsyncStorage.getItem('notes');
  let notes = [];
  if(result !==  null ) notes = JSON.parse(result);

const newNotes = notes.filter(n => n.id !== note.id)
setNotes(newNotes)
await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
props.navigation.goBack()
} 


const noteRemoveAlert = () => {
  Alert.alert(
    'Remove the note?',
    'your note will be deleted permanently!',
    [
    {
      text:'Delete',
      onPress: deleteNote
    },
    {
      text: 'Cancel',
      onPress: () => {console.log('Cancel');}
    }
  ], 
  {
    cancelable: true,
  })
}
 
  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if(result !==  null) {
     notes = JSON.parse(result);
    }

    const newNotes = notes.filter(n => {
      if(n.id === note.id) {
        n.title = title
        n.desc = desc
        n.time = time
        n.isUpdated = true

        setNote(n);
      }
       return n;
    });

    setNotes(newNotes);

    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
  }
  const handleOnClose= () => setShowModal(false);

  const openEditModal = () => 
  {
    setIsEdit(true);
    setShowModal(true);
  }
    


    return (

      <>
        <ScrollView
        contentContainerStyle={[styles.container, {paddingTop: 1}]} >
        
          <Text style={styles.time}>{note.isUpdated ? `Edited at ${formDate(note.time)} ` : `created at ${formDate(note.time)} `}</Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text  style={styles.desc}>{note.desc}</Text>


            
        </ScrollView>
        <View style={styles.btnContainer}>
              <RoundIconBtn antIconName='delete' style={{backgroundColor:'#F04343'}} onPress={ noteRemoveAlert} />
              <RoundIconBtn antIconName='edit' style={{backgroundColor:'#4394F0'}} onPress={ openEditModal } />
            </View>
            <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
          </>
  );
};   

const styles = StyleSheet.create({
      container:{
        // flex: 0,
        paddingHorizontal: 15
      },
      title: {
        color:'grey',
        fontSize: 30,
        borderBottomWidth: 1,
        borderBottomColor:'grey',
        paddingBottom: 10
      },
      desc: {
        marginTop:30,
        fontSize: 20
      },
      time: {
        textAlign:'right'
      },
      btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,

      }
});

export default NoteDetail;