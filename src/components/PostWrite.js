import React,{useState} from 'react';
import { View } from 'react-native';

import { Card, Button ,Input} from 'react-native-elements';
import { storeDataJSON} from '../functions/AsyncStorageFunctions';
import moment from 'moment';
import { Entypo} from '@expo/vector-icons';

import * as firebase from "firebase";
import "firebase/firestore";

function ShowCurrentDate() {
      var date = new moment().format('DD MMM YYYY');
      return date;
}


const PostWrite=({user})=>{
    const [post, setPost] = useState("");
    const input = React.createRef();
    return(
        <Card>
        <Input
            placeholder="What's On Your Mind?"
            leftIcon={<Entypo name="pencil" size={24} color="black" />}
            on onChangeText={(currentInput)=>{
                setInput(currentInput)
            }}
        />
        <Button title="Post" type="outline" 
        titleStyle={{color: "#1c1c1c"}}
        onPress={function () {
            if(input == ""){
                alert("Filed is Empty!");
            }else{
                setLoading(true);
                firebase.firestore().collection('posts').add({
                    userId: auth.CurrentUser.uid,
                    body: input,
                    author: auth.CurrentUser.displayName,
                    created_at: firebase.firestore.Timestamp.now(),
                    likes: [],
                    comments: [],
                }).then(() => {
                    setLoading(false);
                    alert("Post was created successfully!")
                    alert(posts.id)
                }).catch((error) => {
                    setLoading(false);
                    alert(error);
                });
            }
        }} />
    </Card>
    );
    
};


export default PostWrite;