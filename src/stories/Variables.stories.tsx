import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ChayaEditor, ChayaEditorProps } from '../index';

const meta: Meta = {
  title: 'Variables',
  component: ChayaEditor,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<ChayaEditorProps>;

const HTML_WITH_VARIABLES = `
<p>
   Hi <span data-type="variable" data-id="name" contenteditable="false">{{ name }}</span>,
</p>
<p>
    Here is your profile information:
</p>
<ul>
    <li>Email: {{ email }}</li>
    <li>Phone: {{ phone }}</li>
    <li>Address: {{ address }}</li>
</ul>
`;

const variables = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'address', label: 'Address' },
  { id: 'city', label: 'City' },
];

export const BasicUsageWithVariables: Story = {
  args: {
    variables: {
      highlightClassName: '',
      onFetch: () => Promise.resolve(variables),
      allowSpaces: false,
      items: variables,
    },
    value: HTML_WITH_VARIABLES,
  },
  argTypes: {
    variables: {
      description: 'Configuration for the variables feature.',
      control: {
        type: 'object',
      },
    },
  },
  render: (args: ChayaEditorProps) => (
      <ChayaEditor {...args} />
  ),
};

const VariableStoryTemplate = (args: ChayaEditorProps) => {

  const [value, setValue] = React.useState(args.value);

  return (
      <div className="flex flex-col gap-3">
          <ChayaEditor {...args} value={value} onChange={setValue} />
          <div>
              This is how the HTML output (from
              {' '}
              <pre className="inline italic">onChange()</pre>
              ) will be:
          </div>
          <div className="font-mono border p-4 border-dashed bg-neutral-200/20">
              {value}
          </div>
      </div>
  );

};

export const VariablesHighlighted: Story = {
  args: {
    variables: {
      highlightClassName: 'bg-yellow-200/50 text-blue-600 p-1 rounded',
      items: variables,
    },
    value: HTML_WITH_VARIABLES,
  },
  render: VariableStoryTemplate,
};

export const AsyncVariables: Story = {
  args: {
    variables: {
      onFetch: (pokemon: string) => {
        const pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
        return fetch(`${pokeAPI}/${pokemon}`)
          .then((res) => res.json())
          .then((res) => {
            return [
              { id: res.name, label: res.name },
            ];
          });
      },
    },
    value: '<p>Enter names of pokemons as variables, and it will try to fetch from pokeapi...</p>',
  },
  render:  (args: ChayaEditorProps) => (
      <ChayaEditor {...args} />
  ),
};




