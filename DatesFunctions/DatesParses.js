import {parse, format} from 'date-fns';
import {es} from 'date-fns/locale';

export const toFormatDate = (fechaAnt) =>{
    const año = fechaAnt.getFullYear(); 
    const dia = String(fechaAnt.getDate()).padStart(2, '0'); 
    const mes = String(fechaAnt.getMonth() + 1).padStart(2, '0'); 
    return `${año}-${mes}-${dia}`;
}

export const toParseToDate = (dateString) => {
    // Parsear el string de la fecha a un objeto Date
    return parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
}


export const formatDateTime = (dateString) => {
    // Parsear el string de la fecha a un objeto Date
    const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
    const formattedDate= parsedDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
  
    // Formatear la fecha
    const formattedTime= parsedDate.toLocaleTimeString('es-ES', { hour12: true, hour: '2-digit', minute: '2-digit', });
    // Formatear la hora
    
  
    return { fecha: formattedDate, hora: formattedTime, dateParse: parsedDate};
};

export const toFormatHour = (horaAnt) => {

    const horas = String(horaAnt.getHours()).padStart(2, '0'); // Obtener las horas con dos dígitos
    const minutos = String(horaAnt.getMinutes()).padStart(2, '0'); // Obtener los minutos con dos dígitos
    const segundos = String(horaAnt.getSeconds()).padStart(2, '0'); // Obtener los segundos con dos dígitos

    return ` ${horas}:${minutos}:${segundos}`; // Construir la cadena en el formato HH:MM:SS

};