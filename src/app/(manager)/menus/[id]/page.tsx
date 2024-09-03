import React from 'react';
import MenuConfigurator from './_components/menu-configurator';
import mongoose from 'mongoose';
import { Menu } from '@/models/Menu';

export default async function Page({ params }: { params: { id: string } }) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI ?? '');
    }

    const menu = await Menu.findOne({ _id: params.id }).populate('menuItems').exec();

    const plainMenu = menu?.toObject();
    
    return (
        <>
            <MenuConfigurator menu={plainMenu} />
        </>
    );
}
