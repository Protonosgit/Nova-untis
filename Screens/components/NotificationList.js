import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const items = [1,2];
let key = 0;

const Notifications = ({props}) => {

    return(
        <View style={styles.frame}>
            {items.map(() => {key++; return(
            <View key={key} style={styles.item}>
                <Text style={styles.text1}>Title</Text>
                <Text style={styles.text2}>Text content preview</Text>
                </View>
            )})}
        </View>
        );
};



const styles = StyleSheet.create({
    frame: {
        paddingLeft: 12, paddingRight: 12,
        width: '100%',
    },
    item: {
        margin: 4,
        padding: 3,
        backgroundColor: 'gray',
        borderRadius: 4,
    },
    text1: {
        marginLeft: 16,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text2: {
        color: '#fff',
        fontSize: 16,

    },

})

export {Notifications};
