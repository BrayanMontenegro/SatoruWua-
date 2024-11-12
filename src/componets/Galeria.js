import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { db } from '../Database/Firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import Footer from './Footer';

// Objeto de imágenes estáticas
const imagenes = {
    'logo1.jpg': require('../Images/logo1.jpg'),
    'logo2.jpg': require('../Images/logo2.jpg'),
    'logo3.jpg': require('../Images/logo3.jpg'),
    'logo4.jpg': require('../Images/logo4.jpg'),
    'default.jpg': require('../Images/default.jpg'), // Imagen por defecto
};

const GaleriaMascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMascota, setSelectedMascota] = useState(null);

    // Función para cargar las mascotas desde Firestore
    const cargarMascotas = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'mascotas'));
            const listaMascotas = [];
            querySnapshot.forEach((doc) => {
                listaMascotas.push({ id: doc.id, ...doc.data() });
            });
            setMascotas(listaMascotas);
        } catch (error) {
            console.error("Error al cargar las mascotas:", error);
        }
    };

    useEffect(() => {
        cargarMascotas();
    }, []);

    // Función para obtener la imagen desde el objeto de imágenes estáticas
    const obtenerImagenLocal = (nombreImagen) => {
        return imagenes[nombreImagen] || imagenes['default.jpg'];
    };

    const openModal = (mascota) => {
        setSelectedMascota(mascota);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedMascota(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Galería de Mascotas</Text>
            <FlatList
                data={mascotas}
                keyExtractor={(item) => item.id}
                numColumns={2} // Número de columnas para ver las tarjetas en cuadrícula
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
                        <Image source={obtenerImagenLocal(item.fotoMascota)} style={styles.image} />
                        <Text style={styles.name}>{item.nombreMascota}</Text>
                        <Text style={styles.info}>Especie: {item.especie}</Text>
                        <Text style={styles.info}>Edad: {item.edad} años</Text>
                        <Text style={styles.info}>Peso: {item.peso} kg</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Modal para ver los detalles de la mascota en grande */}
            {selectedMascota && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                        <Image source={obtenerImagenLocal(selectedMascota.fotoMascota)} style={styles.fullImage} />
                        <Text style={styles.modalName}>{selectedMascota.nombreMascota}</Text>
                        <Text style={styles.modalInfo}>Especie: {selectedMascota.especie}</Text>
                        <Text style={styles.modalInfo}>Edad: {selectedMascota.edad} años</Text>
                        <Text style={styles.modalInfo}>Peso: {selectedMascota.peso} kg</Text>
                    </View>
                </Modal>
            )}
          <View style={styles.footer}>
            <Footer></Footer>
          </View>

        </View>
    );
};

export default GaleriaMascotas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#603085',
        textAlign: 'center',
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#8A2BE2',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    footer: {
      flex: 0.1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#603085',
    },
    info: {
        fontSize: 14,
        color: '#003153',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#8A2BE2',
        fontWeight: 'bold',
    },
    fullImage: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
    modalName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
    },
    modalInfo: {
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: 5,
    },
});
