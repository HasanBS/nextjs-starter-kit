import { InferSchemaType, Model, model, models, Schema } from 'mongoose';

const MenuItemSchema = new Schema({
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

export type MenuItemType = InferSchemaType<typeof MenuItemSchema>;

export const MenuItem: Model<MenuItemType> = models?.MenuItem || model<MenuItemType>('MenuItem', MenuItemSchema);