import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import PadComponent from '../pad/PadComponent';
import PadEdition from '../pad/PadEdition';
import PadTrim from '../pad/PadTrim';
import PadChangeSourceView from "../pad/PadChangeSourceView";
import PadLibrarySource from "../source/PadLibrarySource";
import PadFreesoundSource from "../source/PadFreesoundSource";
import PadMicroSource from '../source/PadMicroSource';

/**
 * Create a stack navigator for edition
 * @see {@link https://reactnavigation.org/docs/stack-navigator/ | Stack-Navigator}
 */
const Stack = createStackNavigator();

/**
 * Render navigation between screens PadComponent, PadEdition and PadTrim
 * @returns Stack Navigator
 * @author Stephanie PERAFAN
 * @version 1.0.0
 */
const SamplerEditionNavigation = () =>{

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
          }}
          >
            <Stack.Screen 
                name="Sampler" 
                component={PadComponent} 
            />
            <Stack.Screen 
                name="Edit pad" 
                component={PadEdition} 
                initialParams={{id:'no id'}}
            />
            <Stack.Screen 
                name="Trim pad" 
                component={PadTrim} 
                initialParams={{id:'no id'}}
            />
             <Stack.Screen 
                name="Change pad source" 
                component={PadChangeSourceView} 
            />
            <Stack.Screen 
                name="Pad source from library" 
                component={PadLibrarySource} 
            />
            <Stack.Screen 
                name="Pad source from freesound" 
                component={PadFreesoundSource} 
            />
             <Stack.Screen 
                name="Pad source from micro" 
                component={PadMicroSource} 
            />
        </Stack.Navigator>
    )

}

export default SamplerEditionNavigation;