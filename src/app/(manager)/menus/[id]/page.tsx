import React from 'react';
import MenuConfigurator from './_components/menu-configurator';
import mongoose, { InferSchemaType } from 'mongoose';
import { Menu, MenuType } from '@/models/Menu';
import { MenuItemType } from '@/models/MenuItem';

export default async function Page({ params }: { params: { id: string } }) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI ?? '');
    }

    const menu = await Menu.findOne({ _id: params.id }).populate<{menuItems: MenuItemType[]}>('menuItems').lean().exec();

    const plainMenu: Omit<MenuType, 'menuItems'> & {menuItems: MenuItemType[]} = JSON.parse(JSON.stringify(menu));

    return (
        <>
            <MenuConfigurator menu={plainMenu} />
        </>
    );
}