/**
 * @class PaginationDto
 * @description Data Transfer Object (DTO) encargado de unificar, validar y tipar los datos
 * necesarios para los procesos de paginación en la aplicación. En una arquitectura modular,
 * los DTOs actúan como la "aduana" o primer filtro de entrada de los datos que envía el cliente.
 */
export class PaginationDto {
    
    /**
     * @constructor
     * @param {number} page - El número de página actual (Por defecto: 1)
     * @param {number} limit - Cantidad de registros a retornar por página (Por defecto: 10)
     * @description El uso del modificador 'public' en el constructor es una propiedad shorthand de TypeScript.
     * Crea e inicializa de forma automática las propiedades de la clase sin necesidad de declararlas arriba 
     * ni usar 'this.page = page'.
     */
    constructor( 
        public page: number = 1,
        public limit: number = 10,
    ){}

    /**
     * @method validate
     * @static
     * @param { { [key: string]: any } } data - Objeto genérico proveniente del cliente (ej. req.query).
     * @returns { [ string | undefined, PaginationDto | undefined ] } Tupla de control de flujo.
     * * @description Método de factoría estático. Evalúa si los datos de entrada son válidos para paginar.
     * Aplica el patrón de diseño "Either" (Retorna un error O retorna el objeto válido), evitando el uso
     * costoso de bloques try-catch o el lanzamiento de excepciones (throw Error) en esta capa.
     */
    static validate( data: { [key: string]: any } ): [ string | undefined, PaginationDto | undefined ] {
        // Desestructuración con valores por defecto en caso de que el cliente no los envíe
        const { page = 1, limit = 10 } = data;
        
        // 1. Validación de 'page': Verifica que no sea un Not-A-Number (NaN) al intentar castearlo.
        if ( page && isNaN( Number(page) ) ) {
            return ["Page debe ser un numero", undefined]; // Retorna el error en la primera posición
        }
        
        // 2. Validación de 'limit': Misma lógica de control de tipo para el límite de registros.
        if ( limit && isNaN( Number(limit) ) ) {
            return ["Limit debe ser un numero", undefined];
        }

        /**
         * Si las validaciones pasan con éxito:
         * Retorna 'undefined' en el espacio del error, y una nueva instancia del DTO.
         * El operador unario '+' (+page, +limit) es una forma limpia en JS/TS de parsear 
         * un string numérico a tipo 'number' puro.
         */
        return [ undefined, new PaginationDto(+page, +limit) ];
    }
}