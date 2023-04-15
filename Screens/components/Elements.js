
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { React,useState } from 'react';

const ButtonSwitch = ({props}) => {

    const [On,SetOn] = useState(false);

    function buttonclick() {
        SetOn(On => !On);
    }

    return(
        <TouchableWithoutFeedback onPress={buttonclick}>
            <View>
                <View style={[styles.frame,On?{backgroundColor:'teal',justifyContent:'flex-end'}:{backgroundColor:'black',justifyContent:'flex-start'}]}>
                    <View style={styles.marble}></View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    frame: {
      width: 70,
      padding: 4,
      margin: 5,
      opacity: 0.4,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'flex-end'
    },
    marble: {
      backgroundColor: 'white',
      borderRadius: 10,
      width: 30,
      height: 20,
    }
  });
  

export {ButtonSwitch};
