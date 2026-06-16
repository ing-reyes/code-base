import mongoose, { Schema, Document } from "mongoose";

/**
 * @interface IProduct
 * @extends {Document}
 * @description Define el contrato de TypeScript para las propiedades de un Producto.
 * Esto proporciona tipado estático fuerte (IntelliSense y validación en tiempo de desarrollo).
 * Al heredar de 'Document', Mongoose sabe que este objeto tendrá las propiedades nativas de MongoDB (como _id).
 */
export interface IProduct extends Document {
    name: string;
    price: number;
    stock: number;
    description: string | undefined; // Permite explícitamente que la descripción sea opcional o no definida
}

/**
 * @constant productSchema
 * @type {Schema<IProduct>}
 * @description Define el esquema de Mongoose para la colección 'products' en MongoDB.
 * Actúa como la capa de validación en tiempo de ejecución. Pasamos la interfaz <IProduct>
 * como un tipo genérico para asegurar que el esquema coincida con la interfaz de TS.
 */
const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Name is required"], // Validación de obligatoriedad con mensaje personalizado
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"] // Regla de negocio: el precio no puede ser menor a cero
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"] // Regla de negocio: control estricto de inventario
    },
    description: {
        type: String,
        maxlength: [200, "Description cannot exceed 200 characters"] // Limita el tamaño para optimizar almacenamiento
    }
},
    {
        // Añade automáticamente los campos 'createdAt' y 'updatedAt' a cada documento.
        // Excelente práctica para auditoría y ordenamiento de registros en el backend.
        timestamps: true 
    }
);

/**
 * @description Configuración de la serialización del esquema a formato JSON.
 * Este paso es crucial para la capa de presentación (API REST). Centraliza el formateo de los datos
 * antes de enviarlos al cliente frontend, manteniendo la consistencia del estándar JSON (usando 'id' en lugar de '_id').
 */
productSchema.set("toJSON", {
    versionKey: false, // Oculta el campo '__v' interno de Mongoose en la respuesta JSON
    virtuals: false,   // Evita incluir propiedades virtuales no deseadas en la respuesta
    transform: (doc, ret: Record<string, any>) => {
        ret.id = ret._id;    // Mapea el _id de MongoDB a una propiedad estándar 'id' más amigable para el frontend
        delete ret._id;      // Elimina el _id original para no duplicar datos
        delete ret.__v;      // Doble seguridad para asegurar la eliminación del campo de versión
        return ret;          // Retorna el objeto limpio que finalmente viajará por la red
    }
});

/**
 * @constant Product
 * @description Exportación del modelo Mongoose. Es la interfaz operativa que interactúa directamente
 * con la base de datos (operaciones CRUD: Product.find(), Product.create(), etc.).
 * Al estar aislado en este archivo, se puede importar fácilmente en el servicio o controlador del módulo.
 */
export const Product = mongoose.model<IProduct>("Product", productSchema);