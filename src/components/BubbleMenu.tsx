import React from 'react';
import { BubbleMenu as TipTapBubbleMenu } from '@tiptap/react';
import clsx from 'clsx';

import EditorMenu, { EditorMenuProps } from './Menu';

export type BubbleMenu = EditorMenuProps & {
  className?: string,
};

const BubbleMenu = ({ editor, groups, className }: BubbleMenu) => (
    <TipTapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className={clsx(['shadow dsr-bg-background-lighten-1 rounded px-0.5', className])}>
            <EditorMenu editor={editor} groups={groups} />
        </div>
    </TipTapBubbleMenu>
);

export default BubbleMenu;