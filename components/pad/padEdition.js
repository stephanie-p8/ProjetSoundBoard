import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Render a view where user can choose the option of edition  
 * @param {SamplerEditionNavigation} route to get parameters of navigation
 * @param  {SamplerEditionNavigation} navigation to navigate between edition view and trim view
 * @returns a view with options of edition
 * @author Stephanie PERAFAN
 * @version 1.0
 */
const PadEdition = ({route,navigation}) => {
    /**
     * Route given for navigation
     * @see handleLongPress 
     */
    const {props} = route.params

    /**
     * Navigate to the trim view to edit the pad audio
     * @see handleLongPress
     */
    const trimPad = () =>{
        navigation.navigate("Trim pad",{props:props});
    }

    return(
        <View>
            <Text style={styles.header}>Choix d'edition</Text>
            <View style={{alignItems:'center'}}>
                <Text style={styles.title}>Que voulez vous faire?</Text>
                <TouchableOpacity onPress={trimPad}>
                    <Text style={styles.buttonLabel}> - Rogner le sample {props.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonLabel}> - Changer le sample {props.id}</Text>
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
export default PadEdition;