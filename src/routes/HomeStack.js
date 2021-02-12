import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors, Button, Paragraph, Dialog, Portal } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../pages/Home";

import Context from "../services/AuthContext";

const Stack = createStackNavigator();

export default function HomeStack() {
  const { signOut, state } = useContext(Context);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleSignOut = () => {
    signOut();
    hideDialog();
  };


  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (<Ionicons
            name="exit"
            color={Colors.grey600}
            size={20}
            onPress={() => showDialog()}
            style={{ marginRight: 10 }}
          />),
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "Inicio",
          }}
        />
      </Stack.Navigator>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Sing-out</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Sair da sua conta?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button focusable onPress={hideDialog}>
              Não
            </Button>
            <Button focusable onPress={handleSignOut}>
              Sair
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}