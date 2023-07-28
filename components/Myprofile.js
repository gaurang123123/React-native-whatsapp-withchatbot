import React,{useState,useEffect} from 'react'
import { Text,View,FlatList,StyleSheet,TouchableOpacity, } from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  Contacts  from 'react-native-contacts';
import { useIsFocused,navigation } from '@react-navigation/native';
const Myprofile = ({navigation}) => {
    const [mycontacts,setMycontacts] = useState();
    const isfocused = useIsFocused();
    const getAllContacts =  () =>{
       
       
            request(PERMISSIONS.ANDROID.READ_CONTACTS).then((result) => {
              // …
              console.log(result)
              if(result === 'granted')
              {
                Contacts.getAll()
                .then((contacts) => {
                    console.log(contacts);
                    setMycontacts(contacts)
                })

              }
            });
         
    }
    useEffect(()=>{
     getAllContacts()
    },[])
  return (
    <View>
        <Ionicons name="add-circle"
        size={63}
        color={"green"}

        />
    <TouchableOpacity onPress={()=>{navigation.navigate('Create Contacts')}}>
        <Text>Create a contact</Text>
    </TouchableOpacity>
    </View>

  )
}

export default Myprofile