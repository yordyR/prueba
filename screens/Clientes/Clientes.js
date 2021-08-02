import React,{useEffect, useState} from 'react'
import {StyleSheet, View, Text, FlatList,ActivityIndicator, TouchableOpacity } from "react-native"
import {gql, useMutation, useQuery} from "@apollo/client";
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements'1|
import { ScrollView } from 'react-native-gesture-handler';


    
const EXTRAERCLIENTES = gql`
    query clientsSearch {
        clientsSearch(  
        page: 0
        perPage:  30
        term: ""
        ){
            currentPage
            totalPages
            resultsPerPage
            results{
            id
            cedula
            cellphone
            firstName
            lastName
            address
        }       
        }
    }
`;

function updateCliente(id){
    console.log(id)
}

function MostrarTodosClientes() {
    
    // const [dataClientes, setDataClientes] = useState()
   
    const { loading, error, data } = useQuery(EXTRAERCLIENTES);
                      
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;  
    const dataClientes = data.clientsSearch.results
    console.log("render", data)
    // setDataClientes(data.clientsSearch.results)
    console.log(dataClientes)

    return dataClientes.map(({ firstName, address, id, cedula, cellphone, lastName }) => (
        <TouchableOpacity
            style={styles.button}
            key={id}
            onPress={()=>updateCliente(id)}
        >
            <div>
                <View style={styles.listLI}>
                    <Text>
                        id: {id} - Nombre: {firstName } {lastName}
                    </Text>
                </View>
                
                <Divider style={styles.divider} />
            </div>
        </TouchableOpacity>
        
      

    ));
   
}

export default function Clientes (props){     
   const { navigation } = props


    return (
        <div>
            <ScrollView centerContent={true} style={styles.viewBody}>
                <Button 
                    title="Crear Cliente"
                    onPress={()=>navigation.navigate("add-clientes")}
                    buttonStyle={styles.btnAddClientes}
                />
                <MostrarTodosClientes />
            </ScrollView>
            
        </div>
        
        
    )
}



const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    btnAddClientes:{
        backgroundColor: "#5b2ad0",
        margin: 20
    },
    listLI:{
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft:20,
        backgroundColor: "#fff"
    }
})