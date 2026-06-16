import { Product } from "../common/databases/mongodb/models/product.model";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

/**
 * @class ProductsService
 * @description Capa de Servicio del módulo de Productos. Contiene la lógica de negocio central.
 * En una arquitectura modular, el Servicio es totalmente agnóstico de la red (no sabe si lo llama Express,
 * un WebSocket o un broker de mensajería como RabbitMQ). Solo recibe DTOs/parámetros primitivos y opera con la BD.
 */
export class ProductsService {
    
    /**
     * @method create
     * @async
     * @param {CreateProductDto} createProductDto - Datos previamente validados por el DTO.
     * @returns {Promise<IProduct>} Documento del producto creado.
     */
    async create(createProductDto: CreateProductDto) {
        try {
            // Persiste el nuevo producto en MongoDB mapeando los campos del DTO de forma directa
            const product = await Product.create(createProductDto);
            
            // Validación de control: Asegura que la base de datos devolvió el documento persistido
            if (!product) throw new Error("Failed to create product");

            return product;
        } catch (error) {
            // Relanza el error para que sea capturado por el controlador (quien decidirá el código de estado HTTP)
            throw error;
        }
    }

    /**
     * @method findAll
     * @async
     * @param {PaginationDto} paginationDto - Contiene la página actual y el límite de registros deseados.
     * @returns {Promise<Object>} Objeto estructurado con la data paginada y metadatos de control.
     */
    async findAll(paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            
            /**
             * Cálculo matemático del desplazamiento (Offset/Skip)
             * Ejemplo: Si page = 3 y limit = 10, skip = (3 - 1) * 10 = 20. 
             * Significa que omitirá los primeros 20 registros y traerá del 21 al 30.
             */
            const skip = (page - 1) * limit;

            // Ejecuta consultas concurrentes o secuenciales a MongoDB.
            // .skip() salta los documentos anteriores y .limit() restringe el tamaño del lote.
            const products = await Product.find().skip(skip).limit(limit);
            
            // Obtiene el universo total de documentos (necesario para calcular la última página en el frontend)
            const total = await Product.countDocuments();
            
            // Retorna una estructura estándar estricta para APIs profesionales (Data + Meta)
            return {
                data: products,
                meta: {
                    page,
                    limit,
                    total,
                    lastPage: Math.ceil(total / limit), // Redondea hacia arriba para cubrir remanentes (ej: 2.1 páginas = 3 páginas)
                }
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method update
     * @async
     * @param {string} id - Identificador único del producto (_id).
     * @param {UpdateProductDto} updateProductDto - Campos modificados opcionales.
     * @returns {Promise<IProduct>} Documento del producto actualizado.
     */
    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            /**
             * findOneAndUpdate busca por criterio y aplica las mutaciones.
             * El objeto de configuración '{ new: true }' es vital: por defecto, Mongoose 
             * retorna el documento VIEJO antes de ser modificado. 'new: true' fuerza el retorno del objeto actualizado.
             */
            const product = await Product.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
            
            // Control de existencia: Si el ID no coincide con ningún registro, lanza una excepción
            if (!product) throw new Error("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method delete
     * @async
     * @param {string} id - Identificador único del producto a eliminar.
     * @returns {Promise<IProduct>} Documento eliminado.
     */
    async delete(id: string) {
        try {
            // NOTA DOCENTE EN CÓDIGO: ¡Nunca aplicar eliminación física en producción!
            // Eliminar registros de forma física destruye la integridad referencial histórica (ej. facturas viejas apuntando a un id inexistente).
            const product = await Product.findOneAndDelete({ _id: id });
            
            if (!product) throw new Error("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method findOne
     * @async
     * @param {string} id - Identificador del producto a consultar.
     * @returns {Promise<IProduct>} Documento del producto encontrado.
     */
    async findOne(id: string) {
        try {
            const product = await Product.findOne({ _id: id });
            
            if (!product) throw new Error("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }
}