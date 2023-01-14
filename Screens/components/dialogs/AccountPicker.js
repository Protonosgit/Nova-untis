import { View, Text, Dimensions, StyleSheet, Image, Button } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as database from '../DatabaseHandler';
import { ContextStore } from '../ContextStore';
import * as SecureStore from 'expo-secure-store';

const AccountPicker = ({btsref}) => {

    const snapPoints = ['45%'];
    const [accountlist, setAccountList] = useState([]);
    const {ActiveUser,setActiveUser} = useContext(ContextStore);

    // key value sys
    function setKey(key, value) {
        return SecureStore.setItemAsync(key, value)
          .catch((error) => {
            console.error(`Error saving item with key: ${key}`, error);
          });
      }

      useEffect(() => {
        database.getUserAccounts().then(res => {
            setAccountList(res.rows._array);
        });
    }, [])

    
    return(
        <BottomSheetModal backgroundStyle={styles.modalbg} index={0} ref={btsref} snapPoints={snapPoints}>
        <View style={styles.frame}>
        <Text style={styles.title}>Pick an account to use</Text>
            <BottomSheetScrollView style={styles.accounts}>
            {accountlist.map(item=>(
                <View key={item.id}>
                <TouchableOpacity style={styles.pickaccount} onPress={()=>{setKey('ActiveUser',item.id.toString()).then(()=>{setActiveUser(item.id)})}}>
                    <Text style={styles.accountTitle} >{item.username}</Text>
                    {item.id==ActiveUser?(<Image style={{height:20,width:20,marginLeft:10}} source={require('../../assets/placeholder.jpeg')}/>):null}
                </TouchableOpacity>
                </View>
                ))}
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
        padding: 16,
        margin: 8,
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