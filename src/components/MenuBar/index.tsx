import React from 'react';
import { Editor } from '@tiptap/core';
import clsx from 'clsx';

import MenuBarButton from './button';

type MenuActions = (
  'UNDO' | 'REDO' |
  'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKE' | 'SUPERSCRIPT' | 'SUBSCRIPT' | 'CODE' | 'BLOCKQUOTE' |
  'ORDERED_LIST' | 'BULLET_LIST' | 'TASK_LIST' | 'INDENT_INCREASE' | 'INDENT_DECREASE'
);

export type MenuBarProps = {
  editor: Editor | null,
  className?: string,
  groups: {
    actions: MenuActions[],
  }[],
};

const MenuBar = ({ editor, className, groups }: MenuBarProps) => {

  const COMMANDS_LIST = [
    {
      name: 'UNDO',
      icon: 'arrow-go-back-line',
      label: 'Undo',
      command: () => editor?.chain().focus().undo().run(),
    },
    {
      name: 'REDO',
      icon: 'arrow-go-forward-line',
      label: 'Redo',
      command: () => editor?.chain().focus().redo().run(),
    },
    {
      name: 'BOLD',
      icon: 'bold',
      label: 'Bold',
      command: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      name: 'ITALIC',
      icon: 'italic',
      label: 'Italic',
      command: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      name: 'UNDERLINE',
      icon: 'underline',
      label: 'Underline',
      command: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      name: 'STRIKE',
      icon: 'strikethrough',
      label: 'Strike',
      command: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      name: 'SUPERSCRIPT',
      icon: 'superscript',
      label: 'Superscript',
      command: () => editor?.chain().focus().toggleSuperscript().run(),
    },
    {
      name: 'SUBSCRIPT',
      icon: 'subscript',
      label: 'Subscript',
      command: () => editor?.chain().focus().toggleSubscript().run(),
    },
    {
      name: 'CODE',
      icon: 'code-view',
      label: 'Code',
      command: () => editor?.chain().focus().toggleCode().run(),
    },
    {
      name: 'ORDERED_LIST',
      icon: 'list-ordered',
      label: 'Ordered List',
      command: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      name: 'BULLET_LIST',
      icon: 'list-unordered',
      label: 'Bullet List',
      command: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      name: 'TASK_LIST',
      icon: 'list-check-3',
      label: 'Task List',
      command: () => editor?.chain().focus().toggleTaskList().run(),
    },
    {
      name: 'INDENT_INCREASE',
      icon: 'indent-increase',
      label: 'Indent Increase',
      command: () => editor?.chain().focus().sinkListItem('listItem').run(),
      isDisabled: !editor?.can().sinkListItem('listItem'),
    },
    {
      name: 'INDENT_DECREASE',
      icon: 'indent-decrease',
      label: 'Indent Decrease',
      command: () => editor?.chain().focus().liftListItem('listItem').run(),
      isDisabled: !editor?.can().liftListItem('listItem'),
    },
    {
      name: 'BLOCKQUOTE',
      icon: 'quote-text',
      label: 'Blockquote',
      command: () => editor?.chain().focus().toggleBlockquote().run(),
    },

  ];

  return editor ? (
      <div className={clsx(['px-2 py-1 h-fit rounded-none dsr-bg-background-lighten-1 border-b', className])}>
          <div className="flex items-center space-x-3">
              {groups.map((group) => (
                  <div className="flex items-center gap-0.5">
                      {group.actions.map((action) => {
                        const command = COMMANDS_LIST.find((c) => c.name === action);
                        return command ? (
                            <MenuBarButton
                                key={command.name}
                                name={command.name.toLowerCase()}
                                icon={command.icon}
                                onClick={command.command}
                                editor={editor}
                            />
                        ) : null;
                      })}
                  </div>
              ))}
          </div>
      </div>
  ) : <div />;

};

export default MenuBar;