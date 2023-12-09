import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import clsx from 'clsx';
import '../styles.scss';

import BubbleMenu from './BubbleMenu';
import { extensions, MentionConfig } from './extensions';
import MenuBar, { MenuBarProps } from './MenuBar';

export type ChayaEditorProps = {
  id?: string,
  className?: string,
  editorClassName?: string,
  value?: string,
  isDisabled?: boolean,
  onChange?: (value: string) => void,
  variables?: MentionConfig,
  menuBar?: {
    className?: string,
    position?: 'TOP' | 'BOTTOM',
    groups?: MenuBarProps['groups'],
  },

};

const DEFAULT_MENU_BAR_GROUPS: MenuBarProps['groups'] = [
  { actions: ['UNDO', 'REDO'] },
  { actions: ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKE', 'SUPERSCRIPT', 'SUBSCRIPT', 'CODE', 'BLOCKQUOTE'] },
  { actions: ['ORDERED_LIST', 'BULLET_LIST', 'TASK_LIST', 'INDENT_INCREASE', 'INDENT_DECREASE'] },
];

const ChayaEditor = ({
  id, className, editorClassName, value,
  variables, menuBar = {
    position: 'TOP',
  },
  isDisabled = false,
  onChange = () => {},
}: ChayaEditorProps) => {

  const editor = useEditor({
    extensions: extensions({
      variables,
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

  const renderMenuBar = menuBar ? (
      <MenuBar
          editor={editor}
          className={menuBar.className}
          groups={menuBar.groups || DEFAULT_MENU_BAR_GROUPS}
      />
  ) : null;

  return (
      <div id={id} className={clsx(['border', className])}>
          {menuBar && menuBar?.position === 'TOP' ? renderMenuBar : null}
          <BubbleMenu editor={editor} />
          <EditorContent
              className={clsx([
                'w-full h-full rounded-none p-2 outline-0 dsr-bg-background shadow-inner',
                'editor-container', editorClassName,
              ])}
              editor={editor}
          />
          {menuBar && menuBar?.position === 'BOTTOM' ? renderMenuBar : null}
      </div>
  );

};

export default ChayaEditor;