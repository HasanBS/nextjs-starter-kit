import { Model, model, models, Schema, Types } from 'mongoose';
import { IMenuItem } from './interfaces/IMenuItem';

interface IMenu {
  tenantId: Types.ObjectId;
  name: string;
  menuItems: (Types.ObjectId[] | IMenuItem[]);
}

const MenuSchema = new Schema<IMenu>({
  tenantId: { type: Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

export const Menu: Model<IMenu> = models?.Menu || model<IMenu>('Menu', MenuSchema);