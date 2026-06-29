import { ValidatorsConfig } from "../../common/config/validators.config";

export class UpdateWarehouseDto {
    constructor(
        public name: string | undefined,
        public location: string | undefined,
        public products: string[] | undefined,
    ) { }

    static validate(data: { [key: string]: any }): [string | undefined, UpdateWarehouseDto | undefined] {
        const { name, location, products } = data;

        if (name && !ValidatorsConfig.isLengthInRange(name, 2)) return ["Name too short", undefined];

        if (location && !ValidatorsConfig.isLengthInRange(location, 2)) return ["Location too short", undefined];

        if (products) {
            if (!Array.isArray(products)) return ["Products must be an array", undefined];
            for (const id of products) {
                if (!ValidatorsConfig.isMongoId(id)) return [`Invalid product ID: ${id}`, undefined];
            }
        }

        return [undefined, new UpdateWarehouseDto(name, location, products)];
    }
}
