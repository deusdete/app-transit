import * as React from "react";
import { View } from 'react-native'
import { Avatar, Button, Card, Title, Text,  Caption, Paragraph } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function CardAccident({image, description, location}) {
  console.log('image', image)
  return (
    <Card style={{width: 150, marginRight: 5}}>
      <Card.Cover source={{ uri: image }} />
      <Card.Content>
        <View>
          <Text style={{marginVertical: 10}}>{location}</Text>
          <Paragraph>12/02/2020</Paragraph>
        </View>
        {/* <Caption>{description}</Caption> */}
      </Card.Content>
      {/* <Card.Actions>
        <Button>Ver detalhe</Button>
      </Card.Actions> */}
    </Card>
  );
}
