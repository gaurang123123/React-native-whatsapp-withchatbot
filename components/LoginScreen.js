import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react'
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'


const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    if(loading){
        return  <View style={{alignContent:'center',justifyContent:'center',marginTop :"80%"}}>
        <ActivityIndicator size={150} color="blue" />
        </View>
    }
    const userLogin = async ()=>{
        setLoading(true)
        if(!email || !password){
               alert("Please add all the fields.")
               return 
        }
        try{
          const result =  await auth().signInWithEmailAndPassword(email,password)
          console.log(result);
            setLoading(false)
        }catch(err){
            alert("Something went wrong Try again.")
            setLoading(false);
        }
       

    }
  return (
    <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
                <Text style={{fontSize : 20,fontWeight : '500' ,fontStyle : 'italic' ,margin : "5%"}}>Login To Continue</Text>
                <Image style={styles.img} source={require('../assets/wlogo.jpg')} />
            </View>
            <View style={styles.box2}>
                
                <>
                 <TextInput
                 label="Email"
                 value={email}
                 onChangeText={(text)=>setEmail(text)}
                 mode="outlined"
                />
                <TextInput
                 label="password"
                 mode="outlined"
                 value={password}
                 onChangeText={(text)=>setPassword(text)}
                 secureTextEntry
                />
                </>
                <Button
                mode="contained"
                onPress={()=>userLogin()}
                >Login To Continue</Button>

              <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}><Text style={{textAlign:"center"}}>Don't have an account ?</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    
   
  )
}
const styles = StyleSheet.create({
    text:{
        fontSize:22,
        color:"green",
        margin:10
    },
    img:{
        width:200,
        height:200
    },
    box1:{
        alignItems:"center"
    },
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        height:"50%"
    }
 });
export default LoginScreen