import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import PadComponent from '../pad/padComponent';
import PadEdition from '../pad/padEdition';
import PadTrim from '../pad/padTrim';

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
        </Stack.Navigator>
    )

}

export default SamplerEditionNavigation;