import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

import Hyperlink from './link';
import Variable from './variable';

type ExtensionProps = {
  onFetchVariables: (query: string) => string[] | Promise<string[]>;
};

export const extensions = (extension: ExtensionProps) => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    dropcursor: {
      color: '#555',
      width: 3,
    },
  }),
  Image,
  Superscript,
  Subscript,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  TextAlign.configure({ types: [Paragraph.name, Heading.name] }),
  Hyperlink,
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
  Variable.configure({
    suggestion: {
      items: ({ query }) => extension.onFetchVariables(query),
    },
  }),
];
