import React, {useState} from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper'
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){
    api.post('/auth/login', {email, password}).then(res => {
      const [ user, token ] = res.data;
      console.log(token)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <View>
      <Text>Login</Text>
      <View>
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
    </View>
  );
}
