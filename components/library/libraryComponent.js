import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { librarySelector } from '../library/librarySlice';
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../library/librarySlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";

const LibraryComponent = ({navigation}) => {

    /**
     * Use the librarySelector for the sounds in each pad
     * @see padSelector
     * @see {@link https://react-redux.js.org/api/hooks#useselector | useSelector hook from redux toolkit } to extract data from the Redux store state, using a selector function.
     */
    const librarySounds = useSelector(librarySelector);
    const dispatch = useDispatch();
    const [sound,setSound] = useState();
    
    /**
     * Play the audio with the id given
     * @param {int} id the index of the sound to play
     */
     const playSound = async (id) => {
        const { sound } = await Audio.Sound.createAsync(librarySounds[id].url);
        setSound(sound);
        await sound.playAsync();
    };

    /**
     * Change the source for the selected pad
     * @param {int} id 
     */
    const removeSound = (id) =>{
        dispatch(remove(id));
    }

    /**
     * Unload sound from memory
     */
     useEffect(() => { 
        return () => {
          if (sound) {
            sound.unloadAsync();
          }
        };
    }, [sound]);

    return(
        <View style={styles.container}>
            <Text style={styles.header}>
                <TouchableOpacity style={{paddingRight:2}}onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color="white"/>
                </TouchableOpacity>
                All sounds from library
            </Text>
            <FlatList 
                data = {librarySounds}
                keyExtractor = {(item)=>item.id.toString()}
                renderItem = {({item})=>
                    <View style={styles.itemContainer}>
                        <View style={styles.audioContainer}>
                            <TouchableOpacity style={styles.audioButton} onPress={()=>playSound(item.id)}>
                                <Ionicons name="play" size={30} color="dark"/>
                            </TouchableOpacity>
                            <Text style={styles.audioName}>{item.name}</Text>
                        </View>
                        <View style={styles.buttonChooseContainer}>
                            <TouchableOpacity style={styles.buttonChoose} onPress={removeSound}>
                                <Ionicons name="trash-outline" size={30} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
    },
    header: {
        fontSize: 30,
        backgroundColor: "tomato",
        color: "white",
        padding: 10,
        marginBottom:10
    },
    itemContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    audioContainer:{
        flexDirection:'row'
    },
    audioButton:{
        width:55,
        height:55,
        padding:2,
        borderRadius:50
        
    },
    audioName:{
        fontSize:24,
    },
    buttonChooseContainer:{
        flexDirection:'row', 
        alignItems:'center',
        margin:10
    },
    buttonChoose:{
        backgroundColor:'tomato',
        padding:5,
        width:40,
        height:40,
        borderRadius:3,
    },
    buttonText:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    }
  });


export default LibraryComponent;
