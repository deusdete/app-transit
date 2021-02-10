import React, {useState} from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){
    console.log({email,password})
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
