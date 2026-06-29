import { ValidatorsConfig } from "../../common/config/validators.config";

export class CreateProductDto {
    constructor(
        public name: string,
        public price: number,
        public stock: number,
        public category: string,
        public supplierId: string,
        public description: string | undefined,
    ){}

    static validate(data: {[key: string]:any}): [string | undefined, CreateProductDto | undefined]{
        const { name, price, stock, category, supplierId, description } = data;

        if(!name) return ["Missing name", undefined];
        
        if(!ValidatorsConfig.isPositive(price)) return ["Price should be a positive number.", undefined];
        
        if(!ValidatorsConfig.isPositive(stock)) return ["Stock should be a positive number.", undefined];
        
        if(!category) return ["Missing category", undefined];
        if(!ValidatorsConfig.isMongoId( category )) return ["Category not valid", undefined];

        if(!supplierId) return ["Missing supplierId", undefined];
        if(!ValidatorsConfig.isMongoId( supplierId )) return ["SupplierId not valid", undefined];
        
        if(description && !ValidatorsConfig.isLengthInRange(description, 4)) return ["Description too short", undefined];
        
        return [undefined, new CreateProductDto(name, +price, +stock, category, supplierId, description)];
    }
}