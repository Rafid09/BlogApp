import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground,StyleSheet, Text, View } from 'react-native'
import { Card,Input, Button } from 'react-native-elements'
import { AntDesign,MaterialIcons  } from '@expo/vector-icons'
import {AuthContext} from './../providers/AuthProvider'
import {getDataJSON} from './../functions/AsyncStorageFunctions'
import * as Animatable from 'react-native-animatable'

const LoginScreen =(props)=> {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("")
    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container} >
                <StatusBar
                hidden={true}
                backgroundColor="lightblue"
                barStyle="light-content"/>
                <ImageBackground
                style={styles.image}
                source={require('./../../assets/inception4.jpg')}>
                <Text style={styles.text}>INCEPTION</Text>
                <Animatable.View animation="fadeInUpBig" delay={4}>
                    <Card containerStyle={styles.card} >
                    <Card.Title style={{fontSize:20}}>Log In</Card.Title>
                    <Card.Divider />
                    <Input
                    leftIcon={<MaterialIcons name="mail-outline" size={20} color="black"/>}
                    placeholder="E-mail Address"
                    onChangeText={function (input) {
                    setEmail(input)
                }}/>
                    <Input 
                    leftIcon={<MaterialIcons name="vpn-key" size={20} color="black"/>}
                    placeholder="Password" 
                    secureTextEntry={true} 
                    onChangeText={function (input) {
                    setPassword(input)
                }}/>
                    <Button
                    icon={<AntDesign name="login" size={20} color="white" />}
                    titleStyle={{paddingLeft:12}}
                    title="Log In!"
                    type="solid"
                    color= "goldenrod"
                    onPress={async ()=>{
                        if(email.length!=0 && password.length!=0)
                        {
                            let user= await getDataJSON(email);
                            if(user.password==password)
                            {
                                auth.setisLogged(true);
                                auth.setcurrentUser(user);
                            }
                            else
                                alert("Login credentials Invalid"); 
                        }else
                            alert("Please Enter Login Credentials"); 
                    }}
                    />
                    <Button
                    type="clear"
                    title="Don't have an account?"
                    onPress={function () {
                        props.navigation.push("Sign Up");
                    }}
                    />
                </Card>
                </Animatable.View>
                
                </ImageBackground>
            </View>)
            }
        </AuthContext.Consumer>
        );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        
    },
    image:{
        flex:1,
        justifyContent: "center",
    },
    text:{
        textAlignVertical: "center",
        textAlign: "center",
        color:"goldenrod",
        fontSize:28,
    },
    card:{
        backgroundColor: "lightgoldenrodyellow",
        borderRadius:0
    }
    
})

export default LoginScreen