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
            setsearchres('Too many results!');
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
            <Image source={require('../../assets/search_icon.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
            <TextInput style={{marginLeft: 15, width:'90%'}} onChangeText={(text)=>{ if (text.length>2) {if(text.length>40){setsearchres('Too much input')}else{searchterm(text)}}}} placeholder='Schoolname'/>
        </View>
            <BottomSheetScrollView>
            {
          searchres?(
            <View style={styles.searchres}><Text style={{color:'gray',fontSize:20}}>{searchres}</Text></View>
          ):(
            <View style={{marginTop:20}}>
            {schools.map(item=>(
            <View key={item.schoolId} style={styles.items}>
                <TouchableOpacity onPress={()=>{schoolpick(item)}}>
                <Text style={{fontSize:18}} >{item.displayName}</Text>
                <Text>{item.address}</Text>
                </TouchableOpacity>
                </View>
                ))}
                </View>
          )
        }
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
        marginBottom: '4%',
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
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      marginTop: 12,
    },
    items: {
        padding: 6,
        margin: 2,
        backgroundColor: 'gray',
        borderRadius: 4,
    },

})

export {SchoolSearch2};
