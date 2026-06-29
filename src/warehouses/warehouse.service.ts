import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { Warehouse } from "../common/databases/mongodb/models/warehouse.model";
import { Product } from "../common/databases/mongodb/models/product.model";
import { CreateWarehouseDto } from "./dtos/create-warehouse.dto";
import { UpdateWarehouseDto } from "./dtos/update-warehouse.dto";
import { ManagerError } from "../common/errors/manager.error";

export class WarehousesService {
    async create(createWarehouseDto: CreateWarehouseDto) {
        try {
            if (createWarehouseDto.products.length > 0) {
                const existingProducts = await Product.find({
                    _id: { $in: createWarehouseDto.products }
                });
                if (existingProducts.length !== createWarehouseDto.products.length) {
                    throw ManagerError.badRequest("One or more products do not exist");
                }
            }

            const warehouse = await Warehouse.create(createWarehouseDto);
            if (!warehouse) throw ManagerError.badRequest("Failed to create warehouse");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const warehouses = await Warehouse.find()
                .skip(skip)
                .limit(limit)
                .populate("products", "id name price stock");
            const total = await Warehouse.countDocuments();
            return {
                data: warehouses,
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
            const warehouse = await Warehouse.findOne({ _id: id }).populate({
                path: "products",
                populate: [
                    { path: "category", select: "id name" },
                    { path: "supplierId", select: "id name email" },
                ],
            });
            if (!warehouse) throw ManagerError.notFound("Warehouse not found");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
        try {
            if (updateWarehouseDto.products && updateWarehouseDto.products.length > 0) {
                const existingProducts = await Product.find({
                    _id: { $in: updateWarehouseDto.products }
                });
                if (existingProducts.length !== updateWarehouseDto.products.length) {
                    throw ManagerError.badRequest("One or more products do not exist");
                }
            }

            const warehouse = await Warehouse.findOneAndUpdate(
                { _id: id },
                updateWarehouseDto,
                { new: true }
            ).populate({
                path: "products",
                populate: [
                    { path: "category", select: "id name" },
                    { path: "supplierId", select: "id name email" },
                ],
            });
            if (!warehouse) throw ManagerError.notFound("Warehouse not found");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const warehouse = await Warehouse.findOneAndDelete({ _id: id });
            if (!warehouse) throw ManagerError.notFound("Warehouse not found");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }
}
