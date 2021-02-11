import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, HelperText } from 'react-native-paper'
import api from "../../services/api";

import logo from '../../../assets/logo.png'

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  async function handleLogin(){
    api.post('/auth/login', {email, password}).then(res => {
      const { user, token } = res.data;
      console.log(token)
    }).catch(err => {
      if(err.response){
        setError('Email ou senha invalida')
      }else if(err.request){
        setError('Erro com a conexão com o servidor, tente novamente mais tarde.')
      }else{
        console.log(err)
      }
     
    })
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>GENTILEZA GERA GENTILEZA</Text>
        <Text style={styles.title}>O <Text style={{color: '#FF7C01'}}>TRÂNSITO É</Text> FEITO POR VOCÊ!</Text>
        <Image source={logo} style={{height: 80, width: '100%', resizeMode: 'contain',}} />
      </View>
      <View style={styles.form}>
        <Text type="error" visible={true} >{error}</Text>
        <TextInput
          style={styles.inputText}  
          label="Email"
          value={email}
          onChangeText={ text => setEmail(text)} />
        <TextInput
          style={styles.inputText}
          label="Senha"
          value={password}
          onChangeText={ text => setPassword(text)} />
        <Button style={styles.buttonSubmit} mode="contained" color="#FF7C01" onPress={handleLogin}>
          Login
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#FF7C01'}} onPress={() => navigation.navigate('Register')} >Criar uma nova conta</Text>
      </View>
    </View>
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
  title:{
    fontSize: 36,
    color: '#0D0C0B',
    fontWeight: 'bold'
  },
  inputText:{
    marginBottom: 15
  },
  buttonSubmit:{
    height: 56,
    alignContent: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: 20
  }
})