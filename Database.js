import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('irreverentDB');

export const createTables = () =>{
    try {
        db.execAsync('PRAGMA journal_mode = WAL;'+
            'CREATE TABLE IF NOT EXISTS cita (id INTEGER PRIMARY KEY NOT NULL, cliente TEXT NOT NULL, detalle TEXT NOT NULL, fecha TEXT NOT NULL, hora TEXT NOT NULL);');
        console.log("Base de datso creado exitosamente");
    } catch (error) {
        console.log(error);
    }
};


export const funcion= () =>{
    db.runAsync('DELETE from cita WHERE id=1');
    
}



export const insertCita = (cita) =>{
    try {
        db.runAsync('INSERT INTO cita (cliente, detalle, fecha, hora) VALUES (?,?,?,?)', cita.cliente, cita.detalle, cita.fecha, cita.hora);
        console.log("Cita insertada correctamente");
    } catch (error) {
        console.log(error);
    } 
};

export const readCitas = async() =>{
    try {
        const allCitas =  await db.getAllAsync('SELECT * FROM cita');
        console.log("...");
        for(const row of allCitas){
            console.log(row.id, row.cliente, row.fecha); //en este caso todo se va con el await lolololol
        }
        //allCitas.forEach(row =>{console.log(row.id, row.cliente);});
        
    } catch (error) {
        console.log(error);
    }
    
};

export const readCitasOrder = async(dateVar) =>{
    let allCitas;
    try {
        allCitas =  await db.getAllAsync('SELECT * FROM cita WHERE fecha >= $fechaAct ORDER BY fecha ASC', {$fechaAct: dateVar});
        for(const row of allCitas){
            console.log(row.id, row.cliente, row.fecha); //en este caso todo se va con el await lolololol
        }
        //allCitas.forEach(row =>{console.log(row.id, row.cliente);});
        
    } catch(error){
        console.log(error);
    }

    return allCitas;
}
