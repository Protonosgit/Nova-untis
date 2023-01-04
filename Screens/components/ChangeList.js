import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const items = [1,2,3,4,5];
const colortest = ['yellow','red','yellow','red','red']
let key = 0;

const Changes = ({props}) => {

    return(
        <View style={styles.frame}>
            {items.map(() => {key++ ;return(
            <View key={key} style={styles.item}>
                <Text style={styles.text1}>Subject</Text>
                <Text style={styles.text2}>Type of event</Text>
                </View>
            )})}
        </View>
        );
};


const styles = StyleSheet.create({
    frame: {
        width: '100%',
        paddingLeft: 12, paddingRight: 12,
    },
    item: {
        margin: 2,
        padding: 3,
        backgroundColor: 'gray',
        borderRadius: 4,
        borderWidth: 2.5,
        borderColor: 'red',
    },
    text1: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    text2: {
        color: '#fff',
        fontSize: 14,

    },

});

export {Changes};
