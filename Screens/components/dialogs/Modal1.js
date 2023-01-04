import { View, Text, StyleSheet, Modal, Dimensions, Button } from 'react-native';
import React, { useState } from 'react';

const ModalPopup = ({props}) => {

    return(
        <View style={styles.background}>
        <View style={styles.frame}>
            <Text>Test</Text>
        </View>
        </View>);
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
