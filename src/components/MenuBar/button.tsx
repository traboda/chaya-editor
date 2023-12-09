import React from 'react';
import clsx from 'clsx';
import { Editor } from '@tiptap/core';

const MenuBarButton = ({
  name, icon, onClick, editor,
}: {
  name: string, icon: string, onClick: () => void, editor: Editor
}) => (
    <button
        onClick={onClick}
        className={clsx([
          `ri-${icon}`,
          editor.isActive(name) ? ' font-bold' : 'opacity-80',
          'px-1.5 py-0.5 text-lg rounded hover:bg-neutral-300/50',
        ])}
    />
);

export default MenuBarButton;