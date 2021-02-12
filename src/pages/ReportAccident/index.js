import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Checkbox, Chip, Divider, IconButton, Colors } from 'react-native-paper';

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
    <View style={{ flex: 1 }}>
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
    <ScrollView style={styles.container}>
      <View><Image source={map} style={styles.map} /></View>
      <View style={styles.form}>
        <Text style={styles.title}>Registrar acidente</Text>
        <Divider />
        <View >
          <View style={styles.location}>
            <IconButton
              icon="map-marker"
              color={Colors.red500}
              size={25}
              onPress={() => console.log('Pressed')}
            />
            <Text style={{ fontSize: 16 }}>Av. Caixangá</Text>
          </View>
        </View>

        <View style={styles.horizontal}>
          <View style={styles.location}>
            <IconButton
              icon="calendar"
              color={Colors.red500}
              size={25}
              onPress={() => console.log('Pressed')}
            />
            <Text style={{ color: '#F05537' }}> 12/02/2020</Text>
          </View>
          <View style={styles.location}>
            <IconButton
              icon="clock-outline"
              color={Colors.red500}
              size={25}
              onPress={() => console.log('Pressed')}
            />
            <Text style={{ color: '#F05537' }}>12:35</Text>
          </View>


        </View>
        <Divider />
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={[styles.topic, { marginLeft: 0 }]}>Quais foram os envolvidos?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Chip mode="outlined" style={styles.chip}>Carro</Chip>
            <Chip mode="outlined" style={styles.chip}>Moto</Chip>
            <Chip mode="outlined" style={styles.chip}>Biciclera</Chip>
            <Chip mode="outlined" style={styles.chip}>Pedestre</Chip>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={[styles.topic, { marginLeft: 0 }]}>Houve mortes?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
            <Chip mode="outlined" style={styles.chip}>Sim</Chip>
            <Chip mode="outlined" style={styles.chip}>Não</Chip>
            <Text style={{ color: '#F05537' }}>Apenas feridos</Text>
          </View>
        </View>
        <Divider />
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
          <View style={{ marginTop: 10 }}>
            <Text style={styles.description}>Adicionar foto</Text>
            <Text>Input File</Text>
          </View>
        </View>
        <Button title="Confirmar" type="submit" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7'
  },
  map: {
    width: '100%',
    height: 200,
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    borderColor: "#F05537"
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
    marginBottom: 10,
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
