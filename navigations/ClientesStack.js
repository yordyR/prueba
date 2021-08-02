import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Clientes from "../screens/Clientes/Clientes"
import AddClientes from "../screens/Clientes/AddClientes"

const Stack = createStackNavigator()

export default function ClientesStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="clientes"
                component={Clientes}
                options={{
                    title: "Clientes"
                }}
            />
            <Stack.Screen 
                name="add-clientes"
                component={AddClientes}
                options={{
                    title: "Añadir Clientes"
                }}
            />
        </Stack.Navigator>
    )
}