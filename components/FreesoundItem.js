import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet,Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import { edit } from "../components/library/librarySlice"; 

const FreesoundItem = ({item, props}) =>{

    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

     /**
     * Used to return reference to the dispatch function from the Redux store.
     * @see {@link https://react-redux.js.org/api/hooks#usedispatch | useDispath from redux toolkit }
     */
      const dispatch = useDispatch();

    /**
     * Play the audio
     */
     const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(item.previews["preview-hq-mp3"]);
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);
    };

    /**
     * Pause sound
     */
    const pauseSound = async () => {
        await sound.pauseAsync();
        setIsPlaying(false);
    }

    /**
     * Download sound and edit source
     * @param {int} id item id 
     */
    const download = (id) =>{
        dispatch(edit({id:id,object:{name:item.name,type:"freesound",url:item.previews["preview-hq-mp3"]}}));
        console.log(dispatch(edit({id:id,object:{name:item.name,type:"freesound",url:item.previews["preview-hq-mp3"]}})));
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
        <View style={styles.itemContainer}>
            <View style={styles.audioContainer}>
                {
                    isPlaying
                    ? <TouchableOpacity style={styles.audioButton} onPress={()=>pauseSound(item.id)}><Ionicons name="pause" size={50} color="dark"/></TouchableOpacity>
                    : <TouchableOpacity style={styles.audioButton} onPress={()=>playSound(item.id)}><Ionicons name="play" size={50} color="dark"/></TouchableOpacity>
                }
                
                <Text style={styles.audioName}>{item.name}</Text>
            </View>
            <View style={styles.buttonChooseContainer}>
                <TouchableOpacity style={styles.buttonChoose} onPress={() => download(props.id)}>
                    <Text style={styles.buttonText}>Choose</Text>
                </TouchableOpacity>
            </View>
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
        flexDirection:'row',
        justifyContent:"space-between"
    },
    audioButton:{
        width:55,
        height:55,
        padding:2,
        margin:5,
        borderRadius:50 
    },
    audioName:{
        fontSize:24,
        alignSelf:'center'
    },
    buttonChooseContainer:{
        flexDirection:'row', 
        alignItems:'center',
        margin:10
    },
    buttonChoose:{
        backgroundColor:'tomato',
        padding:5,
        width:100,
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

export default FreesoundItem;