import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Button,
  StyleSheet,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import 'react-native-gesture-handler';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatScreen from './components/ChatScreen';
import firestore from '@react-native-firebase/firestore';
import AccountScreen from './components/AccountScreen';
import Girlchatscreen from './components/Girlchatscreen';
import Chatgpt from './components/chatgpt';
const Stack = createStackNavigator();

const App = ({navigation}) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) 
      {
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:"online"
        })
        setUser(userExist);

      }
      else setUser('');
    });
    return () => {
      // console.log(user.uid)
      firestore().collection('users')
        .doc(user.uid)
        .update({
          status:"Offline"
        })
        unregister();
        console.log("offline")
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'green',
        }}>
        {user ? (
          <>
            <Stack.Screen
              name="HomePage"
              options={{
                headerRight: () => (
                  <View style={{flex : 1,flexDirection:'row'}}>
<MaterialCommunityIcons
                    name="logout"
                    color="green"
                    size={34}
                    style={{marginRight: 10}}
                    onPress={() => {
                      firestore().collection('users')
                      .doc(user.uid)
                      .update({
                        status:firestore.FieldValue.serverTimestamp()
                      }).then(()=>auth().signOut())  
                    }}
                  />
                  <Ionicons
                    name="person"
                    color="green"
                    size={34}
                    style={{marginRight: 10}}
                    onPress={() => {
                    }}
                  />
                  </View>
                  
                ),
              }}>
              {props => <Dashboard {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="ChatRoom"
              options={({route}) => ({
                title: (
                  <View>
                    <Text style={{fontWeight:"800",fontSize:20}}>{route.params.name}</Text>
                    <Text>{route.params.status}</Text>
                  </View>
                ),
              })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="My Profile">
              {props => <AccountScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Girlchatscreen"
              options={({route}) => ({
                title: (
                  <View>
                    <Text style={{fontWeight:"800",fontSize:20}}>{route.params.name}</Text>
                    <Text>{route.params.status}</Text>
                  </View>
                ),
              })}>
              {props => <Girlchatscreen />}
            </Stack.Screen>
            <Stack.Screen name="Chatgpt" component={Chatgpt} />
            
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}

        {/* <Stack.Screen name="Profile" component={Profile} />
    
      <Stack.Screen name="Create Contacts" component={CreateContact} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const style = StyleSheet.create({
  your: {
    margin: '10%',
  },
});
export default App;
