import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';
import { Title, Text, Button } from 'react-native-paper';

import bg from '../../../assets/images/p1.png'

export default function ScreenReport() {
  const navigation = useNavigation();
  return (
    <View style={styles.container} >
      <View style={styles.image}>
        <Image source={bg} style={{ height: 144, width: 113 }} />
      </View>
      <View>
        <Text style={styles.text}>
          Este é um canal único e exclusivo para juntos contruirmos uma cidade melhor.
          Aqui você pode reportar uma infração ou registrar um acidente.
          </Text>
        <Text style={styles.text}>
          Este é um canal único e exclusivo para juntos contruirmos uma cidade melhor.
          Aqui você pode reportar uma infração ou registrar um acidente.
          </Text>
      </View>
      <View>
        <Title style={styles.title}>O que você deseja fazer?</Title>
      </View>
      <View>
        <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('ReportAccident')}>
          Reportar um acidente
          </Button>
        <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('ReportInfringement')}>
          Reportar uma infração
          </Button>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 16,
  },
  image: {
    marginBottom: 30,
    alignSelf: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  },
  button: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    height: 56,
    backgroundColor: '#F05537'
  }
})

