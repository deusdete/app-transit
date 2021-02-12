import React, { useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Platform } from "react-native";
import { TextInput, Button, HelperText } from 'react-native-paper'
import AuthContext from '../../services/AuthContext'

import logo from '../../../assets/logo.png'

export default function Login() {
  const navigation = useNavigation();
  const { signIn, state } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  async function handleLogin() {
    signIn( email, password ).then(res => {
      console.log(res)
    }).catch(err => {
      if (err.response) {
        setError('Email ou senha invalida')
      } else if (err.request) {
        setError('Erro com a conexão com o servidor, tente novamente mais tarde.')
      } else {
        console.log(err)
      }

    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>GENTILEZA GERA GENTILEZA</Text>
        <Text style={styles.title}>O <Text style={{color: '#FF7C01'}}>TRÂNSITO É</Text> FEITO POR <Text style={{color: '#FF7C01'}}>VOCÊ!</Text></Text>
        <Image source={logo} style={{height: 80, width: '100%', resizeMode: 'contain', marginTop: 10}} />
      </View>
      <View style={styles.form}>
        <Text type="error" visible={true} style={{ marginBottom: 10, color: '#ff401c' }} >{error}</Text>
        <TextInput
          style={styles.inputText}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)} />
        <TextInput
          style={styles.inputText}
          label="Senha"
          value={password}
          onChangeText={text => setPassword(text)} />
        {state.isLoading ? (
          <ActivityIndicator
            focusable
            animating={true}
            size="small"
            color={Colors.blue900}
          />
        ) : (
            <Button style={styles.buttonSubmit} mode="contained" color="#FF7C01" onPress={handleLogin}>
              Login
            </Button>)
        }
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#FF7C01', marginBottom: 10}} onPress={() => navigation.navigate('Register')} >Criar uma nova conta</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7'
  },
  boxTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    color: '#0D0C0B',
    fontWeight: 'bold',
    marginVertical: 10, 
  },
  inputText: {
    marginBottom: 15
  },
  buttonSubmit: {
    height: 56,
    alignContent: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: 20
  }
})