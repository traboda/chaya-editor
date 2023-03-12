import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Editor } from '../index';


const meta: Meta = {
  title: 'Editor',
  component: Editor,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {

  return (
      <Editor {...args} />
  );
};

export const Default = Template.bind({});