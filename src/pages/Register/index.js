import React, {useState} from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper'
import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){
    api.post('/auth/register', {name, age, location, type, email, password}).then(res => {
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
          label="Nome"
          value={name}
          onChangeText={ text => setName(text)} />
        <TextInput
          label="Idade"
          value={age}
          onChangeText={ text => setAge(text)} />
        <TextInput
          label="Endereço"
          value={location}
          onChangeText={ text => setLocation(text)} />
        <TextInput
          label="Tipo de usuário"
          value={type}
          onChangeText={ text => setType(text)}/>
        <TextInput
          label="Email"
          value={email}
          onChangeText={ text => setEmail(text)} />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={ text => setPassword(text)} />
        <Button mode="contained" onPress={handleLogin}>
          Criar
        </Button>
      </View>
    </View>
  );
}
