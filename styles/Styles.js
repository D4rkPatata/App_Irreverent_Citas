import {StyleSheet} from 'react-native'

export default StyleSheet.create({
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
      justifyContent: 'center   ', // Espacio entre los elementos // Alinea verticalmente al centro
      padding: 3,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 16,
      marginRight: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      fontSize: 18, 
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
    dateTimeText:{
      color: '#333',
      fontSize: 16,
      fontWeigh: 10,
      margin: 8,
    },
    detailInput:{
        height: 100, // Altura del TextInput
        width: '100%', // Ancho del TextInput
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 18, // Tamaño del texto dentro del TextInput
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        marginBottom: 16,
    }
  })