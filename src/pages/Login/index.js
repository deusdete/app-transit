import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from 'react-native-paper'
import api from "../../services/api";

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
        <Text style={styles.title}>Gentileza gera gentileza</Text>
        <Text>O transito é feito para você!</Text>
      </View>
      <View>
        <Text type="error" visible={true} >{error}</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={ text => setEmail(text)} />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={ text => setPassword(text)} />
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
      </View>
      <View>
        <Text onPress={() => navigation.navigate('Register')} >Criar uma nova conta</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 16
  },
  boxTitle: {
    marginBottom: 20
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold'
  }
})