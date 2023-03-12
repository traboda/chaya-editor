import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Underline } from '@tiptap/extension-underline';
import { StarterKit } from '@tiptap/starter-kit';
import clsx from 'clsx';

import BubbleMenu from './BubbleMenu';
import TopMenu from './TopMenu';

type Editor = {
  value?: string,
  onChange?: (value: string) => void,
  isDisabled?: boolean,
};

const Editor = ({ value, onChange, isDisabled }: Editor) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
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
      <React.Fragment>
          <TopMenu editor={editor} />
          <BubbleMenu editor={editor} />
          <EditorContent
              className={clsx([
                'w-full h-full rounded-none p-2 outline-0',
                'editor-container',
              ])}
              editor={editor}
          />
      </React.Fragment>
  );

};

export default Editor;