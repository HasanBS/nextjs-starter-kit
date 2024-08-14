
import { Component } from "@/models/Component";
import mongoose from "mongoose";

export async function POST(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { name, description,price, thumbnail } = await req.json();
    const categoryDoc = await Component.create({ name, description,price, thumbnail });
    return Response.json(categoryDoc);
}

export async function PUT(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id, name,description,price,thumbnail } = await req.json();
    await Component.updateOne({ _id }, { name ,description,price,thumbnail });
    return Response.json(true);
}

export async function GET(req: any) {
    const categories = await Component.find();
    return Response.json(categories);
}