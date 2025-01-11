import React, { useState, useCallback } from 'react';
import { useSheetStore } from '../store/sheetStore';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  width: number;
  height: number;
  isSelected: boolean;
}

const Cell: React.FC<CellProps> = ({
  rowIndex,
  colIndex,
  width,
  height,
  isSelected,
}) => {
  const { cells, updateCell, setSelectedCell } = useSheetStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const cellId = `${rowIndex}-${colIndex}`;
  const cell = cells[cellId] || {
    value: '',
    formula: '',
    computedValue: null,
    format: {
      bold: false,
      italic: false,
      fontSize: 12,
      color: '#000000',
      backgroundColor: '#ffffff',
      align: 'left',
    },
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCell(rowIndex, colIndex, {
      value: e.target.value,
      formula: e.target.value.startsWith('=') ? e.target.value : '',
    });
  };

  const handleClick = useCallback(() => {
    setSelectedCell(cellId);
  }, [cellId, setSelectedCell]);

  return (
    <div
      className={`border-b border-r border-gray-300 relative ${
        isSelected ? 'ring-2 ring-blue-500 z-10' : ''
      }`}
      style={{
        width,
        height,
        backgroundColor: cell.format.backgroundColor,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={cell.formula || cell.value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="absolute inset-0 w-full h-full px-1 outline-none"
          autoFocus
        />
      ) : (
        <div
          className="w-full h-full px-1 overflow-hidden whitespace-nowrap"
          style={{
            fontWeight: cell.format.bold ? 'bold' : 'normal',
            fontStyle: cell.format.italic ? 'italic' : 'normal',
            fontSize: `${cell.format.fontSize}px`,
            color: cell.format.color,
            textAlign: cell.format.align,
          }}
        >
          {cell.computedValue ?? cell.value}
        </div>
      )}
    </div>
  );
};

export default React.memo(Cell);