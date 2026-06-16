/**
 * @class CreateProductDto
 * @description Data Transfer Object (DTO) especializado en la creación de productos.
 * Su objetivo principal es recibir el 'body' de una petición POST/PUT, sanitizarlo, 
 * aplicar reglas de negocio iniciales y transformarlo en un objeto fuertemente tipado.
 */
export class CreateProductDto {
    
    /**
     * @constructor
     * @param {string} name - Nombre comercial del producto (Obligatorio).
     * @param {number} price - Costo unitario (Obligatorio, debe ser mayor o igual a cero).
     * @param {number} stock - Cantidad inicial disponible en inventario (Obligatorio, entero no negativo).
     * @param {string | undefined} description - Detalle opcional del producto.
     * @description Al igual que en la paginación, se usa el shorthand de TypeScript para declarar e 
     * inicializar las propiedades de la instancia de forma automática a través del constructor.
     */
    constructor(
        public name: string,
        public price: number,
        public stock: number,
        public description: string | undefined,
    ){}

    /**
     * @method validate
     * @static
     * @param { { [key: string]: any } } data - Objeto sin tipar proveniente del cuerpo de la petición (req.body).
     * @returns { [ string | undefined, CreateProductDto | undefined ] } Tupla de control de flujo (Patrón Either).
     * @description Evalúa exhaustivamente cada propiedad requerida para la creación. Si alguna regla falla,
     * detiene el flujo inmediatamente y devuelve el mensaje de error de forma síncrona.
     */
    static validate(data: { [key: string]: any }): [string | undefined, CreateProductDto | undefined] {
        // Desestructuración de las propiedades esperadas en el JSON de entrada
        const { name, price, stock, description } = data;

        // 1. Validación de Obligatoriedad (Presence Check)
        if (!name) return ["Missing name", undefined];
        
        // 2. Validaciones de Negocio para el 'Price'
        // Primero evalúa si es un número válido (evitando strings no numéricos) usando el operador unario '+'
        if (isNaN(+price)) return ["Price should be a number.", undefined];
        // Segundo, asegura que no sea un valor negativo (Regla de negocio de facturación)
        if (+price < 0) return ["Price should be positive.", undefined];
        
        // 3. Validaciones de Negocio para el 'Stock'
        // Verifica el tipo de dato para el inventario
        if (isNaN(+stock)) return ["Stock should be a number.", undefined];
        // El inventario físicamente no puede ser menor a cero
        if (+stock < 0) return ["Stock should be positive.", undefined];
        
        // 4. Validación de Longitud Mínima (Opcional pero condicionado)
        // Solo si el cliente envió una descripción, se evalúa que tenga al menos 4 caracteres para evitar textos vacíos o ambiguos.
        if (description && description.length < 4) return ["Description too short", undefined];
        
        /**
         * Si todas las compuertas de validación se superan con éxito:
         * Retorna 'undefined' en el error y una instancia limpia y segura de 'CreateProductDto'.
         * Notar que las variables pasan con sus valores originales, listos para ser operados.
         */
        return [undefined, new CreateProductDto(name, price, stock, description)];
    }
}