import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import FreesoundItem from '../FreesoundItem';
import Ionicons from "react-native-vector-icons/Ionicons";

const formatResponse = (item) => {
    return {
      previews: item.previews,
      name: item.name,
      url: item.url,
      description: item.description,
      soundType: item.type,
      download: item.download,
      id: item.id.toString(),
    };
};

const searchSounds = async (query) =>{

    if(query=="") return;
    const response = await fetch("https://freesound.org/apiv2/search/text/?query=${query}&fields=id,name,url,description,previews,download&token=3IFMmywRxdfHdWXbTVU61okLhrfqdIoZ54qJJ4mP"); //prendre la cle de l'api
    const json = await response.json();

    return json.results.map(formatResponse);
}

const PadFreesoundSource = ({route,navigation}) =>{
    const {props} = route.params;
    const [input,setInput] = useState("");
    const [sound, setSound] = useState();
    const [listResults, setListResults] = useState([]);

    const handleSubmit = () => {
        searchSounds(input).then((result) => {
          //console.log(result);
          setListResults(result);
        });
    };

    useEffect(() => {
        const timeout = setTimeout(handleSubmit, 1000);
        return () => {
          clearTimeout(timeout);
        };
    }, [input]);

    return (
        <View>
          <Text style={styles.header}>
            <TouchableOpacity style={{paddingRight:2}}onPress={()=>navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={30} color="white"/>
            </TouchableOpacity>
            Search sound
          </Text>
          <TextInput
            style = {styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Search sounds"
          />
          <FlatList
            data={listResults}
            renderItem={({ item }) => (
                <FreesoundItem item={item} props={props}/>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      backgroundColor: "tomato",
      color: "white",
      padding: 10,
    },
    input:{
      borderWidth:1,
      padding:3
    }
  });

export default PadFreesoundSource;