import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground,StyleSheet, Text, View } from 'react-native'
import { Card,Input, Button } from 'react-native-elements'
import { Ionicons,MaterialIcons,Feather  } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import * as firebase from "firebase";

const SignupScreen =(props)=> {
    let [name,setName]=useState("");
    let [studentID,setStudentID]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [isInvalidEmail,setInvalidEmail]=useState(true);

    const validateEmail=(email)=>{
        var re = /\S+@\S+\.\S+/;
        if(re.test(email)==true)
            setInvalidEmail(false)
        else 
            setInvalidEmail(true)
    }

    return(
        <View style={styles.container}>
            <StatusBar
            hidden={true}
            backgroundColor="blue"
            barStyle="light-content"/>
            <ImageBackground
            style={styles.image}
            source={require('./../../assets/inception4.jpg')}>
            <Text style={styles.text}>INCEPTION</Text>
            <Animatable.View animation="fadeInUpBig" delay={2}>
                         <Card containerStyle={styles.card}>
                <Card.Title style={{fontSize:20}}>Sign Up</Card.Title>
                <Card.Divider />
                <Input 
                leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
                placeholder="Username" 
                onChangeText={function (input) {
                    setName(input);
                }}
                />
                <Input
                keyboardType = 'numeric' 
                leftIcon={<Ionicons name="md-school" size={24} color="black" />}
                placeholder="StudentID" onChangeText={function (input) {
                    setStudentID(input);
                }}/>
                <Input
                leftIcon={<MaterialIcons name="mail-outline" size={24} color="black"/>}
                placeholder="E-mail Address"
                errorStyle={{ color: 'red' }}
                onChangeText={function (input) {
                    setEmail(input);
                    validateEmail(input)
                }}
                errorMessage={isInvalidEmail?"Invalid Email Address":""}
                />
                <Input 
                containerStyle={{paddingBottom:20}}
                leftIcon={<MaterialIcons name="vpn-key" size={24} color="black"/>}
                placeholder="Password" 
                secureTextEntry={true} onChangeText={function (input) {
                    setPassword(input);
                }}
                errorMessage={password.length<4?"Password have to be of 4 characters":""}
                />
                <Button
                icon={<Feather name="user" size={25} color="white" />}
                titleStyle={{paddingLeft:10}}
                title="Sign up!"
                type="solid"
                onPress={
                    function () {
                        if(Name && SID && Password && Email){
                            firebase.auth().createUserWithEmailAndPassword(Email, Password).then((userCreds)=>{
                                userCreds.user.updateProfile({displayName: Name});
                                firebase.firestore().collection('users').doc(userCreds.user.uid).set({
                                    name: Name,
                                    sid: SID,
                                    email: Email,
                                }).then(()=>{
                                    alert("Account created successfully!");
                                    alert(uers.id)
                                    console.log(userCreds.user);
                                    props.navigation.navigate("SignIn");
                                }).catch((error)=>{
                                    alert(error);
                                });
                            }).catch((error)=>{
                                alert(error);
                            })
                        }
                    }
                }
                />
                <Button
                type="clear"
                title="Already have an account?"
                onPress={function () {
                    props.navigation.push("Log In");
                }}
                />
            </Card>
            </Animatable.View>
            </ImageBackground>  
        </View>
        )
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
        fontSize:30,
    },
    card:{
        backgroundColor: "lightgoldenrodyellow",
        borderRadius:2
    }
    
})

export default SignupScreen