import React from 'react';
import MenuConfigurator from './_components/menu-configurator';
import mongoose, { InferSchemaType } from 'mongoose';
import { Menu } from '@/models/Menu';
import { MenuItemType } from '@/models/MenuItem';

type MenuType = InferSchemaType<typeof Menu.schema>;
export default async function Page({ params }: { params: { id: string } }) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI ?? '');
    }

    const menu = await Menu.findOne({ _id: params.id }).populate<{menuItems: MenuItemType[]}>('menuItems').lean();
    
    return (
        <>
            <MenuConfigurator menu={menu} />
        </>
    );
}