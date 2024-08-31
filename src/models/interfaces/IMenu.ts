import mongoose, { Document, mongo } from 'mongoose';
import { IMenuItem } from './IMenuItem';

export interface IMenu {
    _id?: mongoose.Schema.Types.ObjectId; 
    tenantId?: mongoose.Schema.Types.ObjectId;
    name: string;
    menuItems: IMenuItem[];
}