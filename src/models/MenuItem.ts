import mongoose, { Schema } from 'mongoose';
import { IMenuItem } from './interfaces/IMenuItem';


const MenuItemSchema: Schema = new Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
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
