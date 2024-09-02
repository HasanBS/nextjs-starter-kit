import { Model, model, models, Schema, Types } from 'mongoose';

interface IMenuItem {
    tenantId: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
}

const MenuItemSchema = new Schema<IMenuItem>({
    tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
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