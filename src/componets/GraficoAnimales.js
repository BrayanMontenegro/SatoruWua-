import React from 'react';
import { StyleSheet, View,Text ,Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

const GraficoAnimal = ({ dataAnimal }) => {
  let screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
<Text style={styles.text}>Grafico de conteo de edad de animales</Text>
      <BarChart
        data={dataAnimal}  
        width={screenWidth - (screenWidth * 0.1)}
        height={300}
        chartConfig={{
          backgroundGradientFrom: "rgba(0, 49, 83, 1)",
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: "rgba(0, 0, 0, 1)", 
          backgroundGradientToOpacity: 0.6,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
          strokeWidth: 2,
          barPercentage: 0.5,
          fillShadowGradient: "#ffff", 
          fillShadowGradientOpacity: 1,
        }}
        style={{
          borderRadius: 10,
        }}
        verticalLabelRotation={45}
        withHorizontalLabels={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003153',
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default GraficoAnimal;
