import { model, models, Schema, Types } from 'mongoose';

interface IMenu {
    name: string;
    menuItems: [Types.ObjectId];
}

const MenuSchema: Schema = new Schema({
    name: { type: String, required: true },
    menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

export const Menu = models?.Menu || model<IMenu>('Menu', MenuSchema);