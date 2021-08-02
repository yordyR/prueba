import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from "../screens/Login"
import ClientesStack from '../navigations/ClientesStack'


const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login"
                    component={Login} 
                    options={{title:"Login"}} />
                <Tab.Screen name="Clientes" 
                    component={ClientesStack}
                    options={{title:"Clientes"}} />
            </Tab.Navigator>
        </NavigationContainer>
    )

}