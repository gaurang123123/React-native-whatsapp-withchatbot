import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';

const Chatgpt = () => {
    const [data,setData] = useState([]);

    const api = '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';
    const apiurl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textinput,setTextinput] = useState("who are you");
    const handleSend = async()=>{
const prompt =  textinput;
const response = await  axios.post(apiurl,{
    prompt : prompt,
    max_tokens:1024,
    temperature:0.5,

},{
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${api}`
    }
});
const text = response.data.choices[0].text;
console.log(text);
setData(text);
    } 
    useEffect(()=>{
handleSend();
    },[])
  return (
    <View>

      <Text>Chatgpt</Text>
    </View>
  )
}

export default Chatgpt