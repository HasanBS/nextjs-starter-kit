import { Model, model, models, Schema, Types } from 'mongoose';

interface IMenu {
  name: string;
  menuItems: Types.ObjectId[];
}

const MenuSchema: Schema = new Schema({
  tenantId: { type: Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
}, { timestamps: true });

export const Menu: Model<IMenu> = models?.Menu || model<IMenu>('Menu', MenuSchema);