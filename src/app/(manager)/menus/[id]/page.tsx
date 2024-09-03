import React from 'react';
import MenuConfigurator from './_components/menu-configurator';
import mongoose, { InferSchemaType } from 'mongoose';
import { Menu } from '@/models/Menu';

type MenuType = InferSchemaType<typeof Menu.schema>;
export default async function Page({ params }: { params: { id: string } }) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI ?? '');
    }

    const menu = await Menu.findOne({ _id: params.id }).populate('menuItems').lean<MenuType>();

    const serializedMenu: MenuType = JSON.parse(JSON.stringify(menu));

    return (
        <>
            <MenuConfigurator menu={serializedMenu} />
        </>
    );
}