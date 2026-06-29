import { ValidatorsConfig } from "../../common/config/validators.config";

export class UpdateSupplierDto {
    constructor(
        public name: string | undefined,
        public email: string | undefined,
        public phone: string | undefined,
        public address: string | undefined,
    ) { }

    static validate(data: { [key: string]: any }): [string | undefined, UpdateSupplierDto | undefined] {
        const { name, email, phone, address } = data;

        if (name && !ValidatorsConfig.isLengthInRange(name, 2)) return ["Name too short", undefined];

        if (email && !ValidatorsConfig.isValidEmail(email)) return ["Invalid email format", undefined];

        if (phone && !ValidatorsConfig.isValidPhone(phone)) return ["Invalid phone format", undefined];

        if (address && !ValidatorsConfig.isLengthInRange(address, 4)) return ["Address too short", undefined];

        return [undefined, new UpdateSupplierDto(name, email, phone, address)];
    }
}
