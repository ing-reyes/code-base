import { Category } from "../common/databases/mongodb/models/category.model";
import { Product } from "../common/databases/mongodb/models/product.model";
import { Supplier } from "../common/databases/mongodb/models/supplier.model";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ManagerError } from "../common/errors/manager.error";

export class ProductsService {
    async create(createProductDto: CreateProductDto) {
        try {
            const category = await Category.findById(createProductDto.category);
            if (!category) throw ManagerError.notFound(`Category with id #${createProductDto.category} not found`);

            const supplier = await Supplier.findById(createProductDto.supplierId);
            if (!supplier) throw ManagerError.notFound(`Supplier with id #${createProductDto.supplierId} not found`);

            const product = await Product.create(createProductDto);
            if (!product) throw ManagerError.badRequest("Failed to create product");

            return product;
        } catch (error) {
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const products = await Product.find()
                .skip(skip)
                .limit(limit)
                .populate("category", "id name")
                .populate("supplierId", "id name email");
            const total = await Product.countDocuments();
            return {
                data: products,
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

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            if (updateProductDto.category) {
                const category = await Category.findById(updateProductDto.category);
                if (!category) throw ManagerError.notFound(`Category with id #${updateProductDto.category} not found`);
            }

            if (updateProductDto.supplierId) {
                const supplier = await Supplier.findById(updateProductDto.supplierId);
                if (!supplier) throw ManagerError.notFound(`Supplier with id #${updateProductDto.supplierId} not found`);
            }

            const product = await Product.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
            if (!product) throw ManagerError.notFound("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const product = await Product.findOneAndDelete({ _id: id }); //! Nunca aplicar eliminación física en un producto, lo ideal es marcarlo como inactivo o eliminado
            if (!product) throw ManagerError.notFound("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            const product = await Product.findOne({ _id: id })
                .populate("category", "id name")
                .populate("supplierId", "id name email");
            if (!product) throw ManagerError.notFound("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }
}