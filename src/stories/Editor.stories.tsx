import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ChayaEditor, ChayaEditorProps } from '../index';

const meta: Meta = {
  title: 'Editor',
  component: ChayaEditor,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const HTML_CONTENT = `
<p>
  <b>Lorem ipsum</b> dolor sit amet, consectetur <s>adipiscing elit</s>. Praesent pretium porttitor erat, ac <u>commodo purus 
  gravida posuere.</u> Donec dui mi, venenatis vel odio vitae, vulputate bibendum risus. Donec metus leo, scelerisque 
  vitae nulla a, dictum pulvinar risus. <em>In cursus sapien non lorem dictum volutpat.</em>
</p>

<p> 

    <a href="http://www.google.com">This is a link</a>
</p>

<p>
<b>This is a bold text</b>
</p>

<p>
<i>This is an italic text</i>
</p>

<p>
<u>This is an underline text</u>
</p>

<p>
<s>This is a strike text</s>
</p>

<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>
      Item 3
      <ul>
        <li>Item 3.1</li>
        <li>Item 3.2</li>
      </ul>  
  </li>
</ul>
  
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>
      Item 3
      <ol>
        <li>Item 3.1</li>
        <li>Item 3.2</li>
      </ol>  
  </li>
 </ol>
`;

const Template: Story<ChayaEditorProps> = args => {

  return (
      <ChayaEditor {...args} />
  );

};

export const BasicEditor = Template.bind({});

BasicEditor.args = {
  value: HTML_CONTENT,
};

export const WithVariables = Template.bind({});

WithVariables.args = {
  value: HTML_CONTENT,
  variables: {
    items: [
      'Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Country', 'Zip Code',
    ],
  },
};

