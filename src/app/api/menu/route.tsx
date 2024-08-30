import { Menu } from '@/models/Menu';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

if (!mongoose.connection.readyState) {
    console.log('Connecting to database');
    mongoose.connect(process.env.MONGODB_URI ?? '').catch((err) => {
        console.error('Failed to connect to database', err);
    });
}

export async function POST(req: NextRequest) {
    try {
        console.log('Creating menu');
        const { name } = await req.json();
        const menu = await new Menu({ name, menuItems: [] }).save();
        return NextResponse.json(menu, { status: 201 });
    } catch (error) {
        console.error('Error creating menu:', error);
        return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { _id, name } = await req.json();
    await Menu.updateOne({ _id }, { name });
    return Response.json(true);
}

export async function GET(req: NextRequest) {
    const menus = await Menu.find();
    return Response.json(menus);
}
