import React from 'react';
import MenuConfigurator from './_components/menu-configurator';

export default async function Page({ params }: { params: { id: string } }) {
    const result = await fetch(`http://localhost:3000/api/menu/${params.id}`);
    const menu = await result.json();

    return (
        <>
            <MenuConfigurator menu={menu} />
        </>
    );
}
