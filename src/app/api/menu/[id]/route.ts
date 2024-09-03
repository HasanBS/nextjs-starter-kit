import { Menu } from '@/models/Menu';
import { MenuItemType } from '@/models/MenuItem';
import mongoose from 'mongoose';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!mongoose.connection.readyState) {
        console.log('Connecting to database');
        try {
            await mongoose.connect(process.env.MONGODB_URI ?? '');
        } catch (err) {
            console.error('Failed to connect to database', err);
            return new Response(JSON.stringify({ error: 'Failed to connect to database' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    const menu = await Menu.findOne({ _id: params.id }).populate<{menuItems: MenuItemType[]}>('menuItems').lean().exec();

    return new Response(JSON.stringify(menu), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!mongoose.connection.readyState) {
        console.log('Connecting to database');
        try {
            await mongoose.connect(process.env.MONGODB_URI ?? '');
        } catch (err) {
            console.error('Failed to connect to database', err);
            return new Response(JSON.stringify({ error: 'Failed to connect to database' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    const menu = await Menu.findOneAndDelete({ _id: params.id });

    return new Response(JSON.stringify(menu), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
