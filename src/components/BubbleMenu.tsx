import React from 'react';
import { BubbleMenu as TipTapBubbleMenu } from '@tiptap/react';
import clsx from 'clsx';

import EditorMenu, { EditorMenuProps } from './Menu';

export type BubbleMenu = EditorMenuProps & {
  className?: string,
};

const BubbleMenu = ({ editor, groups, className }: BubbleMenu) => (
    <TipTapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className={clsx(['py-0 shadow dsr-bg-background-lighten-1 px-2', className])}>
            <EditorMenu editor={editor} groups={groups} />
        </div>
    </TipTapBubbleMenu>
);

export default BubbleMenu;