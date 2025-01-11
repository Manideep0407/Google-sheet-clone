export interface Cell {
  id: string;
  value: string;
  formula: string;
  format: CellFormat;
  computedValue: string | number | null;
  dependencies: string[];
}

export interface CellFormat {
  bold: boolean;
  italic: boolean;
  fontSize: number;
  color: string;
  backgroundColor: string;
  align: 'left' | 'center' | 'right';
}

export interface SheetState {
  cells: Record<string, Cell>;
  selectedCell: string | null;
  selectedRange: string[] | null;
  columns: number;
  rows: number;
  columnWidths: Record<number, number>;
  rowHeights: Record<number, number>;
}

export type CellPosition = {
  row: number;
  col: number;
}

export type CellRange = {
  start: CellPosition;
  end: CellPosition;
}