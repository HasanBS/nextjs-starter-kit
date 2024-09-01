import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { name, description, price, thumbnail } = await req.json();
    const categoryDoc = await MenuItem.create({ name, description, price, thumbnail });
    return Response.json(categoryDoc);
}

export async function PUT(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id, name, description, price, thumbnail } = await req.json();
    await MenuItem.updateOne({ _id }, { name, description, price, thumbnail });
    return Response.json(true);
}

export async function GET(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { tenantId } = await req.json();
    const categories = await MenuItem.find(tenantId);
    return Response.json(categories);
}

export async function DELETE(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id } = await req.json();
    await MenuItem.deleteOne({ _id });
    return Response.json(true);
}