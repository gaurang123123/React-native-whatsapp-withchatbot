import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FAB} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = ({user, navigation}) => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const querySanp = await firestore()
      .collection('users')
      .where('uid', '!=', user.uid)
      .get();
    const allusers = querySanp.docs.map(docSnap => docSnap.data());
    //  console.log(allusers)
    setUsers(allusers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatRoom', {
            name: item.name,
            uid: item.uid,
            status:
              typeof item.status == 'string'
                ? item.status
                : item.status.toDate().toString(),
          });
        }}>
        <View style={styles.mycard}>
          <Image source={{uri: item.pic}} style={styles.img} />
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
   <>
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return <RenderCard item={item} />;
        }}
        keyExtractor={item => item.uid}
      />
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Girlchatscreen', {
                name: "Gia",
                uid: 12,
                status: "Online"
              });
          }}>
          <View style={styles.mycard}>
            <Image source={require('../assets/gia.jpeg')} style={styles.img} />
            <View>
              <Text style={styles.text}>Gia</Text>
              <Text style={styles.text}>Hey'I am using Whatsapp</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
            navigation.navigate('Girlchatscreen', {
                name: "Mia",
                uid: 12,
                status: "Online"
              });
          }}>
        <View style={styles.mycard}>
          <Image source={require('../assets/mia.jpeg')} style={styles.img} />
          <View>
            <Text style={styles.text}>Mia</Text>
            <Text style={styles.text}>Hey'I am using Whatsapp</Text>
          </View>
        </View>
        </TouchableOpacity>
       
        <TouchableOpacity   onPress={() => {
            navigation.navigate('Chatgpt')
          }}>
        <View style={styles.mycard}>
          <Image
            source={require('../assets/sumaiyaa.jpeg')}
            style={styles.img}
          />
          <View>
            <Text style={styles.text}>sumaiyaa</Text>
            <Text style={styles.text}>Hey'I am using Whatsapp</Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
            navigation.navigate('Girlchatscreen', {
                name: "nancy",
                uid: 12,
                status: "Online"
              });
          }}>
        <View style={styles.mycard}>
          <Image source={require('../assets/nancy.jpeg')} style={styles.img} />
          <View>
            <Text style={styles.text}>nancy</Text>
            <Text style={styles.text}>Hey'I am using Whatsapp</Text>
          </View>
        </View>
        </TouchableOpacity>
       
      </>
      
    </View>
    <View style={styles.fab}>
        <TouchableOpacity onPress={()=>navigation.navigate("My Profile")}>

        <Ionicons  size={60} name="person"/>

        </TouchableOpacity>

      </View>
   </>
  );
};

const styles = StyleSheet.create({
  img: {width: 55, height: 55, borderRadius: 30, backgroundColor: 'green'},
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  mycard: {
    flexDirection: 'row',
    margin: 3,
    padding: 4,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  fab: {
    position: 'absolute',
    marginTop: '0%',
    flex: 1,
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});

export default Dashboard;
