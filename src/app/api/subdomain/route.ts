import { SubDomain } from "@/models/SubDomain";
import mongoose from "mongoose";

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const tenantId = req.headers.get('x-tenant-id');
    const { name } = await req.json();
    const subDomain = await SubDomain.create({ name, tenantId });
    return new Response(JSON.stringify(subDomain), { status: 201 });
}

export async function PUT(req: Request) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id, name } = await req.json();
    await SubDomain.updateOne({ _id }, { name });
    return new Response(JSON.stringify(true), { status: 200 });
}

export async function GET(req: Request) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const tenantId = req.headers.get('x-tenant-id');
    const subDomains = await SubDomain.find({ tenantId });
    return new Response(JSON.stringify(subDomains), { status: 200 });
}

export async function DELETE(req: Request) {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const { _id } = await req.json();
    await SubDomain.deleteOne({ _id });
    return new Response(JSON.stringify(true), { status: 200 });
}

