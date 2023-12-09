import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import clsx from 'clsx';
import '../styles.scss';

import BubbleMenu from './BubbleMenu';
import TopMenu from './TopMenu';
import { extensions } from './extensions';

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
    extensions: extensions({
      onFetchVariables: () => ([]),
    }),
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