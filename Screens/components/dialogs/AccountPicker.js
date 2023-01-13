import { View, Text, Dimensions, StyleSheet, Image, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AccountPicker = ({btsref}) => {

    const snapPoints = ['45%'];
    const accounts = ['John','Timi','Guntuhdfgzsvfgsdvfhgsdvfsvffwfwer','Jeffrey Dahmer','frida','Mark','lesley','Will'];

    
    return(
        <BottomSheetModal backgroundStyle={styles.modalbg} index={0} ref={btsref} snapPoints={snapPoints}>
        <View style={styles.frame}>
        <Text style={styles.title}>Pick an account to use</Text>
            <BottomSheetScrollView style={styles.accounts}>
            {accounts.map(item=>(<View style={styles.pickaccount}>
                <Text style={styles.accountTitle} >{item}</Text>
                <TouchableOpacity><Image style={{height:30,width:30,marginLeft:10}} source={require('../../assets/placeholder.jpeg')}/></TouchableOpacity>
                </View>))}
            </BottomSheetScrollView>
        </View>
     </BottomSheetModal>
        );
};


const styles = StyleSheet.create({
    modalbg: {
        backgroundColor: 'lightgray',
    },
    frame: {
        flex: 1,
        padding: 8,
    },
    title: {
        marginBottom: '8%',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pickaccount: {
        backgroundColor: 'gray',
        padding: 6,
        margin: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
    },
    accountTitle: {
        marginLeft: 15,
        color: 'white',
        fontSize: 16,
        width: '80%',
    },

})

export {AccountPicker};