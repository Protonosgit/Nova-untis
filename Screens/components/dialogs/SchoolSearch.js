import { View, Text, Dimensions, StyleSheet, TextInput, Image, Button, ScrollView, Keyboard } from 'react-native';
import React, { useState, useContext, useRef } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { untisSchoolQuery } from '../UntisApi';
import { ContextStore } from '../ContextStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SchoolSearch2 = ({btsref}) => {

    const snapPoints = ['45%'];
    const [schools,setschools] = useState([]);
    const [searchres,setsearchres] = useState('');

    const {Schoolname,setSchoolname} = useContext(ContextStore);
    const {SchoolInfo,setSchoolInfo} = useContext(ContextStore);

    async function searchterm(term) {
        untisSchoolQuery(term).then((res)=>{
          if (res.result){
            if(res.result.schools.length>0){
                setsearchres('')
                setschools(res.result.schools);
            } else {setsearchres('No schools have been found!'); setschools([]);}
          } else{
            if (res.error.code===-6003) {
            setsearchres('Too many results');
            setschools([]);
            } else{ setsearchres('error while searching'); setschools([]);}
          }
        })
      }
      function schoolpick(picked) {
        setSchoolInfo(picked);
        setSchoolname(picked.loginName);
        Keyboard.dismiss();
        setTimeout((()=>{btsref.current.close();}),300)
      }

    
    return(
        <BottomSheetModal backgroundStyle={styles.modalbg} index={0} ref={btsref} snapPoints={snapPoints}>
        <View style={styles.frame}>
        <Text style={styles.title}>Search for your school</Text>
        <View style={styles.searchbar}>
            <Image source={require('../../assets/placeholder.jpeg')} style={{width: 20, height: 20, marginLeft: 10}}/>
            <TextInput style={{marginLeft: 15, width:'90%'}} onChangeText={(text)=>{ if (text.length>2) {if(text.length>40){setsearchres('Too much input')}else{searchterm(text)}}}} placeholder='Schoolname'/>
        </View>
        <Text style={styles.searchres}>{searchres}</Text>
            <BottomSheetScrollView>
            {schools.map(item=>(
            <View key={item.schoolId} style={styles.items}>
                <TouchableOpacity onPress={()=>{schoolpick(item)}}>
                <Text style={styles.schoolname} >{item.displayName}</Text>
                <Text >{item.address}</Text>
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
    searchbar: {
        display : 'flex',
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: 'gray',
        padding: 8,
        borderRadius: 30,
    },
    searchres: {
        color: 'tomato',
        fontSize: 16,
        fontWeight: 'bold',
    },
    items: {
        padding: 6,
        margin: 2,
        backgroundColor: 'gray',
        borderRadius: 4,
    },
    results: {
        marginTop: 20,
    },
    schoolname: {
        fontSize: 18,
    }

})

export {SchoolSearch2};
