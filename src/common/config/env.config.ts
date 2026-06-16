import "dotenv/config"; // Carga automáticamente las variables del archivo '.env' en 'process.env' al arrancar
import { get } from "env-var"; // Importa la librería encargada de validar y castear los tipos de datos

/**
 * @constant ENVS
 * @description Objeto de configuración global fuertemente tipado.
 * Actúa como la "Única Fuente de Verdad" (Single Source of Truth) para las variables de entorno.
 * En lugar de esparcir 'process.env' por todo el proyecto, los módulos consumen este objeto,
 * garantizando que los datos ya han sido validados antes de su uso.
 */
export const ENVS = {
    
    /**
     * @property PORT
     * @type {number}
     * @description Puerto en el que se levantará el servidor HTTP.
     * - '.required()': Si la variable PORT no existe en el archivo '.env', detiene el servidor con un error explícito.
     * - '.asPortNumber()': Valida que el valor sea un entero matemático válido para una red (entre 0 y 65535).
     */
    PORT: get("PORT").required().asPortNumber(),

    /**
     * @property MONGO_URI
     * @type {string}
     * @description Cadena de conexión (ConnectionString) hacia el clúster de MongoDB.
     * - '.asString()': Valida y extrae el valor asegurando que sea tratado puramente como una cadena de texto.
     */
    MONGO_URI: get("MONGO_URI").required().asString(),
}