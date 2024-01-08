import React, { useCallback } from 'react';
import { Editor } from '@tiptap/core';

import FontSizeSelector from './components/FontSizeSelector';
import ColorSelector from './components/ColorSelector';
import TableCreator from './components/TableCreator';

export type MenuCommands = (
  'UNDO' | 'REDO' |
  'FONT_SIZE' | 'COLOR' | 'TABLE' |
  'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKE' | 'SUPERSCRIPT' | 'SUBSCRIPT' | 'CODE' | 'BLOCKQUOTE' |
  'ORDERED_LIST' | 'BULLET_LIST' | 'TASK_LIST' | 'INDENT_INCREASE' | 'INDENT_DECREASE' |
  'LEFT_ALIGN' | 'CENTER_ALIGN' | 'RIGHT_ALIGN' | 'JUSTIFY_ALIGN' |
  'HYPERLINK' | 'EDIT_HYPERLINK'
);

export type MenuCommandConfig<Type> = {
  name: Type,
  label: string,
  icon?: string,
  onClick?: () => void,
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
      label: 'Font Size',
      customRender: (editor) => <FontSizeSelector editor={editor} />,
      isHidden: !editor?.can().setFontSize('16px'),
    },
    {
      name: 'COLOR',
      label: 'Color',
      customRender: (editor) => <ColorSelector editor={editor} />,
      isHidden: !editor?.can().setColor('#000'),
    },
    {
      name: 'TABLE',
      label: 'Table',
      customRender: (editor) => <TableCreator editor={editor} />,
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
      isHidden: !editor?.can().toggleBold(),
    },
    {
      name: 'ITALIC',
      icon: 'ri-italic',
      label: 'Italic',
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isHidden: !editor?.can().toggleItalic(),
    },
    {
      name: 'UNDERLINE',
      icon: 'ri-underline',
      label: 'Underline',
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      isHidden: !editor?.can().toggleUnderline(),
    },
    {
      name: 'STRIKE',
      icon: 'ri-strikethrough',
      label: 'Strike',
      onClick: () => editor?.chain().focus().toggleStrike().run(),
      isHidden: !editor?.can().toggleStrike(),
    },
    {
      name: 'SUPERSCRIPT',
      icon: 'ri-superscript',
      label: 'Superscript',
      onClick: () => editor?.chain().focus().toggleSuperscript().run(),
      isHidden: !editor?.can().toggleSuperscript(),
    },
    {
      name: 'SUBSCRIPT',
      icon: 'ri-subscript',
      label: 'Subscript',
      onClick: () => editor?.chain().focus().toggleSubscript().run(),
      isHidden: !editor?.can().toggleSubscript(),
    },
    {
      name: 'CODE',
      icon: 'ri-code-view',
      label: 'Code',
      onClick: () => editor?.chain().focus().toggleCode().run(),
      isHidden: !editor?.can().toggleCode(),
    },
    {
      name: 'ORDERED_LIST',
      icon: 'ri-list-ordered',
      label: 'Ordered List',
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isHidden: !editor?.can().toggleOrderedList(),
    },
    {
      name: 'BULLET_LIST',
      icon: 'ri-list-unordered',
      label: 'Bullet List',
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isHidden: !editor?.can().toggleBulletList(),
    },
    {
      name: 'TASK_LIST',
      icon: 'ri-list-check-3',
      label: 'Task List',
      onClick: () => editor?.chain().focus().toggleTaskList().run(),
      isHidden: !editor?.can().toggleTaskList(),
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
      isHidden: !editor?.can().toggleBlockquote(),
    },
    {
      name: 'HYPERLINK',
      icon: 'ri-link',
      label: 'Hyperlink',
      onClick: setLink,
      isHidden: !editor?.can().setFontSize('16px'),
    },
    {
      name: 'EDIT_HYPERLINK',
      icon: 'ri-link',
      label: 'Edit Link',
      isHidden: !editor?.isActive('hyperlink'),
      onClick: editHyperLinkText,
    },
    {
      name: 'LEFT_ALIGN',
      icon: 'ri-align-left',
      label: 'Left Align',
      onClick: () => editor?.chain().focus().setTextAlign('left').run(),
      isHidden: !editor?.can().setTextAlign('left'),
    },
    {
      name: 'CENTER_ALIGN',
      icon: 'ri-align-center',
      label: 'Center Align',
      onClick: () => editor?.chain().focus().setTextAlign('center').run(),
      isHidden: !editor?.can().setTextAlign('center'),
    },
    {
      name: 'RIGHT_ALIGN',
      icon: 'ri-align-right',
      label: 'Right Align',
      onClick: () => editor?.chain().focus().setTextAlign('right').run(),
      isHidden: !editor?.can().setTextAlign('right'),
    },
    {
      name: 'JUSTIFY_ALIGN',
      icon: 'ri-align-justify',
      label: 'Justify Align',
      onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
      isHidden: !editor?.can().setTextAlign('justify'),
    },
  ];

  return COMMANDS_LIST.filter(({ name }) => commandNames.includes(name)).filter(({ isHidden }) => !isHidden);

};

export default getMenuCommands;
