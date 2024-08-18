import mongoose, { Schema, Document } from 'mongoose';
import { IMenuItem } from './MenuItem';

interface IMenu extends Document {
    name: string;
    menuItems: IMenuItem[];
}

const MenuSchema: Schema = new Schema({
    name: { type: String, required: true },
    menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }] // Reference to MenuItem model
});


export const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
