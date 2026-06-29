import mongoose from "mongoose"

export class ValidatorsConfig {
    static isMongoId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id)
    }

    static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    static isValidPhone(phone: string): boolean {
        return /^\+?[\d\s\-\(\)]{7,20}$/.test(phone)
    }

    static isNumeric(value: any): boolean {
        return !isNaN(Number(value))
    }

    static isPositive(value: any): boolean {
        return this.isNumeric(value) && Number(value) >= 0
    }

    static isLengthInRange(value: string, min: number, max?: number): boolean {
        if (value.length < min) return false
        if (max !== undefined && value.length > max) return false
        return true
    }
}