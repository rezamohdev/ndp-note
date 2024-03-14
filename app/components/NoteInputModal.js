import React, { useEffect, useState } from 'react';
import {View, 
    StyleSheet, 
    Modal, 
    Text, 
    StatusBar, 
    TextInput, 
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({visible, onClose, onSubmit, note , isEdit}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesk] = useState('');
    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {

        if(isEdit) {
            setTitle(note.title);
            setDesk(note.desc);
        }
        
    }, [isEdit])

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor === 'desc') setDesk(text);
    };


  

    // console.log(title, desc);

    // moethod for handling submit button
    const handleSubmit = () => {

        // log the title and description
        // console.log(title, desc);

        if(!title.trim() && !desc.trim()) return onClose();
        
        if(isEdit) {
            // for edit
            onSubmit(title, desc, Date.now())
        } else {

            onSubmit(title, desc);
            setTitle('');
            setDesk('');
        }
        onClose();
    }
  
    const closeModal = () => {
        if(!isEdit) {            
            setTitle('');
            setDesk('');
        }
        onClose();
    }
    return  <>
        <StatusBar/>
        <Modal visible={visible} animationType='slide'>
            <View style={styles.container}>
            <TextInput 
            value={title}
            placeholder='Title'
             style={[styles.input, styles.title]}
             onChangeText={(text) => handleOnChangeText(text, 'title')}
             />
            <TextInput value={desc} onChangeText={(text) => handleOnChangeText(text, 'desc')} multiline={true} placeholder='Note ...' style={[styles.input, styles.desc]}/>
            <View style={styles.btnContainer}>
            <RoundIconBtn size={15} antIconName={'check'} style={styles.actionBtn} onPress={handleSubmit}/>
        { title.trim() || desc.trim() ? (<RoundIconBtn 
        size={15} 
        antIconName={'close'}
         style={{marginLeft:25}} onPress={closeModal} />) : null}
            </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[StyleSheet.absoluteFillObject,styles.modalBG]  }>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </>
};   

const styles = StyleSheet.create({
      container:{
        paddingBottom:50,
        paddingHorizontal: 20,
        backgroundColor: 'f7fafa'
      },
      title: {
          borderBottomWidth: 1,
        borderBottomColor: 'grey',
        fontSize: 21,
        fontWeight: '700',
        opacity: 0.50,
        marginTop: 45,
        paddingLeft: 15,
        backgroundColor: 'white',
        height: 40,
        padding:10,
        color: 'black'
    },
    desc: {
        marginTop:10,
        paddingTop:20,
        paddingLeft:20,
        backgroundColor: 'white',
        height:'60%',
        textAlignVertical: 'top',
        fontSize: 20
    },
    modalBG: {
        flex:1,
        zIndex: -1,
        backgroundColor: 'white',

    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        // backgroundColor: 'blue'
    },
    actionBtn: {
        
    }
});

export default NoteInputModal;