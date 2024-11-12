import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen"; 
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import Graficos from "./src/componets/Graficos";
import Veterinaria from "./src/componets/Veterinaria";
import Galeria from "./src/componets/Galeria";


SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  // Cargar las fuentes usando el hook `useFonts`
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Carga cualquier recurso necesario aquí (fuentes, datos, etc.)
        if (fontsLoaded) {
          setAppIsReady(true); // Marcar la aplicación como lista cuando las fuentes estén cargadas
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Ocultar la pantalla de splash una vez que la aplicación esté lista
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // No renderizamos nada hasta que la app esté lista
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Gale">
        <Stack.Screen
          name="Graf"
          component={Graficos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vete"
          component={Veterinaria}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gale"
          component={Galeria}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
     
     
  );
};

export default App;

