import React from 'react';
import { Editor } from '@tiptap/core';
import clsx from 'clsx';

import getMenuCommands, { MenuCommandConfig, MenuCommands } from './commands';

export type EditorMenuGroupType = {
  commands: {
    name?: MenuCommands,
    customCommand?: (editor: Editor) => MenuCommandConfig<string>,
  }[],
};

export type EditorMenuProps = {
  editor: Editor,
  groups: EditorMenuGroupType[],
};

const EditorMenu = ({ editor, groups }: EditorMenuProps) => (
    <div className="flex items-center">
        {groups.map((group, index) => {
          const commandNames = group.commands.filter((c) => c.name).map((c) => c.name) as MenuCommands[];
          const commands = getMenuCommands(editor, commandNames);
          return (
              <div className={clsx(['flex items-center py-1 justify-center gap-0.5 border-neutral-200/50', groups?.length == 1 ? 'px-0.5' : index + 1 == groups.length ? 'pl-1 pr-0' : 'border-r px-2'])}>
                  {group.commands.map(({ customCommand, name }) => {
                    const command = name ? commands.find((c) => c.name === name) : customCommand?.(editor);
                    return command && !command.isHidden ? command?.customRender ? command.customRender(editor) : (
                        <button
                            onClick={command?.onClick}
                            className={clsx([
                              command?.icon,
                              (typeof command.isActive === 'function' ? command.isActive(editor) : editor.isActive(command.name.toLowerCase())) ? ' font-bold' : 'opacity-80',
                              'px-1.5 py-0.5 text-lg rounded hover:bg-neutral-300/50',
                            ])}
                        />
                    ) : null;
                  })}
              </div>
          );
        })}
    </div>
);

export default EditorMenu;