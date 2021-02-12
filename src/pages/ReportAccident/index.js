import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';

import map from '../../../assets/mapTest.jpeg';

export default function ReportAccident() {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');

  const hr = (marginHorizontal) => (
    <View
      style={{
        borderBottomColor: '#696969',
        borderBottomWidth: 1,
        marginHorizontal
      }}
    />
  );

  const checkboxSection = (label) => (
      <View style={{flex:1}}>
      <Checkbox.Item
        label={label}
        labelStyle={styles.checkboxLabel}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
      </View>
  );

  return (
    <View style={styles.container}>
      <View><Image source={map} style={styles.map} /></View>
      <View style={styles.form}>
        <Text style={styles.title}>Registrar acidente</Text>
        { hr(0) }
        <View style={[styles.fields, {fontSize: 20}]}>
          <Text>Local do acidente</Text>
          <View style={styles.horizontal}>
            <Text>Data do acidente</Text>
            <Text>Horário do acidente</Text>
          </View>
        </View>
        { hr(15) }
        <View style={{paddingHorizontal: 15}}>
          <Text style={[styles.topic, {marginLeft: 0}]}>Quais foram os envolvidos?</Text>
          <View style={{flexDirection:'row', marginLeft:-10}}>
            { checkboxSection('Carro') }
            { checkboxSection('Moto') }
          </View>
          <View style={{flexDirection:'row', marginLeft:-10}}>
            { checkboxSection('Bicicleta') }
            { checkboxSection('Pedestre') }
          </View>
        </View>
        { hr(15) }
        <View style={styles.fields}>
          <View>
            <Text style={styles.description}>O que aconteceu?</Text>
            <TextInput
              style={styles.inputText}
              label="O que aconteceu?"
              value={text}
              onChangeText={text => setText(text)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.description}>Adicionar foto</Text>
            <Text>Input File</Text>
          </View>
        </View>
        <Button title="Confirmar" type="submit"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#f7f7f7'
  },
  map: {
    width: '100%',
    height: 200,
  },
  form: {
    backgroundColor: '#f7f7f7',
  },
  title: {
    color: '#696969',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  topic: {
    color: '#696969',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 15
  },
  horizontal: {
    flexDirection: 'row',
  },
  fields: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  checkboxLabel: {
    color: '#696969',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputText: {
    height: 80,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    borderWidth: 1,
  }
});
