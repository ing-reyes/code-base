import express from "express";
import { ENVS } from "./common/config/env.config";
import { AppRoutes } from "./routes";

/**
 * @class AppServer
 * @description Clase responsable de la configuración, inicialización y puesta en marcha
 * del servidor HTTP utilizando el framework Express. Al encapsular el servidor en una clase,
 * facilitamos su mantenimiento, testeo y escalabilidad dentro de la arquitectura modular.
 */
export class AppServer {
    
    /**
     * @property app
     * @type {express.Application}
     * @public
     * @description Instancia principal de Express. Se expone como pública por si en el futuro
     * se requiere acceder a ella desde entornos de pruebas automatizadas (como Jest o Supertest).
     */
    public app = express();

    /**
     * @method start
     * @returns {void}
     * @description Configura e inicializa el ciclo de vida del servidor web. 
     * Establece los middlewares globales, monta las rutas del sistema y activa la escucha de puertos.
     */
    start() {
        
        /**
         * -----------------------------------------------------------------
         * MIDDLEWARES GLOBALES (Capa de Pre-procesamiento)
         * -----------------------------------------------------------------
         * Un middleware es una función que se ejecuta en cascada desde que llega 
         * la petición (Request) del cliente hasta que sale la respuesta (Response).
         */

        // 1. Middleware para Parsear JSON:
        // Permite que Express entienda los cuerpos de peticiones en formato JSON (req.body).
        // Sin esta línea, cualquier envío de datos desde el frontend llegaría como 'undefined'.
        this.app.use(express.json());
        
        // 2. Middleware para Parsear URL-Encoded:
        // Permite procesar datos enviados a través de formularios HTML tradicionales (application/x-www-form-urlencoded).
        // El parámetro '{ extended: true }' permite parsear objetos y arrays complejos anidados.
        this.app.use(express.urlencoded({ extended: true }));


        /**
         * -----------------------------------------------------------------
         * ENRUTAMIENTO GLOBAL (Delegación de Módulos)
         * -----------------------------------------------------------------
         * Se establece un prefijo global "/api" para todas las rutas del sistema.
         * En lugar de llenar este archivo con decenas de endpoints, se delega el control 
         * por completo a la clase 'AppRoutes.route', la cual distribuirá el flujo 
         * a los módulos correspondientes (Products, Users, Auth, etc.).
         */
        this.app.use("/api", AppRoutes.route);

        /**
         * -----------------------------------------------------------------
         * ACTIVACIÓN DEL ESCUCHA DE RED (Socket Listener)
         * -----------------------------------------------------------------
         * Pone al servidor en modo "escucha" en el puerto especificado en las variables de entorno.
         * ENVS.PORT abstrae el puerto real, permitiendo usar el 3000 en desarrollo y el que asigne 
         * el servidor de despliegue (como Render, AWS o Heroku) en producción.
         */
        this.app.listen(ENVS.PORT, () => {
            console.log(`🚀 [Server] Running on port ${ENVS.PORT}`);
        });
    }
}