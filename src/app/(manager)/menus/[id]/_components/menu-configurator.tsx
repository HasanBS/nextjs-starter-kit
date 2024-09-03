'use client';

import { MenuType } from '@/models/Menu';
import { MenuItemType } from '@/models/MenuItem';
import React from 'react';

export default function MenuConfigurator({ menu }: { menu: Omit<MenuType, 'menuItems'> & {menuItems: MenuItemType[]} }) {
    return <div>{JSON.stringify(menu)}</div>;
}
