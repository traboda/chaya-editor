import React, { useCallback } from 'react';
import { Editor } from '@tiptap/core';

import FontSizeSelector from './components/FontSizeSelector';

export type MenuCommands = (
  'UNDO' | 'REDO' |
  'FONT_SIZE' |
  'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKE' | 'SUPERSCRIPT' | 'SUBSCRIPT' | 'CODE' | 'BLOCKQUOTE' |
  'ORDERED_LIST' | 'BULLET_LIST' | 'TASK_LIST' | 'INDENT_INCREASE' | 'INDENT_DECREASE' |
  'HYPERLINK' | 'EDIT_HYPERLINK'
);

export type MenuCommandConfig<Type> = {
  name: Type,
  icon: string,
  label: string,
  onClick: () => void,
  isHidden?: boolean,
  isActive?: (editor: Editor) => boolean,
  customRender?: (editor: Editor) => React.ReactElement,
};

const getMenuCommands = (editor: Editor, commandNames: MenuCommands[]) => {

  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }
    editor.chain().focus().extendMarkRange('hyperlink').setHyperlink({ href: '' }).run();
  }, [editor]);

  const editHyperLinkText = useCallback(() => {
    if (!editor) {
      return null;
    }
    const { from } = editor.view.state.selection;
    const selectedNode = editor.view.domAtPos(from - 1).node as HTMLElement;

    let link: HTMLAnchorElement | null = null;

    if (selectedNode?.nodeName === '#text') {
      link = (selectedNode.parentNode as HTMLElement)?.closest('a');
    } else {
      link = selectedNode?.closest('a');
    }

    const newText = window.prompt('Edit Hyperlink Text', link?.innerText);

    if (newText === null) return;

    editor.chain().focus().editHyperLinkText(newText);
  }, [editor]);


  const COMMANDS_LIST: MenuCommandConfig<MenuCommands>[] = [
    {
      name: 'FONT_SIZE',
      icon: 'ri-font-size',
      label: 'Font Size',
      onClick: () => null,
      customRender: (editor) => <FontSizeSelector editor={editor} />,
    },
    {
      name: 'UNDO',
      icon: 'ri-arrow-go-back-line',
      label: 'Undo',
      onClick: () => editor?.chain().focus().undo().run(),
    },
    {
      name: 'REDO',
      icon: 'ri-arrow-go-forward-line',
      label: 'Redo',
      onClick: () => editor?.chain().focus().redo().run(),
    },
    {
      name: 'BOLD',
      icon: 'ri-bold',
      label: 'Bold',
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      name: 'ITALIC',
      icon: 'ri-italic',
      label: 'Italic',
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      name: 'UNDERLINE',
      icon: 'ri-underline',
      label: 'Underline',
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      name: 'STRIKE',
      icon: 'ri-strikethrough',
      label: 'Strike',
      onClick: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      name: 'SUPERSCRIPT',
      icon: 'ri-superscript',
      label: 'Superscript',
      onClick: () => editor?.chain().focus().toggleSuperscript().run(),
    },
    {
      name: 'SUBSCRIPT',
      icon: 'ri-subscript',
      label: 'Subscript',
      onClick: () => editor?.chain().focus().toggleSubscript().run(),
    },
    {
      name: 'CODE',
      icon: 'ri-code-view',
      label: 'Code',
      onClick: () => editor?.chain().focus().toggleCode().run(),
    },
    {
      name: 'ORDERED_LIST',
      icon: 'ri-list-ordered',
      label: 'Ordered List',
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      name: 'BULLET_LIST',
      icon: 'ri-list-unordered',
      label: 'Bullet List',
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      name: 'TASK_LIST',
      icon: 'ri-list-check-3',
      label: 'Task List',
      onClick: () => editor?.chain().focus().toggleTaskList().run(),
    },
    {
      name: 'INDENT_INCREASE',
      icon: 'ri-indent-increase',
      label: 'Indent Increase',
      onClick: () => editor?.chain().focus().sinkListItem('listItem').run(),
      isHidden: !editor?.can().sinkListItem('listItem'),
    },
    {
      name: 'INDENT_DECREASE',
      icon: 'ri-indent-decrease',
      label: 'Indent Decrease',
      onClick: () => editor?.chain().focus().liftListItem('listItem').run(),
      isHidden: !editor?.can().liftListItem('listItem'),
    },
    {
      name: 'BLOCKQUOTE',
      icon: 'ri-quote-text',
      label: 'Blockquote',
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
    },
    {
      name: 'HYPERLINK',
      icon: 'ri-link',
      label: 'Hyperlink',
      onClick: setLink,
    },
    {
      name: 'EDIT_HYPERLINK',
      icon: 'ri-link',
      label: 'Edit Link',
      isHidden: !editor?.isActive('hyperlink'),
      onClick: editHyperLinkText,
    },
  ];

  return COMMANDS_LIST.filter(({ name }) => commandNames.includes(name)).filter(({ isHidden }) => !isHidden);

};

export default getMenuCommands;
