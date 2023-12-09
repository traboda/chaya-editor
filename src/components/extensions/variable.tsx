import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ReactRenderer } from '@tiptap/react';
import { SuggestionOptions } from '@tiptap/suggestion';
import tippy, { GetReferenceClientRect } from 'tippy.js';
import { Button } from 'chaya-ui';
import clsx from 'clsx';

import Mention from './mention';

// eslint-disable-next-line import/no-unused-modules
export const VariableList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex(
          (selectedIndex + props.items.length - 1) % props.items.length,
        );
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  return (
      <div
          className="p-1 border border-neutral-200/50 rounded shadow flex flex-col gap-0.5 dsr-bg-background-lighten-1"
      >
          {props?.items?.length ? (
            props?.items?.map((item: string, index: number) => (
                <Button
                    variant="link"
                    color="contrast"
                    key={index}
                    onClick={() => selectItem(index)}
                    className={clsx([
                      'w-full justify-start text-left !no-underline hover:bg-gray-300 rounded px-1 py-1',
                      selectedIndex === index ? '!bg-gray-300/50' : undefined,
                    ])}
                >
                    {item}
                </Button>
            ))
          ) : (
              <div
                  className="mly-flex mly-w-full mly-items-center mly-space-x-2 mly-rounded-md mly-px-2 mly-py-1 mly-text-left mly-text-sm mly-text-gray-900 hover:mly-bg-gray-100"
              >
                  No result
              </div>
          )}
      </div>
  );
});

VariableList.displayName = 'VariableList';

// eslint-disable-next-line import/no-unused-modules
export const suggestion: Omit<SuggestionOptions, 'editor'> = {
  items: ({ query }) => {
    return [query.toLowerCase()];
  },
  char: '{{',
  render: () => {
    let component: ReactRenderer<any>;
    let popup: InstanceType<any> | null = null;

    return {
      onStart: (props) => {
        component = new ReactRenderer(VariableList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0]?.setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup?.[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.[0].destroy();
        component.destroy();
      },
    };
  },
};

const Variable = Mention.extend({
  name: 'variable',
  parseHTML() {
    return [
      {
        tag: 'span[data-type="variable"]',
      },
    ];
  },
}).configure({
  suggestion,
  renderLabel({ node }) {
    return `{{ ${node.attrs.label ?? node.attrs.id} }}`;
  },
});


export default Variable;
