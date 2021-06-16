import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

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

     /**
     * Navigate to the change source view to choose the source of change for the pad audio
     * @see handleLongPress
     */
    const changePadSource = () => {
        navigation.navigate("Change pad source",{props:props});
    }

    return(
        <View style={{flex:1}}>
            <Text style={styles.header}>
                <TouchableOpacity style={{paddingRight:2}}onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color="white"/>
                </TouchableOpacity>
                Edition choice
            </Text>
            <View style={styles.container}>
                <Text style={styles.title}>What do you want to do?</Text>
                <TouchableOpacity onPress={trimPad}>
                    <Text style={styles.buttonLabel}> - Trim the pad {props.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changePadSource}>
                    <Text style={styles.buttonLabel}> - Change the pad {props.id} source</Text>
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