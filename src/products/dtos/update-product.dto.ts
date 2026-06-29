import { ValidatorsConfig } from "../../common/config/validators.config";

export class UpdateProductDto {
    constructor(
        public name: string | undefined,
        public price: number | undefined,
        public stock: number | undefined,
        public category: string | undefined,
        public supplierId: string | undefined,
        public description: string | undefined,
    ) { }

    set fields(data: Partial<UpdateProductDto>) {
        const { name, price, stock, category, supplierId, description } = data;

        if (name) this.name = name;
        if (price) this.price = price;
        if (stock) this.stock = stock;
        if (category) this.category = category;
        if (supplierId) this.supplierId = supplierId;
        if (description) this.description = description;
    }

    static validate(data: { [key: string]: any }): [string | undefined, UpdateProductDto | undefined] {
        const { name, price, stock, category, supplierId, description } = data;

        if (price !== undefined && !ValidatorsConfig.isPositive(price)) return ["Price should be a positive number.", undefined];
        if (stock !== undefined && !ValidatorsConfig.isPositive(stock)) return ["Stock should be a positive number.", undefined];
        if (category && !ValidatorsConfig.isMongoId(category)) return ["Category not valid", undefined];
        if (supplierId && !ValidatorsConfig.isMongoId(supplierId)) return ["SupplierId not valid", undefined];
        if (description && !ValidatorsConfig.isLengthInRange(description, 4)) return ["Description too short", undefined];

        return [undefined, new UpdateProductDto(name, price, stock, category, supplierId, description)];
    }
}