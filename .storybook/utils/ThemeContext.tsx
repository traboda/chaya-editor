import React, { ReactNode } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { DSRContextProvider } from 'chaya-ui';
import { nanoid } from 'nanoid';

import 'chaya-ui/dist/style.css';

const defaultTheme = {
    primary: '#0f51c3',
    primaryTextColor: '#fff',
    secondary: '#77019e',
    secondaryTextColor: '#fff',
    color: '#333',
    background: '#FAFAFA',
};

const darkTheme = {
    primary: '#1d66e5',
    primaryTextColor: '#fff',
    secondary: '#b64fd7',
    secondaryTextColor: '#fff',
    color: '#FFF',
    background: '#111',
};

const ThemeContextDecorator = ({ children }: { children: ReactNode }) => {
    const theme = useDarkMode() ? darkTheme : defaultTheme;

    return (
        <div key={nanoid()}>
            <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet" />
            <DSRContextProvider
                theme={theme}
                iconWrapper={(icon, props) => (<i className={`ri-${icon} ${props?.className}`} {...props} />)}
            >
                {children}
            </DSRContextProvider>
        </div>
    );

};

export default ThemeContextDecorator;