import React, { useState, useEffect } from 'react';
import { useSheetStore } from '../store/sheetStore';
import { FunctionSquare } from 'lucide-react';

const FormulaBar: React.FC = () => {
  const { selectedCell, cells, updateCell } = useSheetStore();
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (selectedCell && cells[selectedCell]) {
      setFormula(cells[selectedCell].formula || cells[selectedCell].value);
    } else {
      setFormula('');
    }
  }, [selectedCell, cells]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
    if (selectedCell) {
      const [row, col] = selectedCell.split('-').map(Number);
      updateCell(row, col, {
        value: e.target.value,
        formula: e.target.value.startsWith('=') ? e.target.value : '',
      });
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="flex items-center gap-2">
        <FunctionSquare size={18} className="text-gray-500" />
        <input
          type="text"
          value={formula}
          onChange={handleFormulaChange}
          placeholder="Enter formula or value"
          className="w-[400px] px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default FormulaBar;