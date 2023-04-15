import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const items = [1,2];

let key = 0;

const Notifications = ({props}) => {

    return(
        <View style={styles.frame}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Notifications ({items.length})</Text>
            {items.map(() => {key++ ;return(
            <View key={key} style={styles.item}>
                <Text style={styles.text1}>Title</Text>
                <Text numberOfLines={1} style={styles.text2}></Text>
                </View>
            )})}
            { items.length>4?(
            <TouchableOpacity onPress={() => {alert('Feature missing!')}}>
            <Text style={{textDecorationLine: 'underline',fontSize:15,width:'100%',textAlign:'center',padding:6,marginTop:10}}>Show more</Text>
            </TouchableOpacity>
            ):null}
        </View>
        );
};



const styles = StyleSheet.create({
    frame: {
        width: '100%',
        paddingLeft: 12, paddingRight: 12,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        margin: 2,
        padding:4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'black',
    },
    indicator: {
        margin: 5,
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    text1: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text2: {
        color: '#000',
        fontSize: 16,
        marginLeft: 6,

    },

})

export {Notifications};
