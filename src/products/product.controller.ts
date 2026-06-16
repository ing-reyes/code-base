import { Request, Response } from "express";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";

/**
 * @class ProductsController
 * @description Capa de Controlador del módulo de Productos. Maneja el protocolo HTTP.
 * Su única responsabilidad es extraer los datos de la petición (parámetros, cuerpo, consultas),
 * enviarlos a validar, delegar la acción al servicio y mapear las respuestas o errores de regreso al cliente.
 */
export class ProductsController {
    
    /**
     * @constructor
     * @param {ProductsService} productsService - Inyección de dependencias del servicio de negocio.
     * @description Usamos un modificador 'private readonly' en el constructor. Esto le enseña a los estudiantes
     * el concepto de inversión de control: el controlador no instancia su servicio internamente, 
     * sino que lo recibe ya creado desde afuera (enrutador).
     */
    constructor(
        private readonly productsService: ProductsService
    ) { }

    /**
     * @property create
     * @type {Function} (Arrow Function)
     * @description Registra un nuevo producto en el sistema.
     * Nota de clase: Se declaran como funciones de flecha para mantener el contexto del 'this' enlazado 
     * automáticamente a la instancia de la clase cuando Express ejecute el callback en las rutas.
     */
    create = (req: Request, res: Response) => {
        // 1. Intercepta los datos brutos del cuerpo y los envía al DTO para su validación
        const [error, createProductDto] = CreateProductDto.validate(req.body);
        
        // 2. Si la aduana del DTO detecta un error, responde de inmediato con Bad Request (400)
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return; // Cortocircuita la ejecución para que no intente llamar al servicio
        }

        // 3. Si es válido, invoca la lógica asíncrona del servicio mediante Promesas (.then/.catch)
        // El operador '!' (createProductDto!) le asegura a TS que la variable no es 'undefined'.
        this.productsService.create(createProductDto!)
            .then((product) => res.status(201).json(product)) // 201 Created: Estándar para creación exitosa
            .catch((error) => res.status(500).json({ error: error.message })); // 500 Internal Server Error: Fallo inesperado
    }

    /**
     * @property update
     * @description Modifica parcialmente un producto existente a través de su ID.
     */
    update = (req: Request, res: Response) => {
        // 1. Valida el cuerpo parcial enviado para la actualización
        const [error, updateProductDto] = UpdateProductDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        // 2. Recupera el ID de los parámetros de la URL (/products/:id) y lo envía junto con el DTO
        this.productsService.update(req.params.id as string, updateProductDto!)
            .then((product) => res.status(200).json(product)) // 200 OK: Actualización procesada correctamente
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    /**
     * @property findAll
     * @description Obtiene la lista de productos aplicando filtros de paginación extraídos de los Query Parameters.
     */
    findAll = (req: Request, res: Response) => {
        // 1. Valida los parámetros de consulta de la URL (?page=1&limit=10)
        const [error, paginationDto] = PaginationDto.validate(req.query);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        // 2. Consume el servicio encargado de la paginación de datos
        this.productsService.findAll(paginationDto!)
            .then((products) => res.status(200).json(products))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    /**
     * @property findOne
     * @description Busca un único producto mediante su ID.
     */
    findOne = (req: Request, res: Response) => {
        // Nota didáctica: Al no requerir un DTO complejo para el cuerpo, mapea directamente el ID de los parámetros
        this.productsService.findOne(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    /**
     * @property delete
     * @description Remueve o desactiva un producto del catálogo mediante su ID.
     */
    delete = (req: Request, res: Response) => {
        this.productsService.delete(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
}