export class PaginationDto {
    constructor( 
        public page: number = 1,
        public limit: number = 10,
     ){}

     static validate( data: { [key: string]: any } ):[ string | undefined, PaginationDto | undefined ]  {
        const { page = 1, limit = 10 } = data
        
        if( page && isNaN( Number(page) ) ) return ["Page debe ser un numero", undefined];
        if( limit && isNaN( Number(limit) ) ) return ["Limit debe ser un numero", undefined];

        return [ undefined, new PaginationDto(+page, +limit)]
     }
}