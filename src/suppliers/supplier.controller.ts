import { Request, Response } from "express";
import { SuppliersService } from "./supplier.service";
import { CreateSupplierDto } from "./dtos/create-supplier.dto";
import { UpdateSupplierDto } from "./dtos/update-supplier.dto";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { HandlerError } from "../common/errors/handler.error";

export class SuppliersController {
    constructor(
        private readonly suppliersService: SuppliersService
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createSupplierDto] = CreateSupplierDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.suppliersService.create(createSupplierDto!)
            .then((supplier) => res.status(201).json(supplier))
            .catch((error) => HandlerError.error(error, res));
    }

    update = (req: Request, res: Response) => {
        const [error, updateSupplierDto] = UpdateSupplierDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.suppliersService.update(req.params.id as string, updateSupplierDto!)
            .then((supplier) => res.status(200).json(supplier))
            .catch((error) => HandlerError.error(error, res));
    }

    findAll = (req: Request, res: Response) => {
        const [error, paginationDto] = PaginationDto.validate(req.query);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }
        this.suppliersService.findAll(paginationDto!)
            .then((suppliers) => res.status(200).json(suppliers))
            .catch((error) => HandlerError.error(error, res));
    }

    findOne = (req: Request, res: Response) => {

        this.suppliersService.findOne(req.params.id as string)
            .then((supplier) => res.status(200).json(supplier))
            .catch((error) => HandlerError.error(error, res));
    }

    delete = (req: Request, res: Response) => {

        this.suppliersService.delete(req.params.id as string)
            .then((supplier) => res.status(200).json(supplier))
            .catch((error) => HandlerError.error(error, res));
    }
}
