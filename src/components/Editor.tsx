import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Underline } from '@tiptap/extension-underline';
import { StarterKit } from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import clsx from 'clsx';

import BubbleMenu from './BubbleMenu';
import TopMenu from './TopMenu';

type Editor = {
  id?: string,
  className?: string,
  editorClassName?: string,
  topbarClassName?: string,
  value?: string,
  onChange?: (value: string) => void,
  isDisabled?: boolean,
};


const Editor = ({
  id, className, editorClassName, topbarClassName, value, onChange, isDisabled,
}: Editor) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ListItem,
      BulletList,
      OrderedList,
      TaskList.configure({
        HTMLAttributes: {
          class: 'task-list',
        },
      }),
      TaskItem,
      Superscript,
      Subscript,
    ],
    editable: !isDisabled,
    editorProps: {
      attributes: {
        class: 'h-full w-full rounded-none outline-0',
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      if (typeof onChange == 'function')
        onChange(editor.getHTML());
    },
  });

  return (
      <div id={id} className={className}>
          <TopMenu editor={editor} className={topbarClassName} />
          <BubbleMenu editor={editor} />
          <EditorContent
              className={clsx([
                'w-full h-full rounded-none p-2 outline-0',
                'editor-container', editorClassName,
              ])}
              editor={editor}
          />
      </div>
  );

};

export default Editor;