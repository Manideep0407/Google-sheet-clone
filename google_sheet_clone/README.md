# Google Sheets Clone

A web-based spreadsheet application that mimics core functionalities of Google Sheets, built with React, TypeScript, and modern web technologies.

## Tech Stack & Data Structures

### Frontend Technologies
- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **Zustand**: For state management
- **Immer**: For immutable state updates
- **Lucide React**: For icons

### Key Data Structures

1. **Sheet Data Model**
   - Uses a flat object structure for cells with compound keys (`row-col`)
   - Enables O(1) access to any cell
   - Reduces memory usage compared to 2D arrays
   ```typescript
   {
     cells: {
       "0-0": Cell,
       "0-1": Cell,
       // ...
     }
   }
   ```

2. **Cell Model**
   ```typescript
   interface Cell {
     id: string;
     value: string;
     formula: string;
     computedValue: string | number | null;
     dependencies: string[];
     format: CellFormat;
   }
   ```

3. **Formula Evaluation**
   - Uses recursive descent parsing for formula evaluation
   - Maintains a dependency graph for formula updates
   - Prevents circular references

### Performance Optimizations

1. **Virtual Rendering**
   - Only renders visible cells
   - Improves performance with large datasets

2. **Memoization**
   - Uses React.memo for cell components
   - Prevents unnecessary re-renders

3. **Efficient Updates**
   - Uses Immer for immutable updates
   - Maintains referential equality for unchanged parts

4. **Change Detection**
   - Tracks cell dependencies
   - Only updates affected cells when formulas change

## Features

### Core Spreadsheet Features
- Cell editing and formatting
- Formula support
- Range selection
- Column/row resizing

### Mathematical Functions
- SUM
- AVERAGE
- MAX
- MIN
- COUNT

### Data Quality Functions
- TRIM
- UPPER
- LOWER
- REMOVE_DUPLICATES
- FIND_AND_REPLACE

### Data Validation
- Type checking
- Formula validation
- Error handling

## Why This Tech Stack?

1. **React + TypeScript**
   - Strong type safety
   - Excellent developer experience
   - Large ecosystem
   - Great performance characteristics

2. **Zustand**
   - Lightweight
   - Simple API
   - Great performance
   - Easy integration with React

3. **Tailwind CSS**
   - Rapid development
   - Small bundle size
   - Consistent styling
   - Great developer experience

4. **Immer**
   - Simplifies immutable updates
   - Reduces bugs
   - Improves code readability

## Future Improvements

1. **Performance**
   - Implement WebWorkers for formula evaluation
   - Add IndexedDB for large dataset handling

2. **Features**
   - Add more formula functions
   - Implement undo/redo
   - Add collaborative editing
   - Add data visualization

3. **UI/UX**
   - Add keyboard shortcuts
   - Improve accessibility
   - Add more formatting options

4. **Data Persistence**
   - Add cloud storage integration
   - Implement auto-save
   - Add export options