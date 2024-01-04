import React, { useState } from 'react';
import { Editor } from '@tiptap/core';
import { Dropdown } from 'chaya-ui';

const TableCreator = ({ editor }: { editor: Editor }) => {

  const [selectedCells, setSelectedCells] = useState({ rows: 0, cols: 0 });
  const [hoverCells, setHoverCells] = useState({ rows: 3, cols: 3 });
  const handleMouseOver = (rowIndex: number, colIndex: number) => {
    setHoverCells({ rows: rowIndex + 3, cols: colIndex + 3 });
    setSelectedCells({ rows: rowIndex + 1, cols: colIndex + 1 });
  };

  const renderCells = () => {
    let cells = [];
    for (let i = 0; i < Math.min(hoverCells.rows, 20); i++) { // Adjust size as needed
      let row = [];
      for (let j = 0; j < Math.min(hoverCells.cols, 20); j++) {
        let className = hoverCells.rows <= 10 ? 'cell w-[20px] h-[20px] mb-0.5 border' : 'cell w-[15px] h-[15px] mb-1 border';
        if (i < selectedCells.rows && j < selectedCells.cols) {
          className += ' bg-blue-100';
        }
        row.push(
            <div
                className={className}
                onMouseOver={() => handleMouseOver(i, j)}
                onClick={() => editor.chain().focus().insertTable({ ...selectedCells, withHeaderRow: true }).run()}
                key={`${i}-${j}`}
            />,
        );
      }
      cells.push(<div className="flex gap-0.5" key={i}>{row}</div>);
    }
    return cells;
  };

  return (
      <Dropdown
          buttonRenderer={(
              <button
                  className="ri-table-2 px-1 py-0.5 text-lg rounded hover:bg-neutral-300/50 group-active:bg-neutral-300/50"
              />
          )}
          containerClassName="w-full max-w-[720px]"
      >
          <div className="table-selector w-full">
              <div className="flex">
                  <div className="px-2 pt-2">
                      {renderCells()}
                  </div>
              </div>
              <div className="flex justify-center py-1">
                  {`${selectedCells.rows} x ${selectedCells.cols}`}
              </div>
          </div>
      </Dropdown>
  );

};

export default TableCreator;