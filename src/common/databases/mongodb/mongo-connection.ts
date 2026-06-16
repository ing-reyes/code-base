import mongoose from "mongoose";
import { ENVS } from "../../config/env.config";

/**
 * @class MongoDB
 * @description Clase encargada de gestionar el ciclo de vida de la conexión a la base de datos.
 * En una arquitectura modular/limpia, esta clase pertenece a la capa de infraestructura (configuración global),
 * permitiendo que el resto de los módulos dependan de una conexión ya establecida sin importar los detalles de implementación.
 */
export class MongoDB {
    
    /**
     * @method connect
     * @async
     * @returns {Promise<void>}
     * @description Inicializa la conexión con el clúster de MongoDB utilizando las credenciales del entorno.
     * Se define como un método asíncrono (`async/await`) para garantizar que la aplicación espere
     * a que la base de datos esté lista antes de continuar con el levantamiento del servidor Express.
     */
    async connect(): Promise<void> {
        try {
            // Convierte el proceso en síncrono simulado usando 'await'.
            // ENVS.MONGO_URI abstrae la cadena de conexión para no exponer credenciales en el código.
            await mongoose.connect(ENVS.MONGO_URI, { 
                dbName: "basedb" // Fuerza a Mongoose a conectarse a esta base de datos específica
            });
            
            // Este mensaje ahora solo se imprimirá si la línea anterior fue exitosa
            console.log("🟢 [Database] Mongo Connected successfully to 'basedb'");
        } catch (error) {
            // Si la URI es incorrecta, no hay internet o el servidor de Mongo está caído, el flujo cae aquí
            console.error("🔴 [Database] Error connecting to MongoDB:", error);
            
            // Consejo pedagógico: En producción, si la BD no conecta, es buena práctica detener el proceso de Node
            // process.exit(1); 
        }
    }
}