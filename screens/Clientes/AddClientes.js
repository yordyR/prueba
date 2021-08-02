import React from "react"
import {StyleSheet, View, Text} from "react-native"
import AddClientesForm  from "../../components/Clientes/AddClientesForm"


export default function AddClientes(props){
    const { navigation} = props

    return (
        <View>
            <AddClientesForm navigation={navigation} />
        </View>
    )
}

// const style = StyleSheet.crete({

// })