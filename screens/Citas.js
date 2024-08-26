import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback  } from 'react'
import { funcion, insertCita, readCitas, readCitasOrder } from '../Database';
import { ListItem } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';



export default function Citas(props) {

  

  //const citas= readCitasOrder("2024-07-12");
  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
  ]
  
  
    const [citas, setCitas] = useState([]);
  
    // Usa useEffect para manejar la obtención de datos asíncronos
    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          const allCitas = await readCitasOrder("2024-07-12");
          setCitas(allCitas);
        };
  
        fetchData();
       
      }, [])
    );

   
  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('FormCita')}>
          <Text style={styles.buttonText}> Crear Nueva Cita</Text>
        </TouchableOpacity>
      </View>

      <View>
        {
          citas.map((item, index) => (
            <ListItem key={index} bottomDivider onPress={() => props.navigation.navigate('DetalleCita', {item})}>
              <ListItem.Content>
                <ListItem.Title>{item.cliente}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={2}>{item.detalle}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.fecha}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
      

    </ScrollView>
    
    

  )

}

/*{citas.map((item, index) => (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.citaTitulo}>{item.cliente}</ListItem.Title>
            <ListItem.Subtitle style={styles.citaFecha}>{item.detalle}</ListItem.Subtitle>
            <ListItem.Subtitle style={styles.citaDescripcion}>{item.fecha}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}*/

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})