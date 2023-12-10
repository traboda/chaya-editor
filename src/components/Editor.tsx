import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import clsx from 'clsx';
import '../styles.scss';

import BubbleMenu from './BubbleMenu';
import { extensions, VariablesConfig } from './extensions';
import EditorMenu, { EditorMenuGroupType } from './Menu';

export type ChayaEditorProps = {
  id?: string,
  className?: string,
  editorClassName?: string,
  value?: string,
  isDisabled?: boolean,
  onChange?: (value: string) => void,
  variables?: VariablesConfig,
  menuBar?: {
    className?: string,
    position?: 'TOP' | 'BOTTOM',
    groups?: EditorMenuGroupType[],
  },
  bubbleMenu?: {
    className?: string,
    groups?: EditorMenuGroupType[],
  },
};

const DEFAULT_MENU_BAR_GROUPS: EditorMenuGroupType[] = [
  { commands: [ { name: 'UNDO' }, { name: 'REDO' }] },
  { commands: [ { name: 'BOLD' }, { name: 'ITALIC' }, { name: 'UNDERLINE' }, { name: 'STRIKE' }, { name: 'SUPERSCRIPT' }, { name: 'SUBSCRIPT' }, { name: 'CODE' }, { name: 'BLOCKQUOTE' }] },
  { commands: [ { name: 'ORDERED_LIST' }, { name: 'BULLET_LIST' }, { name: 'TASK_LIST' }, { name: 'INDENT_INCREASE' }, { name: 'INDENT_DECREASE' }] },
];

const DEFAULT_BUBBLE_MENU_COMMANDS: EditorMenuGroupType[] = [
  { commands: [ { name: 'BOLD' }, { name: 'ITALIC' }, { name: 'UNDERLINE' }, { name: 'STRIKE' }, { name: 'HYPERLINK' }, { name: 'EDIT_HYPERLINK' }] },
];

const ChayaEditor = ({
  id, className, editorClassName, value = '',
  variables, menuBar = { position: 'TOP' }, bubbleMenu = {},
  isDisabled = false,
  onChange = () => {},
}: ChayaEditorProps) => {

  const parseValue = (value: string) => {
    if (variables) {
      const regex = new RegExp('{{(.*?)}}', 'g');
      return value.replace(regex, (match, p1) => {
        return `<span data-type="variable" data-id="${p1.trim()}" contenteditable="false">{{ ${p1.trim()} }}</span>`;
      });
    }
    return value;
  };

  const parseOutput = (value: string) => {
    if (variables) {
      if (variables?.highlightClassName) {
        const regex = new RegExp(`class="${variables.highlightClassName}"`, 'g');
        return value.replace(regex, '');
      }
    }
    return value;
  };

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
    content: parseValue(value),
    onUpdate: ({ editor }) => {
      if (typeof onChange == 'function')
        onChange(parseOutput(editor.getHTML()));
    },
  });

  const renderMenuBar = menuBar && editor ? (
      <div
          className={clsx([
            'px-2 py-1 h-fit rounded-none dsr-bg-background-lighten-1',
            menuBar?.position === 'BOTTOM' ? 'border-t' : 'border-b',
            menuBar?.className,
          ])}
      >
          <EditorMenu editor={editor} groups={menuBar.groups || DEFAULT_MENU_BAR_GROUPS} />
      </div>
  ) : null;

  return editor ? (
      <div id={id} className={clsx(['border', className])}>
          {menuBar && menuBar?.position === 'TOP' ? renderMenuBar : null}
          {bubbleMenu && <BubbleMenu editor={editor} groups={bubbleMenu?.groups || DEFAULT_BUBBLE_MENU_COMMANDS} />}
          <EditorContent
              className={clsx([
                'w-full h-full rounded-none p-2 outline-0 dsr-bg-background shadow-inner',
                'editor-container', editorClassName,
              ])}
              editor={editor}
          />
          {menuBar && menuBar?.position === 'BOTTOM' ? renderMenuBar : null}
      </div>
  ) : <div />;

};

export default ChayaEditor;