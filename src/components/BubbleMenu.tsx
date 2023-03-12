import React from 'react';
import { BubbleMenu as TipTapBubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { Card, ToolTip } from 'chaya-ui';
import clsx from 'clsx';

type BubbleMenu = {
  editor: Editor | null,
};

const BubbleMenu = ({ editor }: BubbleMenu) => {

  const commands = [
    {
      name: 'bold',
      icon: 'bold',
      label: 'Bold',
      command: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      name: 'underline',
      icon: 'underline',
      label: 'Underline',
      command: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      name: 'italic',
      icon: 'italic',
      label: 'Italic',
      command: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      name: 'strike',
      icon: 'strikethrough',
      label: 'Strike',
      command: () => editor?.chain().focus().toggleStrike().run(),
    },
  ];

  return (
      <React.Fragment>
          {editor && (
          <TipTapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <Card className="py-0 bg-gray-100 px-2">
                  <div className="flex items-center gap-0">
                      {commands.map(({ name, icon, command, label }) => (
                          <ToolTip
                              key={name}
                              contentClassName="opacity-70"
                              overlay={(
                                  <div>
                                      {label}
                                  </div>
                              )}
                          >
                              <button
                                  onClick={command}
                                  className={clsx([
                                    `ri-${icon}`,
                                    'px-1.5 py-0.5 rounded-none hover:bg-gray-200',
                                    editor.isActive(name) ? 'font-bold text-primary' : 'font-normal',
                                  ])}
                              />
                          </ToolTip>

                      ))}
                  </div>
              </Card>
          </TipTapBubbleMenu>
          )}
      </React.Fragment>
  );

};

export default BubbleMenu;