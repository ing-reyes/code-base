import { Router } from "express";
import { ProductsRoute } from "./products/product.route";

/**
 * @class AppRoutes
 * @description Clase centralizadora del enrutamiento global de la aplicación.
 * Actúa como el "Hub" o punto de distribución principal que interconecta el servidor Express
 * con los enrutadores específicos de cada módulo de negocio (Products, Users, etc.).
 */
export class AppRoutes {
    
    /**
     * @method route
     * @static
     * @get
     * @returns {Router} Instancia del enrutador global de Express con todos los módulos montados.
     * @description Utiliza un método 'getter' estático (`static get ...`). Esto permite acceder
     * a la propiedad sin necesidad de instanciar la clase (ej. `AppRoutes.route`), lo cual es ideal
     * para la carga de rutas en la configuración del servidor (`AppServer`).
     */
    static get route(): Router {
        // Inicializa una instancia aislada del Router de Express para empaquetar los submódulos.
        const route = Router();

        /**
         * -----------------------------------------------------------------
         * DELEGACIÓN POR MÓDULO (Enrutamiento Jerárquico)
         * -----------------------------------------------------------------
         * Registra el sub-enrutador del módulo de Productos.
         * Cualquier petición HTTP que coincida con el prefijo "/products" (ej. GET /api/products)
         * será inmediatamente transferida al archivo 'ProductsRoute.route' para su procesamiento fino.
         */
        route.use("/products", ProductsRoute.route);

        // Ejemplos didácticos de escalabilidad futura:
        // route.use("/users", UsersRoute.route);
        // route.use("/auth", AuthRoute.route);

        // Retorna el enrutador maestro completamente configurado
        return route;
    }
}