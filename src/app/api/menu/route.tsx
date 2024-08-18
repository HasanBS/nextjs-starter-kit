
import { Menu } from "@/models/Menu";
import mongoose from "mongoose";

export async function POST(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { name } = await req.json();
    const categoryDoc = await Menu.create({ name });
    return Response.json(categoryDoc);
}

export async function PUT(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id, name } = await req.json();
    await Menu.updateOne({ _id }, { name });
    return Response.json(true);
}

export async function GET(req: any) {
    const categories = await Menu.find();
    return Response.json(categories);
}