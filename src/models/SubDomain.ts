import { model, models, Schema, Types } from "mongoose";
import { ISubDomain } from "./interfaces/ISubDomain";

const SubDomainSchema: Schema = new Schema({
    tenantId: { type: Types.ObjectId, required: true, index: true },
    name: { type: String, required: true },
}, {
    timestamps: true
});

export const SubDomain = models?.SubDomain || model<ISubDomain>('SubDomain', SubDomainSchema);