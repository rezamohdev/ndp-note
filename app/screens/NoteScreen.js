import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, StatusBar, FlatList, TouchableWithoutFeedback} from 'react-native';
import SearchBar from '../components/SearchBar';
import RoundIconBtnn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';

const reversData=  data => {
  return data.sort((a,b) => {
    const aInt = parseInt(a.time);   
    const bInt = parseInt(b.time);
    if(aInt < bInt) return 1;
    if(aInt == bInt) return 0;
    if(aInt > bInt) return -1;
  });
}

const NoteScreen = ({user, navigation}) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [resultNotFound, setResultNoteFound] = useState(false);
    const {notes, setNotes, findNotes} = useNotes();

    const findGreet = () => {
      const hrs = new Date().getHours();
      // console.log(hrs);
      if(hrs === 0 || hrs  < 12 ) return setGreet('Morning');
     else if(hrs === 1 || hrs < 17 ) return setGreet('afternoon');  
     else setGreet('evening');
    };


    useEffect(() => {
      // AsyncStorage.clear();
      // findNotes();
      findGreet();
    }, []);

    const reversNotes = reversData(notes);

    const handleOnSubmit = async(title, desc) => {
      
      // console.log(title, desc); log the notes
      // const time = new Date().getTime();
      const note = {id: Date.now(), title, desc, time: Date.now() };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      // console.log(note);
    };

    const openNote = note => {
      navigation.navigate('NoteDetail', {note});
    };

    const handleOnSearchInput = async (text) => {
      setSearchQuery(text);
      if(!text.trim()) {
        setSearchQuery("");
        setResultNoteFound(false);
        return await findNotes()

      }
      const filterNotes = notes.filter(note => {
        if(note.title.toLowerCase().includes(text.toLowerCase())) {
          return note;
        }
      });

      if(filterNotes.length) {
        setNotes([...filterNotes]);
      } else {
        setResultNoteFound(true);
      }
    }


    const handleOnClear= async () => {
      setSearchQuery("");
      setResultNoteFound(false);
      await findNotes();
    }

    return (
        <>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
      <TouchableWithoutFeedback>
      <View style={styles.container} >

<Text style={styles.header}>
    {`Good ${greet} ${user.name}`}</Text>
    {notes.length ? (<SearchBar value={searchQuery} onClear={handleOnClear} onChangeText={handleOnSearchInput} containerStyle={{marginVertical: 15}}/>) : null}

    {resultNotFound ? <NotFound /> :     <FlatList 
    columnWrapperStyle={{justifyContent:'space-between', marginBottom: 15}}
     numColumns={2}
       data={reversNotes}
         keyExtractor={item => item.id.toString()}
          renderItem={({item})=> <Note onPress={() => openNote(item)} item= {item}/>}/>}

    {!notes.length ? <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
      <Text style={styles.emptyHeader}>
        Add some notes
      </Text>
    </View> : null}
    
      {/* btn for adding a note */}
</View> 
      </TouchableWithoutFeedback>
        <RoundIconBtnn onPress={() => {setModalVisible(true)}} antIconName={'plus'} style={styles.addBtn}/>

        <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}  
          />
        </>
  )
};   

const styles = StyleSheet.create({
      container:{
        paddingHorizontal: 20,
        // backgroundColor: 'grey',
        flex: 1
      },
      header:{
        fontSize: 23,
        margin: 20
      },
      emptyHeader: {
        fontSize: 30,
         textTransform: 'uppercase',
         fontWeight: '200',
         opacity: 0.80,
      },
      emptyHeaderContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'grey'
      },
      addBtn: {
        position: 'absolute',
        right: 14,
        bottom: 37
      }
      
});

export default NoteScreen;