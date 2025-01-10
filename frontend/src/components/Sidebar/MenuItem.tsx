import React from 'react';

interface MenuItemProps {
    children: React.ReactNode;
    icon: React.ReactNode;
    href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, icon, href }) => {
    return (
        <li>
            <a
                href={href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                {icon}
                <span className="ms-3">{children}</span>
            </a>
        </li>
    );
};

export default MenuItem;
