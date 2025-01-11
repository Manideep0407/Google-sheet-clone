import { create } from 'zustand';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { SheetState, Cell, CellFormat } from '../types/sheet';
import { evaluateFormula } from '../utils/formulaEvaluator';

const DEFAULT_ROWS = 100;
const DEFAULT_COLS = 26;

const DEFAULT_CELL_FORMAT: CellFormat = {
  bold: false,
  italic: false,
  fontSize: 12,
  color: '#000000',
  backgroundColor: '#ffffff',
  align: 'left',
};

const createEmptyCell = (): Cell => ({
  id: nanoid(),
  value: '',
  formula: '',
  computedValue: null,
  dependencies: [],
  format: { ...DEFAULT_CELL_FORMAT },
});

interface SheetStore extends SheetState {
  initializeSheet: () => void;
  updateCell: (rowIndex: number, colIndex: number, updates: Partial<Cell>) => void;
  setSelectedCell: (cellId: string | null) => void;
  setSelectedRange: (range: string[] | null) => void;
  updateColumnWidth: (colIndex: number, width: number) => void;
  updateRowHeight: (rowIndex: number, height: number) => void;
  formatCell: (cellId: string, format: Partial<CellFormat>) => void;
}

export const useSheetStore = create<SheetStore>((set, get) => ({
  cells: {},
  selectedCell: null,
  selectedRange: null,
  columns: DEFAULT_COLS,
  rows: DEFAULT_ROWS,
  columnWidths: {},
  rowHeights: {},

  initializeSheet: () => {
    const initialCells: Record<string, Cell> = {};
    
    for (let row = 0; row < DEFAULT_ROWS; row++) {
      for (let col = 0; col < DEFAULT_COLS; col++) {
        const cellId = `${row}-${col}`;
        initialCells[cellId] = createEmptyCell();
      }
    }
    
    set({ cells: initialCells });
  },

  updateCell: (rowIndex, colIndex, updates) => {
    set(
      produce((state: SheetState) => {
        const cellId = `${rowIndex}-${colIndex}`;
        if (!state.cells[cellId]) {
          state.cells[cellId] = createEmptyCell();
        }
        
        Object.assign(state.cells[cellId], updates);
        
        if (updates.formula) {
          state.cells[cellId].computedValue = evaluateFormula(updates.formula, state.cells);
          // Update dependent cells
          updateDependentCells(cellId, state.cells);
        }
      })
    );
  },

  setSelectedCell: (cellId) => set({ selectedCell: cellId }),
  
  setSelectedRange: (range) => set({ selectedRange: range }),

  updateColumnWidth: (colIndex, width) =>
    set(
      produce((state: SheetState) => {
        state.columnWidths[colIndex] = width;
      })
    ),

  updateRowHeight: (rowIndex, height) =>
    set(
      produce((state: SheetState) => {
        state.rowHeights[rowIndex] = height;
      })
    ),

  formatCell: (cellId, format) =>
    set(
      produce((state: SheetState) => {
        if (!state.cells[cellId]) {
          state.cells[cellId] = createEmptyCell();
        }
        state.cells[cellId].format = { ...state.cells[cellId].format, ...format };
      })
    ),
}));

function updateDependentCells(cellId: string, cells: Record<string, Cell>) {
  const dependentCells = Object.values(cells).filter(cell =>
    cell.dependencies.includes(cellId)
  );

  dependentCells.forEach(cell => {
    cell.computedValue = evaluateFormula(cell.formula, cells);
    updateDependentCells(cell.id, cells);
  });
}