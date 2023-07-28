import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Msg = ({incomingMsg, sentMsg, msg}) => {
  return (
    <View>
      {incomingMsg && (
        <View style={styles.incomingMsgBox}>
          <Text style={styles.incomingMsgText}>{msg}</Text>
          <Text style={{fontSize : 12}}>{new Date().toLocaleTimeString()}</Text>
        </View>
      )}
      {sentMsg && (
        <Text style={styles.sentMsgBox}>
          <Text style={styles.sentMsgText}>{msg}</Text>
          <Text style={{fontSize : 12}}>{new Date().toLocaleTimeString()}</Text>
        </Text>
      )}
    </View>
  );
};

export default Msg;
