import { model, Schema, Types } from 'mongoose';
import { IMenu } from './interfaces/IMenu';

const MenuSchema: Schema = new Schema({
    tenantId: { type: Types.ObjectId, required: true, index: true },
    name: { type: String, required: true },
    menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }] // Reference to MenuItem model
}, {
    timestamps: true
});

export const Menu =  model<IMenu>('Menu', MenuSchema);