// src/Database/Firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJgqSlaLQHQaduRpx91LQDz-2WboYyyqM",
  authDomain: "jujutsu-510d1.firebaseapp.com",
  projectId: "jujutsu-510d1",
  storageBucket: "jujutsu-510d1.appspot.com",  // Asegúrate de que el storageBucket esté correcto
  messagingSenderId: "20692098873",
  appId: "1:20692098873:web:636fe1a3b406a53b8f92e8",
  measurementId: "G-NX86GTSJKK"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth con persistencia para React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Firebase Storage
const storage = getStorage(app);

// Exporta los objetos para su uso en otras partes de la aplicación
export { db, auth, storage };
