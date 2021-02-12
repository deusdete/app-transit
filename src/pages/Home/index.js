import React, { useState, useEffect, useRef, useContext } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { View, Button, ScrollView, Platform, StyleSheet } from 'react-native';
import { Title, Text, Caption, FAB   } from 'react-native-paper'
import AuthContext from '../../services/AuthContext'
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function Home() {
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    console.log('state',state)
  },[])

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={{...styles.card, backgroundColor: '#F05537'}}>
        <Title style={styles.cardTitle}>Olá! Marcos</Title >
        <Text style={styles.cardText}>Motorista consciente sempre termina o dia bem.</Text>
      </View>
      <View style={{...styles.card, backgroundColor: '#ffb22a'}}>
        <Title style={styles.cardTitle}>Campanha</Title >
        <Caption style={{color: "#fff"}}>últimas campanha</Caption>
        <Text style={styles.cardText}>Percebão risco. Proteja a vida Maio Amarelo 2020</Text>
      </View>
      <View style={{...styles.card, backgroundColor: '#696969'}}>
        <Title style={styles.cardTitle}>Notícias</Title >
        <Caption style={{color: "#fff"}}>últimas campanha</Caption>
        <Text style={styles.cardText}>Acidente de moto deixa dois mortos em Camaragire</Text>
      </View>
      <View style={styles.containerRegistros}>
        <Text style={{color: '#696969', fontSize: 16}}>Acidentes registrado em Pernambuco</Text>
        <View style={styles.cardRegistros}>
          <View style={{...styles.boxRegistros,  borderRightWidth: 1, borderRightColor: '#69696950'}}>
            <Title style={styles.textRegistros}>42.102</Title>
            <Caption>Total de</Caption>
            <Caption>acidentes</Caption>
            <Caption>terrestre</Caption>
          </View>
          <View style={{...styles.boxRegistros, borderRightWidth: 1, borderRightColor: '#69696950'}}>
            <Title style={styles.textRegistros}>29.962</Title>
            <Caption>Acidentes de</Caption>
            <Caption>motocicletas</Caption>
          </View>
          <View style={styles.boxRegistros}>
            <Title style={styles.textRegistros}>8.8695</Title>
            <Caption>Total na</Caption>
            <Caption>sua cidade</Caption>
          </View>
        </View>
      </View>
    </ScrollView>
    <FAB
      style={styles.fab}
      small
      icon="plus"
      onPress={() => navigation.navigate('ScreenReport')}
    />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 6,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardText: {
    color: '#fff',
  },
  containerRegistros: {
    marginTop: 15
  },
  cardRegistros: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#69696950',
    borderRadius: 5,
    marginTop: 10
  },
  boxRegistros: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    
  },
  textRegistros:{
    fontSize: 24,
    flex: 0.8, 
    flexWrap: 'wrap',
    color: '#F05537'
  },
  fab: {
    flex: 1,
    position: 'absolute',
    color: '#F05537',
    justifyContent: 'center',
    margin: 15,
    right: 0,
    bottom: 0,
  },
})

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
