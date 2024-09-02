import { Menu } from '@/models/Menu';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    if (!mongoose.connection.readyState) {
        mongoose.connect(process.env.MONGODB_URI ?? '').catch((err) => {
            console.error('Failed to connect to database', err);
        });
    }

    try {
        const tenantId = req.headers.get('x-tenant-id');
        const { name } = await req.json();
        const menu = await new Menu({ name, menuItems: [], tenantId }).save();
        return NextResponse.json(menu, { status: 201 });
    } catch (error) {
        console.error('Error creating menu:', error);
        return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 });
    }
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
