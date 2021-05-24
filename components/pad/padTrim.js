import React, {useState,useEffect} from 'react';
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import Trimmer from 'react-native-trimmer';
import { edit, librarySelector } from "../library/librarySlice";
import { useDispatch, useSelector } from "react-redux"; 
import Ionicons from "react-native-vector-icons/Ionicons";

/**
 * Render a view with trimmer to edit the audio
 * @param {SamplerEditionNavigation} route to get parameters of navigation
 * @returns view with trimmer for audio
 * @author Stephanie PERAFAN
 * @version 1.2.0
 * @see {@link https://github.com/repodio/react-native-trimmer | Github react-native-trimmer } give props and methods to use trimmer
 */
const PadTrim = ({route}) =>{
    /**
     * Route given for navigation
     * @see trimPad
     */
    const {props} = route.params;

    /**
     * Use the library selector for the sampler
     * @see librarySelector
     * @see {@link https://react-redux.js.org/api/hooks#useselector | useSelector hook from redux toolkit } to extract data from the Redux store state, using a selector function.
     */
    const library = useSelector(librarySelector);
    const scrubInterval = 50;
    
    /**
     * States with all the props for the trimmer
     */
    const [totalDuration,setTotalDuration] = useState(library[props.id].crop[1]);
    const [trimmerLeftHandlePosition,setTrimmerLeftHandlePosition] = useState(library[props.id].crop[0]*1000);//millisecondes
    const [trimmerRightHandlePosition,setTrimmerRightHandlePosition] = useState((library[props.id].crop[0]*1000)+(totalDuration*1000));
    const [isPlaying,setIsPlaying] = useState(false);
    const [scrubberPosition,setScrubberPosition] = useState(trimmerLeftHandlePosition);

    /**
     * Used to return reference to the dispatch function from the Redux store.
     * @see {@link https://react-redux.js.org/api/hooks#usedispatch | useDispath from redux toolkit }
     */
    const dispatch = useDispatch();
   
    /**
     * Callback for when the handles of the Trimmer component have been released.
     * Both the new leftPosition and rightPosition are in milliseconds
     * @param {int} leftPosition new position for the left side.
     * @param {int} rightPosition new position for the right side. 
     */
    const handleChange = ({leftPosition,rightPosition}) =>{
        setTrimmerLeftHandlePosition(leftPosition);
        setTrimmerRightHandlePosition(rightPosition);
        setTotalDuration(trimmerRightHandlePosition-trimmerLeftHandlePosition);
        dispatch(edit({object:{crop: [trimmerLeftHandlePosition/1000,totalDuration/1000]}})); //edit the pad using dispatch
    }

    /**
     * A callback for when the left handle is initially pressed in. Set the left position value.
     * @param {int} leftPosition the new left position
     */
    const onLeftHandlePressIn = (leftPosition) =>{
        setTrimmerLeftHandlePosition(leftPosition);
    }

    /**
     * A callback for when the right handle is initially pressed in. Set the right position value.
     * @param {int} rightPosition the new right position
     */
    const onRightHandlePressIn = (rightPosition) =>{
        setTrimmerRightHandlePosition(rightPosition);
    }

    /**
     * Play the audio
     */
    const playScrubber = () => {
        setIsPlaying(true);
    }

    /**
     * Pause the audio and change scrubber position
     */
    const pauseScrubber = () => {
        setIsPlaying(false);
        setScrubberPosition(trimmerLeftHandlePosition);
    }

    /**
     * A callback for when the scrubbing is completed on the Trimmer. 
     * Change the scrubber position and the playing value.
     * @param {int} newValue the new scrubber position
     */
    const onScrubbingComplete = (newValue) =>{
        setIsPlaying(false);
        setScrubberPosition(newValue);
    }

    /**
     * Set the scrubber position during the audio playing.
     * Interval is cleared after.
     */
    useEffect(() => {//componentDidMount
        let scrubberInterval = setInterval(() => {
            setScrubberPosition(scrubberPosition+scrubInterval);
        },scrubInterval)
        return () => {//componentWillUnmount
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