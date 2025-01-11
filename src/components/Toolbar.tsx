import React from 'react';
import { useSheetStore } from '../store/sheetStore';
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Plus,
  Minus,
  Copy,
  Scissors,
  Clipboard
} from 'lucide-react';

const Toolbar: React.FC = () => {
  const { selectedCell, formatCell, cells } = useSheetStore();

  const handleFormat = (format: any) => {
    if (selectedCell) {
      formatCell(selectedCell, format);
    }
  };

  const cell = selectedCell ? cells[selectedCell] : null;

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="flex items-center gap-1 border-r pr-2">
        <button
          className={`p-1 rounded hover:bg-gray-100 ${
            cell?.format.bold ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleFormat({ bold: !cell?.format.bold })}
        >
          <Bold size={18} />
        </button>
        <button
          className={`p-1 rounded hover:bg-gray-100 ${
            cell?.format.italic ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleFormat({ italic: !cell?.format.italic })}
        >
          <Italic size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2">
        <button
          className={`p-1 rounded hover:bg-gray-100 ${
            cell?.format.align === 'left' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleFormat({ align: 'left' })}
        >
          <AlignLeft size={18} />
        </button>
        <button
          className={`p-1 rounded hover:bg-gray-100 ${
            cell?.format.align === 'center' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleFormat({ align: 'center' })}
        >
          <AlignCenter size={18} />
        </button>
        <button
          className={`p-1 rounded hover:bg-gray-100 ${
            cell?.format.align === 'right' ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleFormat({ align: 'right' })}
        >
          <AlignRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2">
        <button className="p-1 rounded hover:bg-gray-100">
          <Copy size={18} />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Scissors size={18} />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Clipboard size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-1 rounded hover:bg-gray-100">
          <Plus size={18} />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;