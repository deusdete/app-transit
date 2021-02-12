import React, { useState, useEffect  } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity,ScrollView, Alert } from 'react-native';
import { TextInput, Checkbox, Chip, Divider, IconButton, Colors } from 'react-native-paper';
import {Camera} from 'expo-camera'

let camera = Camera

import map from '../../../assets/mapTest.jpeg';

export default function ReportAccident() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');

  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const __startCamera = async () => {
    const {status} = await camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {}
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

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
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
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

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
