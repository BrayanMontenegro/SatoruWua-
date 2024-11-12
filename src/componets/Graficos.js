import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Database/Firebaseconfig';
import GraficoAnimal from './GraficoAnimales';
import GraficoFiltrado from './GraficoFiltrado';
import Footer from './Footer';

export default function EstadisticasMascotas() {
  const [dataEdades, setDataEdades] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [datosFiltrados, setDatosFiltrados] = useState({ labels: [], datasets: [{ data: [] }] });
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Ventas'); // Valor por defecto


  const registros = [
    { fecha: "2018-01-15", categoria: "Ventas", valor: 450, monto: 11250, responsable: "Juan Pérez" },
    { fecha: "2018-01-15", categoria: "Ventas", valor: 450, monto: 11250, responsable: "Ana Gómez" },
    { fecha: "2018-06-20", categoria: "Servicios", valor: 520, monto: 13000, responsable: "Ana Gómez" },
    { fecha: "2019-03-12", categoria: "Proyectos", valor: 700, monto: 35000, responsable: "Laura Sánchez" },
    { fecha: "2019-08-25", categoria: "Ventas", valor: 800, monto: 20000, responsable: "Carlos Martínez" },
    { fecha: "2020-02-10", categoria: "Servicios", valor: 600, monto: 15000, responsable: "David Ramírez" },
    { fecha: "2020-09-05", categoria: "Proyectos", valor: 950, monto: 47500, responsable: "Marta López" },
    { fecha: "2021-01-18", categoria: "Ventas", valor: 1100, monto: 27500, responsable: "Andrés Torres" },
    { fecha: "2021-07-29", categoria: "Servicios", valor: 650, monto: 16250, responsable: "Elena Moreno" },
    { fecha: "2022-03-14", categoria: "Proyectos", valor: 980, monto: 49000, responsable: "Laura Sánchez" },
    { fecha: "2022-11-22", categoria: "Ventas", valor: 1200, monto: 30000, responsable: "Juan Pérez" },
    { fecha: "2023-04-09", categoria: "Servicios", valor: 700, monto: 17500, responsable: "Ana Gómez" },
    { fecha: "2023-10-15", categoria: "Proyectos", valor: 1050, monto: 52500, responsable: "Carlos Martínez" },
    { fecha: "2024-02-01", categoria: "Ventas", valor: 1300, monto: 32500, responsable: "David Ramírez" },
    { fecha: "2024-06-18", categoria: "Servicios", valor: 750, monto: 18750, responsable: "Marta López" },
    { fecha: "2024-11-05", categoria: "Proyectos", valor: 1150, monto: 57500, responsable: "Elena Moreno" }
  ];

// Filtrar y agrupar por fecha para una categoría seleccionada
const filtrarMontoPorFechaYCategoria = (categoria) => {
  // Filtrar registros por la categoría seleccionada
  const registrosFiltrados = registros.filter(item => item.categoria === categoria);

  // Agrupar los registros filtrados por fecha y calcular el monto total por fecha
  const datosAgrupados = registrosFiltrados.reduce((acumulado, actual) => {
    const indice = acumulado.labels.indexOf(actual.fecha);

    if (indice > -1) {
      // Si la fecha ya existe, suma el monto al valor existente en esa fecha
      acumulado.datasets[0].data[indice] += actual.monto;
    } else {
      // Si no existe, añade la fecha y el monto
      acumulado.labels.push(actual.fecha);
      acumulado.datasets[0].data.push(actual.monto);
    }

    return acumulado;
  }, { labels: [], datasets: [{ data: [] }] });

  setDatosFiltrados(datosAgrupados);
};

useEffect(() => {
  // Filtrar por la categoría seleccionada al cargar el componente
  filtrarMontoPorFechaYCategoria(categoriaSeleccionada);
}, [categoriaSeleccionada]);

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
     
      <GraficoFiltrado  
          datosFiltrados={datosFiltrados}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          filtrarMontoPorFechaYCategoria={filtrarMontoPorFechaYCategoria}
        />
      <Footer></Footer>
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
