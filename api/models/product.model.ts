import mongoose, { Schema } from 'mongoose';

export interface ProductDocument extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, required: true, default: false, index: true },
    category: { type: String, required: true, index: true },
    image: { type: String },
  },
  { timestamps: true, versionKey: false },
);

productSchema.index({ name: 'text', category: 'text' });

export const Product = mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);
