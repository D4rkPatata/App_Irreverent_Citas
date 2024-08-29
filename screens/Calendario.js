import { Text, StyleSheet, View, Modal, Button , TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect} from 'react'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { ListItem } from 'react-native-elements'
import { formatDateTime } from '../DatesFunctions/DatesParses';
import { readCitasDia } from '../Database';

export default function Calendario()  {

  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [citas, setCitas] = useState([]);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchCitas = async () => {
      if (selectedDate) {
        const allCitas = await readCitasDia(selectedDate + " 00:00");
        setCitas(allCitas);
      }
    };
  
    fetchCitas();
  }, [selectedDate]);
  
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  /*const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const allCitas = readCitasDia(selectedDate)
    console.log(allCitas);
    setCitas(allCitas);
    setModalVisible(true);
  };*/  




  return (
    <View style={styles.container}>
      <CalendarList
        horizontal={true}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        // Set custom calendarWidth.
        calendarWidth={screenWidth}

        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
        <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        <View>
          {
            citas.map((item, index) => {
              const fechaFormat= formatDateTime(item.fecha);
              return(
              <ListItem key={index} bottomDivider onPress={() => props.navigation.navigate('DetalleCita', {item})}>
                <ListItem.Content>
                  <ListItem.Title>{item.cliente}</ListItem.Title>
                  <ListItem.Subtitle numberOfLines={2}>{item.detalle}</ListItem.Subtitle>
                  <ListItem.Subtitle>{fechaFormat.fecha}</ListItem.Subtitle>
                  <ListItem.Subtitle>{fechaFormat.hora}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );})
          }
        </View>
        
  
      </ScrollView>

        
      </Modal>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    widht: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  

});
