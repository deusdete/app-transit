import React, {
  useReducer,
  useEffect,
  useMemo,
  useRef,
  createContext,
} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeStack from "./HomeStack";
// import DestinationsStack from "./DestinationsStack";
// import DashboardStack from "./DashboardStack";
// import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";

import api from "../services/api";
import AuthContext from "../services/AuthContext";
import AuthStack from "./AuthStack";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  // const navigation = useNavigation()
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SET_LOADING":
          return {
            ...prevState,
            isLoading: true,
            isError: false,
            error: "",
          };
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoggedIn: action.isLoggedIn,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            error: "",
            isLoggedIn: true,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoggedIn: false,
          };
        case "SET_ERROR":
          return {
            ...prevState,
            isError: true,
            error: action.error,
          };
        case "CLEAR_ERROR":
          return {
            ...prevState,
            isError: false,
            error: "",
          };
      }
    },
    {
      isError: false,
      error: "",
      isLoading: false,
      isSignout: false,
      isLoggedIn: false,
      userToken: null,
    }
  );

  useEffect(() => {
  
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      } catch (e) {
        console.log(e);
      }

      console.log("RESTORE_TOKEN", userToken);
      if (!userToken) {
        dispatch({ type: "RESTORE_TOKEN", token: null, isLoggedIn: false });
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken, isLoggedIn: true });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        api
          .post("/auth/login", { email, password })
          .then(async (res) => {
            const { token } = res.data;
            await AsyncStorage.setItem("userToken", token);
            dispatch({ type: "SIGN_IN", token: token });
            console.log("signIn Done.", token);
          })
          .catch((err) => {
            dispatch({ type: "SET_ERROR", error: "Email ou senha invalida" });
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          // remove error
          console.log("Erro ao remover token: ", e);
        }

        console.log("SignOut Done.");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (username, email, password, confirmPassword) => {
        api
          .post("/auth/register", { username, email, password, confirmPassword })
          .then(async (res) => {
            ;
            console.log("signUp Done.");
          })
          .catch((err) => {
            console.log("err Done.", err);
            dispatch({ type: "SET_ERROR", error: "Email ou senha invalida" });
          });


      },
      state,
    }),
    []
  );

  console.log("state", state);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            // aqui vamos colcoar o Analytics

            // The line below uses the expo-firebase-analytics tracker
            // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
            // Change this line to use another Mobile analytics SDK
            // await Analytics.setCurrentScreen(
            //   currentRouteName,
            //   currentRouteName
            // );

          }

          routeNameRef.current = currentRouteName;
        }}
      >
        {state.userToken == null ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
            <Stack.Screen name="Register" options={{headerShown: false}}  component={Register} />
          </Stack.Navigator>
        ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = "";

                  if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                  } else if (route.name === "Mapa") {
                    iconName = focused ? "location" : "location-outline";
                  } else if (route.name === "Quiz") {
                    iconName = focused ? "chatbox" : "chatbox-outline";
                  } else if (route.name === "Perfil") {
                    iconName = focused
                      ? "person-circle"
                      : "person-circle-outline";
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: "#556cd6",
                inactiveTintColor: "gray",
              }}
            >
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Mapa" component={HomeStack} />
              <Tab.Screen name="Quiz" component={HomeStack} />
              <Tab.Screen name="Perfil" component={HomeStack} />
            </Tab.Navigator>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
