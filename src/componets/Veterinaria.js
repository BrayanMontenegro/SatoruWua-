import React, { useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from '../Database/Firebaseconfig';
import { collection, addDoc } from "firebase/firestore";
import Footer from './Footer';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_700Bold,
  } from "@expo-google-fonts/montserrat";
  

const Veterinaria = () => {
    const [nombreMascota, setNombreMascota] = useState('');
    const [edad, setEdad] = useState('');
    const [especie, setEspecie] = useState('');
    const [peso, setPeso] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { uri: require('../Images/logo1.jpg'), name: 'logo1.jpg' },
        { uri: require('../Images/logo2.jpg'), name: 'logo2.jpg' },
        { uri: require('../Images/logo3.jpg'), name: 'logo3.jpg' },
        { uri: require('../Images/logo4.jpg'), name: 'logo4.jpg' },

    ];

    const seleccionarImagen = (image) => {
        setSelectedImage(image);
    };

    const subirDatos = async () => {
        if (!selectedImage) {
            alert("Por favor selecciona una imagen");
            return;
        }

        try {
            await addDoc(collection(db, "mascotas"), {
                nombreMascota,
                edad: parseInt(edad),
                especie,
                peso: parseFloat(peso),
                fotoMascota: selectedImage.name
            });

            alert('Mascota añadida exitosamente');
            setNombreMascota('');
            setEdad('');
            setEspecie('');
            setPeso('');
            setSelectedImage(null);
        } catch (error) {
            console.error("Error al guardar en Firestore:", error);
            alert("Hubo un error al guardar los datos");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <Text style={styles.title}>Selecciona una imagen de la mascota</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la Mascota"
                    value={nombreMascota}
                    onChangeText={setNombreMascota}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    value={edad}
                    keyboardType="numeric"
                    onChangeText={setEdad}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Especie"
                    value={especie}
                    onChangeText={setEspecie}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Peso"
                    value={peso}
                    keyboardType="numeric"
                    onChangeText={setPeso}
                />

                <Text style={styles.title}>Selecciona una imagen de la mascota</Text>
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => seleccionarImagen(item)} style={styles.imageContainer}>
                            <Image source={item.uri} style={styles.image} />
                        </TouchableOpacity>
                    )}
                />
                {selectedImage && (
                    <View style={styles.selectedContainer}>
                        <Text style={styles.selectedText}>Imagen seleccionada:</Text>
                        <Image source={selectedImage.uri} style={styles.selectedImage} />
                    </View>
                )}

                <TouchableOpacity onPress={subirDatos} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Guardar Mascota</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
            <Footer />
            </View>
        </View>
    );
};

export default Veterinaria;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    
    },
    content: {
      marginTop: 50,
        flex: 1,
    },
    input: {
        height: 50,
        borderColor: '#003153',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#000000',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003153',
        marginBottom: 10,
        textAlign: 'center',
    },
    imageContainer: {
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
    },
    image: {
        width: 80,
        height: 80,
    },
    selectedContainer: {

        alignItems: 'center',
    },
    selectedText: {
        fontSize: 16,
        color:'#003153',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
      flex: 0.1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#F0F0F0', // Fondo gris claro para el Footer
    },
});
