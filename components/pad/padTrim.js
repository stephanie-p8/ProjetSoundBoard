import React, {useState,useEffect} from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import Trimmer from 'react-native-trimmer';
import { edit, librarySelector } from "../library/librarySlice";
import { useDispatch, useSelector } from "react-redux"; 
import Ionicons from "react-native-vector-icons/Ionicons";

const PadTrim = ({route}) =>{

    const {props} = route.params;

    const library = useSelector(librarySelector);
    const scrubInterval = 50;
   
    const [totalDuration,setTotalDuration] = useState(library[props.id].crop[1]);
    const [trimmerLeftHandlePosition,setTrimmerLeftHandlePosition] = useState(library[props.id].crop[0]*1000);//millisecondes
    const [trimmerRightHandlePosition,setTrimmerRightHandlePosition] = useState((library[props.id].crop[0]*1000)+(totalDuration*1000));
    const [isPlaying,setIsPlaying] = useState(false);
    const [scrubberPosition,setScrubberPosition] = useState(trimmerLeftHandlePosition);

    const dispatch = useDispatch();
   
    const handleChange = ({leftPosition,rightPosition}) =>{
        setTrimmerLeftHandlePosition(leftPosition);
        setTrimmerRightHandlePosition(rightPosition);
        setTotalDuration(trimmerRightHandlePosition-trimmerLeftHandlePosition);
        dispatch(edit({object:{crop: [trimmerLeftHandlePosition/1000,totalDuration/1000]}}));
    }

    const onLeftHandlePressIn = (leftPosition) =>{
        setTrimmerLeftHandlePosition(leftPosition);
    }

    const onRightHandlePressIn = (rightPosition) =>{
        setTrimmerRightHandlePosition(rightPosition);
    }

   

    const playScrubber = () => {
        setIsPlaying(true);
    }

    const pauseScrubber = () => {
        setIsPlaying(false);
        setScrubberPosition(trimmerLeftHandlePosition);
    }

    const onScrubbingComplete = (newValue) =>{
        setIsPlaying(false);
        setScrubberPosition(newValue);
    }

    useEffect(() => {
        let scrubberInterval = setInterval(() => {
            setScrubberPosition(scrubberPosition+scrubInterval);
        },scrubInterval)
        return () => {
            clearInterval(scrubberInterval);
        }
    }, [scrubberPosition])
    
    return(
        <View style={{flex:1}}>
            <Text style={styles.header}>Rogner le sample {props.id} à la durée désirée</Text>
            <View>
                {
                    isPlaying 
                    ? <View style={styles.buttonContainer}><TouchableOpacity style={styles.button} onPress={pauseScrubber}><Ionicons name="pause" size={50} color="white"/></TouchableOpacity></View>
                    : <View style={styles.buttonContainer}><TouchableOpacity style={styles.button} onPress={playScrubber}><Ionicons name="play" size={50} color="white"/></TouchableOpacity></View>
                }
                <Trimmer  
                    onHandleChange={handleChange}
                    totalDuration={totalDuration}
                    trimmerLeftHandlePosition={trimmerLeftHandlePosition}
                    trimmerRightHandlePosition={trimmerRightHandlePosition}
                    maximumZoomLevel={200}
                    zoomMultiplier={20}
                    initialZoomValue={2}
                    scaleInOnInit={true}
                    tintColor="tomato"
                    markerColor="#ffffff"
                    trackBorderColor="#5a3d5c"
                    scrubberColor="#b7e778"
                    scrubberPosition={scrubberPosition}
                    onScrubbingComplete={onScrubbingComplete}
                    onLeftHandlePressIn={onLeftHandlePressIn}
                    onRightHandlePressIn={onRightHandlePressIn}
                    onScrubberPressIn={() => console.log('onScrubberPressIn')}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      backgroundColor: "tomato",
      color: "white",
      padding: 10,
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        margin:10
    },
    button:{
        backgroundColor:'tomato',
        width:55,
        height:55,
        padding:2,
        borderRadius:50
        
    },
    buttonLabel:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center'


    }
  });

export default PadTrim;