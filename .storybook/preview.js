import React from "react";
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import { DocsContainer } from '@storybook/addon-docs';

import '../dist/style.css';

export { decorators } from "./decorators";

export const parameters = {
  viewMode: 'docs',
  parameters: {
    darkMode: {
      current: 'dark',
      dark: {
        ...themes.dark,
        brandTitle: 'Chaya Editor by Traboda',
        brandUrl: 'https://chaya-editor.traboda.com',
        brandImage: 'chaya-white-logo.svg',
        brandTarget: '_self',
      },
      light: {
        ...themes.normal,
        brandTitle: 'Chaya Editor by Traboda',
        brandUrl: 'https://chaya-editor.traboda.com',
        brandImage: 'chaya-black-logo.svg',
        brandTarget: '_self',
      },
      classTarget: 'body',
      stylePreview: true,
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3',
        ignoreSelector: '#primary',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
      container: (context) => {
        const isDark = useDarkMode();

        const props = {
          ...context,
          theme: isDark ? themes.dark : themes.light,
        };

        return React.createElement(DocsContainer, props);
      },
    },
  },
}
