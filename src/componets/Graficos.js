import React, { useState, useEffect } from 'react';
import { View, ScrollView,Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Database/Firebaseconfig';
import GraficoAnimal from './GraficoAnimales';
import Footer from './Footer';

export default function EstadisticasMascotas() {
  const [dataEdades, setDataEdades] = useState(null); // Cambiado a null para verificar datos antes de renderizar

  useEffect(() => {
    const obtenerDatosEdad = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mascotas"));
        const conteoEdades = { "0-5": 0, "6-10": 0, "11-15": 0, "16+": 0 };

        querySnapshot.forEach((doc) => {
          const { edad } = doc.data();
          if (edad >= 0 && edad <= 5) conteoEdades["0-5"] += 1;
          else if (edad >= 6 && edad <= 10) conteoEdades["6-10"] += 1;
          else if (edad >= 11 && edad <= 15) conteoEdades["11-15"] += 1;
          else if (edad >= 16) conteoEdades["16+"] += 1;
        });

        const labels = Object.keys(conteoEdades);
        const dataCounts = Object.values(conteoEdades);

        setDataEdades({
          labels,
          datasets: [{ data: dataCounts }]
        });
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    obtenerDatosEdad();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dataEdades ? ( // Verifica si `dataEdades` tiene datos antes de renderizar `GraficoAnimal`
        <GraficoAnimal data={dataEdades} />
      ) : (
        <View><Text>Cargando datos...</Text></View> // Mensaje de carga
      )}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
