import { View, Text, StyleSheet, TouchableHighlight, Modal, Dimensions, Button } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

const ModalPopup = ({visible,children}) => {

    React.useEffect(() => {
        toggleModal();
    },[visible]);

    const toggleModal=() => {
        if (visible) {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    }
    const [modalVisible,setVisibility] = useState(visible);
    return(
    <Modal transparent visible={modalVisible}>
        <View style={styles.background}>
        <View style={styles.frame}>
            <Text>Test</Text>
            <Button onPress={() => {setVisibility(false)}} title='test'/>
        </View>
        </View>
    </Modal>);
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    frame: {
        padding: 10,
        width: '80%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
        alignItems: 'center',
    }
})

export {ModalPopup};
