import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { add } from "../library/librarySlice";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";


/**
 * Render a view to record an audio
 * @param {SamplerEditionNavigation} navigation to navigate between source choice view and micro source view
 * @returns a view to record an audio to add it in the library
 * @author Stephanie PERAFAN
 * @version 1.0
 */
const PadMicroSource = ({navigation}) =>{

    const [recording,setRecording] = useState();
    const [name, setName] = useState("");
    const [input, setInput] = useState("");
    const [display, setDisplay] = useState("none");  
    const [displayInputs,setDisplayInputs] = useState("none");  

    /**
     * Used to return reference to the dispatch function from the Redux store.
     * @see {@link https://react-redux.js.org/api/hooks#usedispatch | useDispath from redux toolkit }
     */
    const dispatch = useDispatch();
    
    /**
     * Start the recording
     */
    const startRecording = async() =>{
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            }); 
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync(); 
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    /**
     * Stop the recording
     */
    const stopRecording = async() =>{
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        console.log('Recording stopped and stored at', uri);
        display = "block";
    }

    /**
     * Add the record to the library
     */
    const handleYes = () =>{
        setDisplay("none");
        setDisplayInputs("block");
    }

    /**
     * Don't display the option to add the record to the library
     */
    const handleNo = () =>{
        setDisplay("none");
    }

    /**
     * Add record to library 
     */
    const handleAdd = () =>{
        dispatch(add(recording));
    }

    /**
     * Cancel the recording
     */
    const handleCancel = () =>{
        setDisplayInputs("none");
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>
                <TouchableOpacity style={{paddingRight:2}}onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={30} color="white"/>
                </TouchableOpacity>
                Recording a sound
            </Text>
            <View style={styles.recordContainer}>
                <Ionicons name="mic-outline" size={150} color="dark"/>
                {
                   recording
                   ? <TouchableOpacity onPress={stopRecording}><Ionicons name="radio-button-off-outline" size={50} color="dark"/></TouchableOpacity>
                   : <TouchableOpacity onPress={startRecording}><Ionicons name="radio-button-on-outline" size={50} color="red"/></TouchableOpacity>
                }
            </View>
            <View style={[styles.popupContainer,{display:display}]}>
                <Text style={styles.textPopUp}>Do you want to add the recording to the library?</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleYes}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNo}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.inputBoxContainer,{display:displayInputs}]}>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Recording name:</Text>
                    <TextInput
                        style={styles.input}  
                        value={name} 
                        onChangeText={setName}
                        placeholder="Name"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Recording description:</Text>
                    <TextInput  
                        style={styles.input}
                        value={input} 
                        onChangeText={setInput} 
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Description"
                    />

                    <View style={styles.buttonsAddContainer}>
                        <TouchableOpacity onPress={handleAdd}>
                            <Text style={styles.buttonsAddText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCancel}>
                            <Text style={styles.buttonsAddText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //justifyContent:"center",
    },
    header: {
        fontSize: 30,
        backgroundColor: "tomato",
        color: "white",
        padding: 10,
        //marginBottom:10
    },
    recordContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    popupContainer:{
        justifyContent: "center",
        alignItems: "center",
        width:250,
        height:150,
        backgroundColor:"#ECECECDE",
        opacity: 0.8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ECECECDE",
        paddingTop:7,
        paddingHorizontal:10
    }, 
    textPopUp:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent: "space-between",
        alignItems:"center",
        paddingTop: 5,
        paddingHorizontal:10
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#1C1DFF",
       
    },
    inputBoxContainer:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        backgroundColor:"#ECECECDE",
        opacity:0.8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ECECECDE",
        width:400,
        height:250,
    },
    inputContainer:{
        flex:"row",
        justifyContent: "space-between"
    },
    textInput:{
        fontSize: 16,
        textAlign: "left",
        paddingTop:10,
        paddingLeft:5
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'black',
        minWidth: 250,
        width: 300,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 3,
        borderWidth: 1

    },
    buttonsAddContainer:{
        flex:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop: 5,
        paddingHorizontal:10
    },
    buttonsAddText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#1C1DFF",
    }
  });

export default PadMicroSource;