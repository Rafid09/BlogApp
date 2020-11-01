import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {View,StyleSheet,ImageBackground} from 'react-native'
import { AuthContext } from '../providers/AuthProvider'
import { Header} from 'react-native-elements'
import { FontAwesome,Ionicons,AntDesign,Feather } from '@expo/vector-icons'
import { Avatar} from "react-native-elements"
import { Title, Caption, Text } from 'react-native-paper'


const ProfileScreen =({navigation})=>{
    return(
         <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <Header
                    containerStyle={{
                    backgroundColor: 'goldenrod',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Profile', style: {fontSize:20, color: 'white' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}/>}
                    />
                
                    <ImageBackground 
                    source={require('./../../assets/inception2.jpg')} 
                    style={{height:250,width:360}}>
                        <View style={{paddingHorizontal:100,paddingVertical:185}}>
                            <Avatar
                    rounded 
                    size={160}
                    source={{
                        uri:'https://free4kwallpapers.com/uploads/originals/2015/11/28/leonardo-dicaprio-in-inception-wallpaper.jpg',
                    }}
                    />
                        </View>
                    </ImageBackground>
                    
                    <View style={{alignItems:'center',marginTop:90,marginBottom:10}}>
                    <Title style={styles.title}>{auth.currentUser.name}</Title>
                    <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                    </View>
                
                <View style={{
                    marginTop:10,
                    paddingHorizontal:75,
                    marginBottom:25,}}>   
                <View style={styles.row}>
                    <Feather name="map-pin" size={25} color="#777777" />
                    <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.location==null?"Circklewood, London, UK":"Stays at "+auth.currentUser.location}</Text>
                </View>
                <View style={styles.row}>
                   <FontAwesome name="birthday-cake" size={25} color="#777777" />
                    <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.bday==null?"18 October, 1984":"Born on "+auth.currentUser.bday}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome name="institution" size={25} color="#777777" />
                    <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.works==null?"Bentley Motors Limited":"Works at "+auth.currentUser.works}</Text>
                </View>
                </View>        
            </View>)}
        </AuthContext.Consumer>
        
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    userInfo:{
        paddingHorizontal:10,
    },
    title:{
        fontSize:24,
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        fontWeight:'500',
    },
    row:{
        flexDirection:'row',
        marginBottom:0,
    },
    
})

export default ProfileScreen;