import React from 'react';
import { Editor } from '@tiptap/core';
import { Card } from 'chaya-ui';
import clsx from 'clsx';

type TopMenu = {
  editor: Editor | null,
};

const TopMenu = ({ editor }: TopMenu) => {

  const controlCommands = [
    {
      name: 'undo',
      icon: 'arrow-go-back-line',
      label: 'Undo',
      command: () => editor?.chain().focus().undo().run(),
    },
    {
      name: 'redo',
      icon: 'arrow-go-forward-line',
      label: 'Redo',
      command: () => editor?.chain().focus().redo().run(),
    },
  ];


  const primaryCommands = [
    {
      name: 'bold',
      icon: 'bold',
      label: 'Bold',
      command: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      name: 'italic',
      icon: 'italic',
      label: 'Italic',
      command: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      name: 'underline',
      icon: 'underline',
      label: 'Underline',
      command: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      name: 'strike',
      icon: 'strikethrough',
      label: 'Strike',
      command: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      name: 'code',
      icon: 'code-view',
      label: 'Code',
      command: () => editor?.chain().focus().toggleCode().run(),
    },
  ];

  const secondaryCommands = [
    {
      name: 'orderedList',
      icon: 'list-ordered',
      label: 'Ordered List',
      command: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      name: 'bulletList',
      icon: 'list-unordered',
      label: 'Bullet List',
      command: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      name: 'blockquote',
      icon: 'quote-text',
      label: 'Blockquote',
      command: () => editor?.chain().focus().toggleBlockquote().run(),
    },

  ];

  return editor ? (
      <Card className="px-1 py-0 h-fit rounded-none">
          <div className="flex items-center gap-0.5">
              <div className="flex items-center gap-0.5">
                  {controlCommands.map(({ name, icon, command }) => (
                      <button
                          key={name}
                          onClick={command}
                          className={clsx([
                            `ri-${icon}`,
                            'px-1.5 py-0.5 rounded-none hover:bg-gray-200',
                            editor.isActive(name) ? 'font-bold' : 'font-normal opacity-80',
                          ])}
                      />
                  ))}
              </div>
              <div className="flex items-center gap-0.5 px-2">
                  {primaryCommands.map(({ name, icon, command }) => (
                      <button
                          key={name}
                          onClick={command}
                          className={clsx([
                            `ri-${icon}`,
                            'px-1.5 py-0.5 rounded-none hover:bg-gray-200',
                            editor.isActive(name) ? 'font-bold' : 'font-normal opacity-80',
                          ])}
                      />
                  ))}
              </div>
              <div className="flex items-center gap-0.5">
                  {secondaryCommands.map(({ name, icon, command }) => (
                      <button
                          key={name}
                          onClick={command}
                          className={clsx([
                            `ri-${icon}`,
                            'px-1.5 py-0.5 rounded-none hover:bg-gray-200',
                            editor.isActive(name) ? 'font-bold' : 'font-normal opacity-80',
                          ])}
                      />
                  ))}
              </div>
          </div>
      </Card>
  ) : <div />;

};

export default TopMenu;