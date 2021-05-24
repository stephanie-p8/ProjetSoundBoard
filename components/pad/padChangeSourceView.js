import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

    return(
        <View>
            <Text style={styles.header}>Choix de la source</Text>
            <View style={{alignItems:'center'}}>
                <Text style={styles.title}>Choisisez la source de changement du pad:</Text>
                <TouchableOpacity onPress={changeFromLibrary}>
                    <Text style={styles.buttonLabel}> - Choix d'un nouveau son parmi la bibliothèque locale</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonLabel}> - Enregistrement d'un nouveau son avec le micro</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonLabel}> - Recherche d'un son par mot-clé en utilisant l'API freesound</Text>
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