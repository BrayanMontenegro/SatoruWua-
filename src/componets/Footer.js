import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#003153', '#00008B']} // Gradiente de rojo
      style={styles.gradient}
    >
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Gale')}>
          <Ionicons name="home" size={30} color="#fff" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Vete')}>
        <FontAwesome5 name="cat" size={30} color="#fff" />
        <Text style={styles.navText}>Veterinaria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Graf')}>
          <Ionicons name="bar-chart" size={30} color="#fff" />
          <Text style={styles.navText}>Graficos</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    paddingVertical: 5,
    borderTopWidth: 2,
    borderTopColor: '#ffffff',
  },
  navButton: {
    alignItems: 'center',
    padding: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Footer;
