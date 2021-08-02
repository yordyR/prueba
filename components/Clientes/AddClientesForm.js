import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, Alert, Dimensions, Text  } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import {gql, useMutation} from "@apollo/client";


export default function AddClientesForm(props){
    console.log(props)
    const {navigation} = props

    const [CreateClient, { data, error, loading }] = useMutation(Set_cliente)
   
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [cedula, setCedula] = useState("")
    const [mensaje, setMensaje] = useState("")

    const addCliente = () =>{
        console.log("cliente")
        console.log(nombre)
        console.log(apellido)
        console.log(telefono)
        console.log(direccion)
        console.log(cedula)
        console.log(mensaje)


        if(!telefono){
            setMensaje("todos los campos son obligatorios")

            CreateClient({ variables: {
                "firstName": nombre,
                "lastName": apellido,
                "cellphone": telefono,
                "cedula": cedula,
                "address": {
                    "streetAddress": "calle 10",
                    "city": "bogota",
                    "stateId": 1,
                    "cityId": 1
                    }
                }
                
            });
            console.log(data, loading, error)
            if (loading) return "Loading...";
            if (error){ 
                // return `Error! ${error.message}`;
                setMensaje(error.errors[0].message)
            }
        
            if(data != undefined || data != null){
                console.log(data.createClient)
                if(!data.createClient.errors){

                    setMensaje("Registro Exitoso")
                }
                navigation.navigate("Clientes")
            }
        }


    }

    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd 
                setNombre={setNombre}
                setApellido={setApellido}
                setDireccion={setDireccion}
                setTelefono={setTelefono}
                setCedula={setCedula}

            />
            <Text>{mensaje}</Text>
            <Button 
                title="crear Cliente"
                onPress={addCliente}
                buttonStyle={styles.btnAddClientes}
            />
        </ScrollView>
    )
}

// mutation crear nuevo cliente
const Set_cliente = gql`
mutation CreateClient (
    $firstName: String!
    $lastName: String!
    $cellphone: String!
    $cedula: String
    $address: AddressInput! 
  ) {
    createClient( 
      input:{
        firstName: $firstName
        lastName: $lastName
        cellphone: $cellphone
        cedula: $cedula
        address: $address
      }
    ){
      __typename
      ... on ValidationErrors{
        message
        errors{
          message
          field
        }
      }
         ... on Client{
        id
          firstName
          lastName
        cellphone
        address
          cedula
      }
    }
  }
`;


function FormAdd(props){
    const {
        setNombre,
        setApellido,
        setDireccion,
        setTelefono,
        setCedula,
    } = props

    
    return (
        <View style={styles.viewForm}>
            
                <Input 
                    placeholder="Nombre"
                    containerStyle={styles.Input}
                    onChange={(e) => setNombre(e.nativeEvent.text)}
                />

                <Input
                    placeholder="apellido"
                    containerStyle={styles.input}
                    onChange={(e) => setApellido(e.nativeEvent.text) }

                />
                
                <Input 
                    placeholder="telefono"
                    containerStyle={styles.input}
                    onChange={(e) => setTelefono(e.nativeEvent.text) }
                />
                
                <Input 
                    placeholder="cedula"
                    containerStyle={styles.input}
                    onChange={(e) => setCedula(e.nativeEvent.text) }
                />
                
                <Input 
                    placeholder="direcion"
                    containerStyle={styles.input}
                    onChange={(e) => setDireccion(e.nativeEvent.text) }
                    
                />

               
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView:{
        height: "100%"
    },
    viewForm:{
        marginLeft: 10,
        marginRight: 10
    },
    input:{
        with: "200"
    },
    btnAddClientes:{
        backgroundColor: "#5b2ad0",
        margin: 20
    }
})