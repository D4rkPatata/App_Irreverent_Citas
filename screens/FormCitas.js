import { Text, StyleSheet, View, Platform, TextInput, Button, TouchableOpacity} from 'react-native'
import React, { useState, useEffect} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertCita } from '../Database';
import styles from '../styles/Styles'
import { toFormatDate, toFormatHour } from '../DatesFunctions/DatesParses';


export default function FormCitas(props)  {

  const initialCita={
    cliente: '',
    detalle: '',
  }
  
  const [nombre, setNombre] = useState('');
  const [detalle, setDetalle] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [showHoraPicker, setShowHoraPicker] = useState(false);
  const [cita, setStateCita] = useState(initialCita);

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowFechaPicker(Platform.OS === 'ios');
    setFecha(selectedDate);
  };

  const onChangeHora = (event, selectedTime) => {
    const currentTime = selectedTime || hora;
    setShowHoraPicker(Platform.OS === 'ios');
    setHora(currentTime);
  };

  const handleChangeText= (value, atribute) =>{
    setStateCita({...cita, [atribute]:value});
  }


  

  const saveCita = () => {
    const citaInsert={
      cliente: cita.cliente,
      detalle: cita.detalle,
      fecha: ""+ toFormatDate(fecha) + ""+ toFormatHour(hora)+"",
      hora: "00:00:00"
    }

    insertCita(citaInsert);
    props.navigation.navigate('Citas'); 
  }  
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Cliente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre del cliente"
        value={cita.cliente}
        onChangeText={(value)=> handleChangeText(value, 'cliente')}
      />

      <Text style={styles.label}>Detalle de la Cita:</Text>
      <TextInput
        style={styles.detailInput}
        placeholder="Ingresa el detalle de la cita"
        value={cita.detalle}
        onChangeText={(value)=> handleChangeText(value, 'detalle')}
        
      />

      <View style={styles.contFechaHora}>
        <View>
          <Text style={styles.label}>Fecha de la Cita:</Text>
          <View style={styles.input}>
            <TouchableOpacity onPress={() => setShowFechaPicker(true)}>
              <Text style={styles.dateTimeText}>{
            fecha.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}</Text>
            </TouchableOpacity>
          </View>
          {showFechaPicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              display="default"
              onChange={onChangeFecha}
            />
          )}
        </View>
          
        <View>
          <Text style={styles.label}>Hora de la Cita:</Text>
          
          <View style={styles.input}>
            <TouchableOpacity  onPress={() => setShowHoraPicker(true)}>
              <Text style={styles.dateTimeText}>{hora.toLocaleTimeString('es-ES', { hour12: true, hour: '2-digit', minute: '2-digit', })}</Text>
            </TouchableOpacity>
          </View>
          {showHoraPicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              display="default"
              onChange={onChangeHora}
            />
          )}
        </View>
        
      </View>
      
    

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>saveCita()}>
          <Text style={styles.buttonText}>GuardarCita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
}

