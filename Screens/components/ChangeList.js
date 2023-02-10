import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import * as database from'./DatabaseHandler';

var items = [];

let key = 0;


database.readData().then(data => {
 	const array = data.rows._array
    array.forEach(element => {
        if (element.code==='cancelled' || element.substText ) {
            items.push(element)
        }
    });
});

const Changes = ({props}) => {

    return(
        <View style={styles.frame}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Timetable events ({items.length})</Text>
            {items.slice(0,4).map((item) => {
                let [start,end] = ''

                key++ ;
                return(
                    <View key={key} style={styles.item}>
                        <View style={[{ backgroundColor: item.code ? 'red' : 'purple' },styles.indicator]}></View>
                        <Text style={styles.text1}>{item.sg}</Text>
                        <Text style={styles.text2}>{ item.code?( item.code ):item.substText }</Text>
                        <Text style={styles.text3}>{start+' - '+end}</Text>
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
    text3: {
        color: '#000',
        fontSize: 16,
        marginLeft: 6,
    },

});

export {Changes};
