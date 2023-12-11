import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ChayaEditor, ChayaEditorProps } from '../index';

import { SAMPLE_EDITOR_CONTENT } from './utils/sample-content';

const meta: Meta = {
  title: 'Editor',
  component: ChayaEditor,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ChayaEditorProps> = args => {

  return (
      <ChayaEditor {...args} />
  );

};

export const BasicEditor = Template.bind({});

BasicEditor.args = {
  value: SAMPLE_EDITOR_CONTENT,
};

export const DisabledEditor = Template.bind({});

DisabledEditor.args = {
  value: SAMPLE_EDITOR_CONTENT,
  isDisabled: true,
};


export const WithBottomMenuBar = Template.bind({});

WithBottomMenuBar.args = {
  value: SAMPLE_EDITOR_CONTENT,
  menuBar: {
    position: 'BOTTOM',
  },
};
