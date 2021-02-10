import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text } from "react-native";
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
    <View>
      <Text>Login</Text>
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
