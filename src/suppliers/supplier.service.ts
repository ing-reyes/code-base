import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { Supplier } from "../common/databases/mongodb/models/supplier.model";
import { Product } from "../common/databases/mongodb/models/product.model";
import { CreateSupplierDto } from "./dtos/create-supplier.dto";
import { UpdateSupplierDto } from "./dtos/update-supplier.dto";
import { ManagerError } from "../common/errors/manager.error";

export class SuppliersService {
    async create(createSupplierDto: CreateSupplierDto) {
        try {
            const supplier = await Supplier.create(createSupplierDto);
            if (!supplier) throw ManagerError.badRequest("Failed to create supplier");

            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const suppliers = await Supplier.find().skip(skip).limit(limit);
            const total = await Supplier.countDocuments();
            return {
                data: suppliers,
                meta: {
                    page,
                    limit,
                    total,
                    lastPage: Math.ceil(total / limit),
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            const supplier = await Supplier.findOne({ _id: id });
            if (!supplier) throw ManagerError.notFound("Supplier not found");

            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateSupplierDto: UpdateSupplierDto) {
        try {
            const supplier = await Supplier.findOneAndUpdate({ _id: id }, updateSupplierDto, { new: true });
            if (!supplier) throw ManagerError.notFound("Supplier not found");

            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const productWithSupplier = await Product.findOne({ supplierId: id });
            if (productWithSupplier) throw ManagerError.conflict("Cannot delete a supplier with active products");

            const supplier = await Supplier.findOneAndDelete({ _id: id });
            if (!supplier) throw ManagerError.notFound("Supplier not found");

            return supplier;
        } catch (error) {
            throw error;
        }
    }
}
