import { Cell } from '../types/sheet';

export function evaluateFormula(formula: string, cells: Record<string, Cell>): number | string | null {
  if (!formula.startsWith('=')) {
    return formula;
  }

  const cleanFormula = formula.substring(1).toUpperCase();
  
  try {
    if (cleanFormula.startsWith('SUM(')) {
      return evaluateSum(cleanFormula, cells);
    } else if (cleanFormula.startsWith('AVERAGE(')) {
      return evaluateAverage(cleanFormula, cells);
    } else if (cleanFormula.startsWith('MAX(')) {
      return evaluateMax(cleanFormula, cells);
    } else if (cleanFormula.startsWith('MIN(')) {
      return evaluateMin(cleanFormula, cells);
    } else if (cleanFormula.startsWith('COUNT(')) {
      return evaluateCount(cleanFormula, cells);
    } else if (cleanFormula.startsWith('TRIM(')) {
      return evaluateTrim(cleanFormula, cells);
    } else if (cleanFormula.startsWith('UPPER(')) {
      return evaluateUpper(cleanFormula, cells);
    } else if (cleanFormula.startsWith('LOWER(')) {
      return evaluateLower(cleanFormula, cells);
    } else {
      // Handle basic arithmetic expressions
      return evaluateArithmetic(cleanFormula, cells);
    }
  } catch (error) {
    console.error('Formula evaluation error:', error);
    return '#ERROR!';
  }
}

function evaluateArithmetic(formula: string, cells: Record<string, Cell>): number | string {
  // Replace cell references with their values
  const withValues = formula.replace(/[A-Z]+[0-9]+/g, (match) => {
    const cellRef = parseCellReference(match);
    const cellId = `${cellRef.row}-${cellRef.col}`;
    const cell = cells[cellId];
    const value = cell?.computedValue ?? cell?.value ?? '0';
    return typeof value === 'number' ? value.toString() : isNaN(Number(value)) ? '0' : value;
  });

  try {
    // Safely evaluate the arithmetic expression
    // eslint-disable-next-line no-new-func
    return Function(`'use strict'; return (${withValues})`)();
  } catch {
    return '#ERROR!';
  }
}

function getCellRange(range: string, cells: Record<string, Cell>): Cell[] {
  const [start, end] = range.split(':');
  const startPos = parseCellReference(start);
  const endPos = parseCellReference(end);
  
  const rangeCells: Cell[] = [];
  
  for (let row = startPos.row; row <= endPos.row; row++) {
    for (let col = startPos.col; col <= endPos.col; col++) {
      const cellId = `${row}-${col}`;
      if (cells[cellId]) {
        rangeCells.push(cells[cellId]);
      }
    }
  }
  
  return rangeCells;
}

function parseCellReference(ref: string): { row: number; col: number } {
  const match = ref.match(/([A-Z]+)([0-9]+)/);
  if (!match) throw new Error('Invalid cell reference');
  
  const colStr = match[1];
  const rowStr = match[2];
  
  const col = colStr.split('').reduce((acc, char) => 
    acc * 26 + char.charCodeAt(0) - 'A'.charCodeAt(0), 0
  );
  
  return {
    row: parseInt(rowStr) - 1,
    col,
  };
}

function getCellValue(cell: Cell): number {
  const value = cell.computedValue ?? cell.value;
  const numValue = typeof value === 'number' ? value : parseFloat(value as string);
  return isNaN(numValue) ? 0 : numValue;
}

// Mathematical Functions
function evaluateSum(formula: string, cells: Record<string, Cell>): number {
  const range = extractRange(formula);
  const rangeCells = getCellRange(range, cells);
  return rangeCells.reduce((sum, cell) => sum + getCellValue(cell), 0);
}

function evaluateAverage(formula: string, cells: Record<string, Cell>): number {
  const range = extractRange(formula);
  const rangeCells = getCellRange(range, cells);
  const sum = rangeCells.reduce((acc, cell) => acc + getCellValue(cell), 0);
  return rangeCells.length === 0 ? 0 : sum / rangeCells.length;
}

function evaluateMax(formula: string, cells: Record<string, Cell>): number {
  const range = extractRange(formula);
  const rangeCells = getCellRange(range, cells);
  const values = rangeCells.map(cell => getCellValue(cell));
  return values.length === 0 ? 0 : Math.max(...values);
}

function evaluateMin(formula: string, cells: Record<string, Cell>): number {
  const range = extractRange(formula);
  const rangeCells = getCellRange(range, cells);
  const values = rangeCells.map(cell => getCellValue(cell));
  return values.length === 0 ? 0 : Math.min(...values);
}

function evaluateCount(formula: string, cells: Record<string, Cell>): number {
  const range = extractRange(formula);
  const rangeCells = getCellRange(range, cells);
  return rangeCells.filter(cell => {
    const value = cell.computedValue ?? cell.value;
    return typeof value === 'number' || !isNaN(parseFloat(value as string));
  }).length;
}

// Data Quality Functions
function evaluateTrim(formula: string, cells: Record<string, Cell>): string {
  const range = extractRange(formula);
  const cell = getCellRange(range, cells)[0];
  const value = cell?.value ?? '';
  return typeof value === 'string' ? value.trim() : value.toString().trim();
}

function evaluateUpper(formula: string, cells: Record<string, Cell>): string {
  const range = extractRange(formula);
  const cell = getCellRange(range, cells)[0];
  const value = cell?.value ?? '';
  return value.toString().toUpperCase();
}

function evaluateLower(formula: string, cells: Record<string, Cell>): string {
  const range = extractRange(formula);
  const cell = getCellRange(range, cells)[0];
  const value = cell?.value ?? '';
  return value.toString().toLowerCase();
}

function extractRange(formula: string): string {
  const match = formula.match(/\((.*?)\)/);
  if (!match) throw new Error('Invalid range format');
  return match[1];
}