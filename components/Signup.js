import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react'
import { TextInput,Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
const Signup = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [uploading,setUploading] = useState(false);
    const [image,setImage] = useState(null)
    const [showNext,setShowNext] = useState(false)
    const [loading,setLoading] = useState(false)
    if(loading){
        return  <View style={{alignContent:'center',justifyContent:'center',marginTop :"80%"}}>
        <ActivityIndicator size={150} color="blue" />
        </View>
    }
    const userSignup = async ()=>{
        setLoading(true)
        if(!email || !password || !image|| !name){
               alert("Please add all the field")
               return 
        }
        try{
          const result =  await auth().createUserWithEmailAndPassword(email,password)
            firestore().collection('users').doc(result.user.uid).set({
                name:name,
                email:result.user.email,
                uid:result.user.uid,
                pic:image,
                status:"online"
            })  
            setLoading(false)
        }catch(err){
            alert("Something went wrong or User Already Exists.")
            setLoading(false);
        }
       

    }
    const pickImageAndUpload = ()=>{
        request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((result) => {
            if(result == 'granted')
            {
                    launchImageLibrary({quality:0.5},(fileobj)=>{
                        setUploading(true)
console.log(fileobj.assets[0].uri);
            
         const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
                 (snapshot) => {
  
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) alert('image uploaded')
                    
                }, 
                (error) => {
                    alert("error uploading image")
                    setUploading(false);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setImage(downloadURL)
                    setUploading(false);
                    });
                }
                );
        })
            }
            console.log(result)
         });
     
    }
  return (
    <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to Whatsapp 5.0</Text>
                <Text style={{fontSize : 20,fontWeight : '500' ,fontStyle : 'italic' ,margin : "5%"}}>Signup To Continue</Text>

                <Image style={styles.img} source={require('../assets/wlogo.jpg')} />
            </View>
            <View style={styles.box2}>
                {!showNext && 
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
                }
               
               {showNext ?
                <>
                 <TextInput
                 label="Name"
                 value={name}
                 onChangeText={(text)=>setName(text)}
                 mode="outlined"
                />
                {uploading ? <ActivityIndicator color="blue" size="large"/> : null}
                <Button
                mode="contained"
                onPress={()=>{pickImageAndUpload()}}
                >select profile pic</Button>
                <Button
                mode="contained"
                disabled={image?false:true}
                onPress={()=>userSignup()}
                >Signup
                
                </Button>
                </>
                :
                 <Button
                mode="contained"
                onPress={()=>setShowNext(true)}
                >Next</Button>
                }

              <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{textAlign:"center"}}>Already have an account ?</Text></TouchableOpacity>
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
export default Signup