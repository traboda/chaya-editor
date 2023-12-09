import React, { useCallback } from 'react';
import { BubbleMenu as TipTapBubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { Card } from 'chaya-ui';
import clsx from 'clsx';

type BubbleMenu = {
  editor: Editor | null,
};

const BubbleMenu = ({ editor }: BubbleMenu) => {

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
    {
      name: 'hyperlink',
      icon: 'link',
      label: 'Hyperlink',
      command: setLink,
    },
    {
      name: 'edit-link',
      icon: 'link',
      label: 'Edit Link',
      isHidden: () => !editor?.isActive('hyperlink'),
      command: editHyperLinkText,
    },
  ];

  return editor ? (
      <TipTapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="py-0 shadow dsr-bg-background-lighten-1 px-2">
              <div className="flex items-center gap-0">
                  {commands.filter((l) => !l.isHidden).map(({ name, icon, command, label }) => (
                      <button
                          key={name}
                          title={label}
                          onClick={command}
                          className={clsx([
                            `ri-${icon}`,
                            'px-1.5 py-0.5 rounded-none hover:bg-gray-200 text-lg',
                            editor.isActive(name) ? 'font-semibold text-primary' : 'font-normal',
                          ])}
                      />
                  ))}
              </div>
          </div>
      </TipTapBubbleMenu>
  ) : <div />;

};

export default BubbleMenu;