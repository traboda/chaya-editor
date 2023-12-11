import React from 'react';
import { Editor } from '@tiptap/core';
import { Dropdown } from 'chaya-ui';

const TableCreator = ({ editor }: { editor: Editor }) => {

  return (
      <Dropdown
          buttonRenderer={(
              <button
                  className="ri-table-2 px-1 py-0.5 text-lg rounded hover:bg-neutral-300/50 group-active:bg-neutral-300/50"
              />
          )}
      >
          <div className="p-4">
              <div>
                  <button
                      onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()}
                      className="w-full text-left hover:bg-neutral-300/50 rounded px-1 py-1"
                  >
                      2 x 2
                  </button>
              </div>
          </div>
      </Dropdown>
  );

};

export default TableCreator;