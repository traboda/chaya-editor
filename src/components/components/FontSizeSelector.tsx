import React, { useEffect } from 'react';
import { Editor } from '@tiptap/core';
import { SimpleSelect } from 'chaya-ui';

const STD_SIZES: number[] = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96,
];

const FontSizeSelector = ({ editor }: { editor: Editor }) => {

  const [selectionSize, setSelectionSize] = React.useState<number>(16);

  const getCurrentFontSize = () => {
    const textStyle = editor.getAttributes('textStyle');
    if (textStyle?.fontSize) {
      if (textStyle?.fontSize.includes('px')) {
        return parseInt(textStyle?.fontSize.replace('px', ''));
      }
      return parseInt(textStyle?.fontSize);
    }
    return 16;
  };

  const updateFontSize = (value: number) => {
    setSelectionSize(value);
    if (!editor.state.selection.empty) {
      editor.chain().focus().setFontSize(`${value.toString()}px`).run();
    }
  };

  const lowerFontSize = () => {
    const currentSize = getCurrentFontSize();
    updateFontSize(Math.max(currentSize - 1, 1));
  };

  const higherFontSize = () => {
    const currentSize = getCurrentFontSize();
    updateFontSize(currentSize + 1);
  };

  useEffect(() => {
    editor.on('selectionUpdate', () => {
      setSelectionSize(getCurrentFontSize());
    });
  }, [editor]);

  const options = STD_SIZES.includes(selectionSize) ? STD_SIZES : [...STD_SIZES, selectionSize].sort((a, b) => a - b);

  return (
      <div className="flex items-center gap-0.5">
          <button
              onClick={lowerFontSize}
              className="ri-subtract-fill px-1 py-0.5 text-lg rounded hover:bg-neutral-300/50"
          />
          <SimpleSelect
              value={selectionSize}
              className="!w-[45px] px-2 !py-0.5 rounded"
              dropdownClassName="!w-[64px] chaya-editor-font-size-dropdown"
              hideArrow
              onChange={updateFontSize}
              name="font_size"
              hideLabel
              labels={{ label: 'Font Size', create: '', placeholder: selectionSize.toString() }}
              isCreatable
              onCreate={(val) => updateFontSize(parseInt(val))}
              options={[
                ...options.map((size) => ({ label: size.toString(), value: size })),
              ]}
          />
          <button
              onClick={higherFontSize}
              className="ri-add-fill text-lg px-1 py-0.5 rounded hover:bg-neutral-300/50"
          />
      </div>
  );

};

export default FontSizeSelector;
