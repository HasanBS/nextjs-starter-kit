import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    thumbnail: string;
}

const MenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
});

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
