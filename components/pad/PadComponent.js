import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { padSelector, changeSource } from "./padSlice";
import { useSelector, useDispatch } from "react-redux";
import { View,FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from "expo-av";
import { librarySelector } from '../library/librarySlice';

/**
 * Create a sampler with diferent sounds in the pads
 * @param {SamplerEditionNavigation} navigation to navigate between sampler and edition view 
 * @returns Flatlist which render the sampler
 * @author Stephanie PERAFAN
 * @version 1.1.0
 * @see {@link https://docs.expo.io/versions/latest/sdk/av/ | expo-av from expo library } to use medias
 * @see {@link https://docs.expo.io/versions/latest/sdk/audio/ | Audio from expo library } to use audio methods
 */
const PadComponent = ({navigation}) => {

    /**
     * Use the librarySelector for the sounds in each pad
     * @see padSelector
     * @see {@link https://react-redux.js.org/api/hooks#useselector | useSelector hook from redux toolkit } to extract data from the Redux store state, using a selector function.
     */
    const defaultSound = useSelector(librarySelector);

    /**
     * Generate a grid of pads using the selector padSelector
     * @returns pads the grid with the sounds
     */
    const generateGrid = () => {
        let pads = [];
        for(let i = 0; i<defaultSound.length;i++){
            for(let j=0;j<defaultSound.length;j++){
                pads.push(defaultSound[j]);
            }
        }
        return pads;
    }

    /**
     * Grid of pads to create the sampler
     */
    const [grid,setGrid] = useState(generateGrid());

    /**
     * To create the sound for a pad
     */
    const [sound, setSound] = useState();

    
    /**
     * Play the audio with the id given
     * @param {int} id the index of the sound to play
     */
    const playSound = async (id) => {
        const { sound } = await Audio.Sound.createAsync(defaultSound[id].url);
        setSound(sound);
        await sound.playAsync();
    };

    /**
     * Action for a long press of a pad: navigate to edition view
     * @param {FlatList item} item the pad pressed from the sampler
     * @see PadEdition
     */
    const handleLongPress = (item) => {
        navigation.navigate("Edit pad",{props: item})
    }

    /**
     * Unload sound from memory
     */
    useEffect(() => { 
        return () => {//componentWillUnmount
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
                renderItem = {({ item }) => <TouchableOpacity style={styles.button} onPress={()=>{playSound(item.id)}} onLongPress={()=>handleLongPress(item)}/>}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:15
    },
    button:{
        width:20,
        height:20,
        padding:30,
        margin:2,
        backgroundColor:'tomato'  
    }
  });

export default PadComponent;