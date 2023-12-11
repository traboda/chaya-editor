import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ChayaEditor, ChayaEditorProps } from '../index';

import { SAMPLE_EDITOR_CONTENT } from './utils/sample-content';

const meta: Meta = {
  title: 'Menu Bar',
  component: ChayaEditor,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<ChayaEditorProps>;

export const BasicPreviewOfMenuBar: Story = {
  name: 'Basic Preview',
  args: {
    value: SAMPLE_EDITOR_CONTENT,
  },
  render: (args) => (
      <div className="h-[40vh]">
          <ChayaEditor {...args} />
      </div>
  ),
};

export const WithoutMenuBar: Story = {
  name: 'Disabled',
  args: {
    value: SAMPLE_EDITOR_CONTENT,
    menuBar: false,
  },
  render: (args) => (
      <div className="h-[40vh]">
          <ChayaEditor {...args} />
      </div>
  ),
};

export const BottomPositionedMenuBar: Story = {
  name: 'Bottom Positioned',
  args: {
    value: SAMPLE_EDITOR_CONTENT,
    menuBar: {
      position: 'BOTTOM',
    },
  },
  render: (args) => (
      <div className="h-[40vh]">
          <ChayaEditor {...args} />
      </div>
  ),
};