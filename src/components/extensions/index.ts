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
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

import FontSize from './font-size';
import Variable from './variable';
import Hyperlink from './link';
import Table from './table';

export type SuggestionItem = {
  label: string,
  id: string,
};

export type VariablesConfig = {
  allowSpaces?: boolean,
  highlightClassName?: string,
  items?: SuggestionItem[],
  onFetch?: (query: string) => SuggestionItem[] | Promise<SuggestionItem[]>,
};

type ExtensionProps = {
  variables?: VariablesConfig
};

export const extensions = ({
  variables,
}: ExtensionProps) => {

  const items = [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4],
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

    Table,
    TableRow,
    TableHeader,
    TableCell,


    FontSize,
  ];

  if (variables) {
    items.push(
      Variable.configure({
        suggestion: {
          items: ({ query }) =>
            typeof variables.onFetch == 'function' ? variables.onFetch(query)
              : variables.items && variables.items?.length > 0 ? variables.items.filter((item) => item.id.toLowerCase().includes(query.toLowerCase()))
                : [],
          allowSpaces: variables?.allowSpaces ?? false,
        },
        // renderLabel: ({ node }) => node.attrs?.id,
        renderHTMLAttributes: {
          class: variables.highlightClassName,
        },
      }),
    );
  }

  return items;

};
