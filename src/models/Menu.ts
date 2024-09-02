import { Model, model, models, Schema, Types } from 'mongoose';

interface IMenu {
  tenantId: Types.ObjectId;
  name: string;
  menuItems: Types.ObjectId[];
}

const MenuSchema = new Schema<IMenu>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

export const Menu: Model<IMenu> = models?.Menu || model<IMenu>('Menu', MenuSchema);