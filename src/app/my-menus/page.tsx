import { MenusTable } from './menus-table';

const Menus = [
    {
        name: 'Menu 1',
        description: 'Menu 1 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 2',
        description: 'Menu 2 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 3',
        description: 'Menu 3 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
];

export default function Page() {
    return <MenusTable menus={Menus} />;
}
