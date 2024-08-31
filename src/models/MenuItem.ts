import { Model, model, models, Schema } from 'mongoose';

interface IMenuItem {
    name: string;
    description: string;
    price: number;
    thumbnail: string;
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
});
export const MenuItem: Model<IMenuItem> = models?.MenuItem || model<IMenuItem>('MenuItem', MenuItemSchema);