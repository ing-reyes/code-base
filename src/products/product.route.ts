import { Router } from "express";
import { ProductsService } from "./product.service";
import { ProductsController } from "./product.controller";

/**
 * @class ProductsRoute
 * @description Enrutador específico del módulo de Productos.
 * Su responsabilidad es aislar las rutas pertenecientes a este contexto de negocio,
 * instanciar sus componentes internos (Arquitectura Modular) y asociar los verbos HTTP 
 * con los métodos correspondientes del controlador.
 */
export class ProductsRoute {
    
    /**
     * @method route
     * @static
     * @get
     * @returns {Router} Instancia del enrutador de Express con los endpoints de productos configurados.
     * @description Getter estático que permite al enrutador global (`AppRoutes`) montar este módulo
     * de forma directa sin necesidad de mantener instancias vivas en memoria de manera innecesaria.
     */
    static get route(): Router {
        const router = Router();

        /**
         * -----------------------------------------------------------------
         * CABLEADO DE ARQUITECTURA (Inyección de Dependencias Manual)
         * -----------------------------------------------------------------
         * 1. Se crea la instancia de la capa de datos/negocio (Servicio).
         * 2. Se instancia el Controlador pasando el servicio como argumento en su constructor.
         * Esto desacopla las capas: el controlador no sabe cómo funciona el servicio por dentro,
         * solo sabe que tiene los métodos necesarios para operar.
         */
        const productsService = new ProductsService();
        const productsController = new ProductsController(productsService);

        /**
         * -----------------------------------------------------------------
         * DEFINICIÓN DE ENDPOINTS (Mapeo de Rutas RESTful)
         * -----------------------------------------------------------------
         * Nota para alumnos: La raíz "/" de este archivo ya viene precedida por el prefijo 
         * definido en 'AppRoutes' y 'AppServer' (/api/products).
         */

        // POST /api/products -> Envía datos en el cuerpo (req.body) para registrar un producto.
        router.post("/", productsController.create);
        
        // GET /api/products -> Consulta la lista paginada usando Query Parameters (?page=1&limit=5).
        router.get("/", productsController.findAll);
        
        // GET /api/products/:id -> Consulta un recurso específico. El ':id' es un parámetro dinámico (req.params.id).
        router.get("/:id", productsController.findOne);
        
        // PUT /api/products/:id -> Actualiza parcialmente las propiedades de un producto específico mediante su ID.
        router.put("/:id", productsController.update);
        
        // DELETE /api/products/:id -> Remueve o desactiva un registro del sistema basándose en su ID.
        router.delete("/:id", productsController.delete);

        // Retorna el router local configurado con sus 5 operaciones básicas (CRUD)
        return router;
    }
}