import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

/**
 * Render a view where user can choose the source of edition  
 * @param {SamplerEditionNavigation} route to get parameters of navigation
 * @param  {SamplerEditionNavigation} navigation to navigate between source choice view and librarysource view
 * @returns a view with options of source edition
 * @author Stephanie PERAFAN
 * @version 1.0
 */
const PadChangeSourceView = ({route,navigation}) =>{

    const {props} = route.params;

    /**
     * Navigate to view with the list of audio in library to choose one for the edition
     */
    const changeFromLibrary =() =>{
        navigation.navigate("Pad source from library",{props:props})
    }

    /**
     * Navigate to view with the list of audio by a search in freesound
     */
    const changeFromFreesound = () =>{
        navigation.navigate("Pad source from freesound",{props:props})
    }

     /**
     * Navigate to view with the list of audio by a search in freesound
     */
    const changeFromMicro = () =>{
        navigation.navigate("Pad source from micro",{props:props})
    }

    return(
        <View style={{flex:1}}>
            <Text style={styles.header}>
                <TouchableOpacity style={{paddingRight:2}}onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color="white"/>
                </TouchableOpacity>
                Source choice
            </Text>
            <View style={styles.container}>
                <Text style={styles.title}>Choose a new source to change the pad:</Text>
                <TouchableOpacity onPress={changeFromLibrary}>
                    <Text style={styles.buttonLabel}> - Choice of a new sound from the local library</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeFromMicro}>
                    <Text style={styles.buttonLabel}> - Recording a sound with the mic</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeFromFreesound}>
                    <Text style={styles.buttonLabel}> - Search a sound by keyword using freesound API</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        backgroundColor: "tomato",
        color: "white",
        padding: 10,
        marginBottom:10
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        padding:3
    },
    buttonLabel:{
        fontSize:24,
        padding:3 
    }
  });

export default PadChangeSourceView;