import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ChayaEditor, ChayaEditorProps } from '../index';
import { ChayaEditorRefType } from '../components/Editor';

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

  const ref = React.useRef<ChayaEditorRefType>(null);

  return (
      <div>
          <ChayaEditor ref={ref} {...args} />
          <div className="mt-2">
              The following buttons use ref
              <div className="flex flex-wrap gap-2">
                  <button onClick={() => ref.current?.clear()}>Clear</button>
                  <button onClick={() => ref.current?.focus()}>Focus</button>
              </div>
          </div>
      </div>
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
