import React, {useState} from "react"
import {gql, useMutation} from "@apollo/client";
import {useNavigation} from "@react-navigation/native"
import { StyleSheet, View, ScrollView, Text, Image } from "react-native"
import { Divider, Input, Icon, Button, Tooltip } from 'react-native-elements'




// mutacion generar token login
const Set_Login = gql`
  mutation Login($cellphone:String!, $password:String!) {
    login(
        cellphone:$cellphone
        password:$password
        )
        {
            ... on AuthInfo{
                token
            }
            ... on ValidationErrors{
                message
            }
        }
  }
`;

// conmponente de login
function ApolloLogin() {
    const navigation = useNavigation()
    // variables de estado
    const [login, { data, error, loading }] = useMutation(Set_Login)
    const [datosForm, setDatosForm] = useState({
        cellphone: '',
        password: '',

    })

    // se ejecuta cada que existe un cambio en los campos
    
    const handleChange = (e, type) =>{
        console.log(e)
        setDatosForm({
            ...datosForm, 
            [type]: e.nativeEvent.text
        })
    }
    
    //funcion enviar datos
    const handleSubmit = e => {
        console.log(e)
        login({ variables: { 
            cellphone: datosForm.cellphone, 
            password: datosForm.password
            } 
            
        });
        console.log(data)
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
       
        if(data != undefined || data != null){
            console.log(data.login)
            localStorage.setItem('token', "Token " + data.login.token);
            navigation.navigate("Clientes")
        }
    }
    return (
      <ScrollView centerContent={true} style={styles.viewBody}>
         <Image 
                source={require("../assets/images/logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.ViewContainer}>
                  <Input 
                    placeholder="celular"
                    onChange={handleChange}
                    onChange={(e)=> handleChange(e, "cellphone")}
                    value={datosForm.cellphone}
                    containerStyle={styles.inputForm}
                  />
                  <Input 
                    placeholder="password"
                    onChange={handleChange}
                    onChange={(e)=> handleChange(e, "password")}
                    value={datosForm.password}
                    containerStyle={styles.inputForm}
                  />
                  <Button 
                    title="Iniciar Sesion"
                    containerStyle={styles.btnContainerLogin}
                    buttonStyle={styles.btnLoggin}
                    onPress={()=> handleSubmit()}
                />
                
            </View>
            
            <Divider style={styles.divider} />
            <View style={styles.ViewContainer}>
                <Text>
                    Datos de ingreso usuario - password 
                </Text>
                <Text>
                  +573057199995 - nueva123
                </Text>
            </View>
      </ScrollView>
    );
  }

  


export default function Login(){
    return (
        <h1>
          <ApolloLogin />
        </h1>
    )

}




const styles  = StyleSheet.create({
  viewBody: {
      marginLeft: 30,
      marginRight: 30,
  },
  logo:{
      width: "100%",
      height: 80,
      marginTop: 70
  },
  ViewContainer:{
      marginRight: 40,
      marginLeft: 40
  },
  divider: {
      backgroundColor: "#5b2ad0",
      margin: 40,
  },
  alerta:{
      color: "#e63c3c"
  },
  formContainer:{
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30
  },
  inputForm:{
      width: "100%",
      marginTop: 20
  },
  btnContainerLogin:{
      width: "90%",
      marginTop: 30
  },
  btnLoggin:{
      backgroundColor:"#5b2ad0"
  }
})