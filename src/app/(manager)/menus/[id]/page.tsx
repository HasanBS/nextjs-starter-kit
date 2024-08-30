import React from 'react';
import MenuConfigurator from './_components/menu-configurator';

export default async function Page({ params }: { params: { id: string } }) {
    console.log('params:', params);
    const result = await fetch(`http://localhost:3000/api/menu/${params.id}`);
    const json = await result.json();
    console.log(json);

    return (
        <>
            <MenuConfigurator menu={''} />
        </>
    );
}
