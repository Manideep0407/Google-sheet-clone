import React, { useEffect, useRef } from 'react';
import { useSheetStore } from '../store/sheetStore';
import Cell from './Cell';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';

const Sheet: React.FC = () => {
  const {
    cells,
    columns,
    rows,
    columnWidths,
    rowHeights,
    selectedCell,
    initializeSheet
  } = useSheetStore();
  
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeSheet();
  }, []);

  const getColumnHeader = (index: number): string => {
    let header = '';
    while (index >= 0) {
      header = String.fromCharCode(65 + (index % 26)) + header;
      index = Math.floor(index / 26) - 1;
    }
    return header;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toolbar />
      <FormulaBar />
      
      <div className="flex-1 overflow-auto">
        <div className="relative" ref={sheetRef}>
          {/* Column Headers */}
          <div className="sticky top-0 z-10 flex bg-gray-100">
            <div className="w-10 h-6 border-b border-r border-gray-300"></div>
            {Array.from({ length: columns }).map((_, index) => (
              <div
                key={`col-${index}`}
                className="h-6 border-b border-r border-gray-300 bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700"
                style={{ width: columnWidths[index] || 100 }}
              >
                {getColumnHeader(index)}
              </div>
            ))}
          </div>

          {/* Row Headers and Cells */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex">
              <div
                className="sticky left-0 w-10 border-b border-r border-gray-300 bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700"
                style={{ height: rowHeights[rowIndex] || 24 }}
              >
                {rowIndex + 1}
              </div>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  width={columnWidths[colIndex] || 100}
                  height={rowHeights[rowIndex] || 24}
                  isSelected={selectedCell === `${rowIndex}-${colIndex}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sheet;