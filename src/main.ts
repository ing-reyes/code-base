import { MongoDB } from "./common/databases/mongodb/mongo-connection";
import { AppServer } from "./server";

/**
 * @function main
 * @description Función principal de entrada (Bootstrap) de la aplicación.
 * Sigue el patrón estructural clásico de los lenguajes fuertemente tipados (como Java o C#),
 * encapsulando el inicio del sistema en un único punto de ejecución controlado.
 */
function main() {
    
    /**
     * Subsistema 1: Infraestructura de Datos
     * Instancia e inicializa la conexión a la base de datos MongoDB.
     * Es crucial que se ejecute al inicio para que los modelos de Mongoose 
     * estén listos cuando el servidor empiece a recibir peticiones.
     */
    new MongoDB().connect();

    /**
     * Subsistema 2: Infraestructura de Red / Servidor HTTP
     * Instancia la clase que encapsula la configuración de Express (`AppServer`)
     * y arranca el listener de red para comenzar a escuchar peticiones HTTP de los clientes.
     */
    new AppServer().start();
}

/**
 * Ejecución inmediata del punto de entrada.
 * Este llamado inicia la reacción en cadena que levanta toda la arquitectura modular del backend.
 */
main();