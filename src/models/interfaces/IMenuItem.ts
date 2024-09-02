import mongoose, { Document } from 'mongoose';

export interface IMenuItem  {
    _id?: mongoose.Schema.Types.ObjectId
    tenantId?: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
}