import React, { useEffect } from 'react';
import { Editor } from '@tiptap/core';
import { Dropdown, TextInput } from 'chaya-ui';

const COLOR_GRID: string[][] = [
  ['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff'],
  ['#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'],
  ['#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc'],
  ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
  ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0'],
  ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79'],
  ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47'],
  ['#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130'],
];

const ColorSelector = ({ editor }: { editor: Editor }) => {

  const [colorValue, setColorValue] = React.useState<string>('#000000');

  const setColor = (color: string) => {
    setColorValue(color);
    editor.chain().focus().setColor(color).run();
  };

  useEffect(() => {
    editor.on('selectionUpdate', () => {
      console.log('editor update', editor.getAttributes('textStyle')?.color);
      setColorValue(editor.getAttributes('textStyle')?.color || '#000000');
    });
  }, [editor]);

  return (
      <Dropdown
          buttonRenderer={(
              <button
                  className="ri-font-color px-1 py-0.5 text-lg rounded hover:bg-neutral-300/50 group-active:bg-neutral-300/50"
              />
      )}
          align="start"
          containerClassName="w-[300px] max-w-screen"
      >
          <div className="p-4">
              <div className="flex flex-col w-full gap-1">
                  {COLOR_GRID.map((row, rowIndex) => (
                      <div className="flex items-center justify-between gap-0.5" key={rowIndex}>
                          {row.map((color, colorIndex) => (
                              <button
                                  key={`${colorIndex}_${color}`}
                                  onClick={() => setColor(color)}
                                  className="aspect-square w-6 rounded-full border shadow border-neutral-200/50"
                                  style={{ backgroundColor: color }}
                              />
                          ))}
                      </div>
                  ))}
              </div>
              <div className="mt-4 flex justify-between items-center gap-2">
                  <div className="flex justify-center">
                      <div
                          className="aspect-square w-6 h-6 rounded-full border shadow border-neutral-200/50"
                          style={{ backgroundColor: colorValue }}
                      />
                  </div>
                  <div className="flex w-full">
                      <TextInput
                          name="custom_color"
                          label="Custom Color"
                          hideLabel
                          inputClassName="py-1 px-2 rounded-r-none"
                          value={colorValue}
                          onChange={setColorValue}
                          className="rounded-r-none"
                      />
                      <button
                          onClick={() => setColor(colorValue)}
                          className="ri-check-fill text-xl font-bold px-1 py-0.5 border rounded-r-lg h-full bg-neutral-300/50"
                      />
                  </div>
              </div>
          </div>
      </Dropdown>
  );
};

export default ColorSelector;