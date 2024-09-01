import { Menu } from "@/models/Menu";
import mongoose from "mongoose";

export async function POST(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const tenantId = req.headers.get('x-tenant-id');
    const { name, menuItems } = await req.json();
    const categoryDoc = await Menu.create({ name, menuItems, tenantId });
    return new Response(JSON.stringify(categoryDoc), { status: 201 });
}

export async function PUT(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const tenantId = req.headers.get('x-tenant-id');
    const { _id, name } = await req.json();
    await Menu.updateOne({ _id, tenantId }, { name });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const tenantId = req.headers.get('x-tenant-id');
    const menus = await Menu.find({ tenantId });
    return Response.json(menus);
}

export async function DELETE(req: any) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const tenantId = req.headers.get('x-tenant-id');
    const { _id } = await req.json();
    await Menu.deleteOne({ _id, tenantId });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}