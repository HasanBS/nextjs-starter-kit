import { InferSchemaType, Model, model, models, Schema, Types } from 'mongoose';

const MenuSchema = new Schema({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

export type MenuType = InferSchemaType<typeof MenuSchema> & { _id: Types.ObjectId };

export const Menu: Model<MenuType> = models?.Menu || model<MenuType>('Menu', MenuSchema);