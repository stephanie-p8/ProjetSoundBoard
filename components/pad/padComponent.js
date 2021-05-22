import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { padSelector, changeSource } from "./padSlice";
import { useSelector, useDispatch } from "react-redux";
import { View,FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from "expo-av";

const PadComponent = () => {

    const defaultSound = useSelector(padSelector);

    const generateGrid = () => {
        let pads = [];
        for(let i = 0; i<defaultSound.length;i++){
            for(let j=0;j<defaultSound.length;j++){
                pads.push(defaultSound[j]);
            }
            
        }
        return pads;
    }

    const [grid,setGrid] = useState(generateGrid());
    const [sound, setSound] = useState();
    const dispatch = useDispatch();

    const playSound = async (id) => {
        dispatch(changeSource(id));
        const { sound } = await Audio.Sound.createAsync(defaultSound[id].url);
        console.log(defaultSound[id].url);
        setSound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return () => {
          if (sound) {
            sound.unloadAsync();
          }
        };
    }, [sound]);
    
    return(
        <View style={styles.container}>
            <FlatList 
                data={grid}
                numColumns={defaultSound.length}
                keyExtractor = {(item) => item.id.toString()}
                renderItem = {({ item }) => <TouchableOpacity style={styles.button} onPress={()=>{playSound(item.id)}}/>}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
        marginTop:15
    },
    button:{
        width:50,
        height:50,
        padding:50,
        margin:2,
        backgroundColor:'tomato'  
    }
  });

export default PadComponent;