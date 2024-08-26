import { Text, StyleSheet, View, Platform, TextInput, Button, TouchableOpacity} from 'react-native'
import React, { useState, useEffect} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

import { insertCita } from '../Database';

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

  const toFormatDate = (fechaAnt) =>{
    const año = fechaAnt.getFullYear(); 
    const dia = String(fechaAnt.getDate()).padStart(2, '0'); 
    const mes = String(fechaAnt.getMonth() + 1).padStart(2, '0'); 
    return `${año}-${mes}-${dia}`;
  }

  const toFormatHour = (horaAnt) => {

    const horas = String(horaAnt.getHours()).padStart(2, '0'); // Obtener las horas con dos dígitos
    const minutos = String(horaAnt.getMinutes()).padStart(2, '0'); // Obtener los minutos con dos dígitos
    const segundos = String(horaAnt.getSeconds()).padStart(2, '0'); // Obtener los segundos con dos dígitos

    return ` ${horas}:${minutos}:${segundos}`; // Construir la cadena en el formato HH:MM:SS

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
        style={styles.input}
        placeholder="Ingresa el detalle de la cita"
        value={cita.detalle}
        onChangeText={(value)=> handleChangeText(value, 'detalle')}
        
      />

      <View style={styles.contFechaHora}>
        <View>
          <Text style={styles.label}>Fecha de la Cita:</Text>
          <TextInput placeholder={
            fecha.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })} editable={false} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonChoose} onPress={() => setShowFechaPicker(true)}>
              <Text style={styles.buttonText}>Seleccionar Fecha</Text>
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
          <TextInput placeholder={
            hora.toLocaleTimeString('es-ES', { hour12: true, hour: '2-digit', minute: '2-digit', })}  onPress={() => setShowHoraPicker(true)}/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonChoose} onPress={() => setShowHoraPicker(true)}>
              <Text style={styles.buttonText}>Seleccionar Hora</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  contFechaHora: {
    flex: 1,
    flexDirection: 'row', // Alinea los elementos en una fila
    justifyContent: 'space-between', // Espacio entre los elementos
    alignItems: 'center', // Alinea verticalmente al centro
    padding: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 17,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 10,
  },
  buttonChoose:{
    backgroundColor: '#3e99f3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '50%',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})