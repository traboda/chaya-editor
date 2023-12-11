import TiptapTable from '@tiptap/extension-table';
import { NodeView } from '@tiptap/pm/view';

import { TableView } from '../components/TableView';


const Table = TiptapTable.extend({
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: true,
      handleWidth: 6,
      cellMinWidth: 100,
      // @ts-ignore
      View: TableView as NodeView,
      lastColumnResizable: true,
      allowTableNodeSelection: true,
    };
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      'Mod-alt-t': () =>
        this.editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    };
  },
});

export default Table.configure({});