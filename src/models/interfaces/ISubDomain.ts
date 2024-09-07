import mongoose from "mongoose";

export interface ISubDomain {
    _id?: mongoose.Schema.Types.ObjectId;
    tenantId?: mongoose.Schema.Types.ObjectId;
    name: string;
}