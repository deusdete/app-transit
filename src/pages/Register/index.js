import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from 'react-native-paper'
import api from "../../services/api";

export default function Register() {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        
      </View>
      <View>
        <TextInput
          style={styles.inputText}
          label="Nome"
          value={name}
          onChangeText={ text => setName(text)} />
        <TextInput
          style={styles.inputText}
          label="Idade"
          value={age}
          onChangeText={ text => setAge(text)} />
        <TextInput
          style={styles.inputText}
          label="Endereço"
          value={location}
          onChangeText={ text => setLocation(text)} />
        <TextInput
          style={styles.inputText}
          label="Tipo de usuário"
          value={type}
          onChangeText={ text => setType(text)}/>
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
          Criar conta
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#FF7C01'}} onPress={() => navigation.navigate('Login')} >Ja tem uma conta?</Text>
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
