/**
 * @class UpdateProductDto
 * @description Data Transfer Object (DTO) especializado en la actualización de productos.
 * A diferencia del DTO de creación, este DTO está diseñado para soportar actualizaciones parciales (PATCH).
 * Todas sus propiedades son opcionales (`| undefined`), ya que el cliente puede decidir modificar 
 * un solo atributo (ej. solo el precio) sin necesidad de enviar el objeto completo.
 */
export class UpdateProductDto {
    
    /**
     * @constructor
     * @param {string | undefined} name - Nuevo nombre (Opcional).
     * @param {number | undefined} price - Nuevo precio (Opcional, debe ser positivo si se envía).
     * @param {number | undefined} stock - Nuevo inventario (Opcional, debe ser positivo si se envía).
     * @param {string | undefined} description - Nueva descripción (Opcional).
     */
    constructor(
        public name: string | undefined,
        public price: number | undefined,
        public stock: number | undefined,
        public description: string | undefined,
    ){}

    /**
     * @method fields
     * @type {setter}
     * @param {Partial<UpdateProductDto>} data - Objeto que contiene un subconjunto de las propiedades del DTO.
     * @description Un método setter que permite actualizar de forma segura y dinámica las propiedades 
     * de la instancia actual, evaluando únicamente los campos que realmente contienen un valor (truthy).
     * El tipo genérico `Partial<T>` es una utilidad nativa de TypeScript que convierte todas las 
     * propiedades de una clase o interfaz en opcionales.
     */
    set fields( data: Partial<UpdateProductDto> ) {
        const { name, price, stock, description } = data;

        // Patrón de asignación segura: Solo se sobrescribe la propiedad si el dato fue enviado.
        if (name) this.name = name;
        if (price) this.price = price;
        if (stock) this.stock = stock;
        if (description) this.description = description;
    }

    /**
     * @method validate
     * @static
     * @param { { [key: string]: any } } data - Datos provenientes del cuerpo de la petición (req.body).
     * @returns { [ string | undefined, UpdateProductDto | undefined ] } Tupla de control de flujo (Patrón Either).
     * @description Aplica validaciones condicionales. No exige la presencia de los campos, pero si el campo 
     * está presente en la petición, valida estrictamente que cumpla con los tipos y restricciones de negocio.
     */
    static validate(data: { [key: string]: any }): [string | undefined, UpdateProductDto | undefined] {
        const { name, price, stock, description } = data;

        // 1. Validación Condicional del 'Price'
        // El operador '&&' asegura que las validaciones de tipo y rango solo se ejecuten SI el usuario envió el campo 'price'.
        if (price && isNaN(+price)) return ["Price should be a number.", undefined];
        if (price && +price < 0) return ["Price should be positive.", undefined];
        
        // 2. Validación Condicional del 'Stock'
        if (stock && isNaN(+stock)) return ["Stock should be a number.", undefined];
        if (stock && +stock < 0) return ["Stock should be positive.", undefined];
        
        // 3. Validación Condicional de la 'Description'
        if (description && description.length < 4) return ["Description too short", undefined];
        
        /**
         * Si las validaciones son exitosas:
         * Retorna la instancia del DTO. Notar el uso del operador unario '+' (+price, +stock) 
         * para garantizar que, si se enviaron estos números como strings en el JSON, se almacenen 
         * internamente como tipos 'number' limpios.
         */
        return [undefined, new UpdateProductDto(name, price ? +price : undefined, stock ? +stock : undefined, description)];
    }
}