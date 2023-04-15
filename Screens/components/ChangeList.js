import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import * as database from'./DatabaseHandler';
import { ContextStore } from './ContextStore';


const Changes = ({props}) => {

    const {UntisSession,setUntisSession} = useContext(ContextStore);
    const [Items,setItems] = useState([]);
    let key = 0;

 useEffect(() => {
    database.readData().then(data => {
        const array = data.rows._array
       let addlist = []
       array.forEach(element => {
           if (element.code || element.substText ) {
               addlist.push(element)
           }
       });
       setItems(addlist);
   });
 },[UntisSession])

    return(
        <View test={UntisSession} style={styles.frame}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Timetable events ({Items.length})</Text>
            {Items.slice(0,4).map((item) => {
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
                    { Items.length>4?(
                        <TouchableOpacity onPress={() => {alert('Feature missing!')}}>
                        <Text style={{textDecorationLine: 'underline',fontSize:15,width:'100%',textAlign:'center',padding:6,marginTop:10}}>Show more</Text>
                        </TouchableOpacity>
                    ):null}
                    { Items.length<1?(
                        <Text style={{fontSize:18,opacity:0.6,width:'100%',textAlign:'center',padding:6,marginTop:10}}>Currently no changes listed</Text>
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
