// src/MatrixBoard.js
import React, { useState } from 'react';
import axios from 'axios';
import './MatrixBoard.css';
import moonboardImage from './moonboard2016Background.jpg'; // Update the path accordingly

const MatrixBoard = () => {
    const rows = 18;
    const cols = 11;
  
    const initialMatrix = Array(rows).fill().map((_, rowIndex) =>
      Array(cols).fill().map((_, colIndex) => ({
        selected: false,
        selectable: !(
          (rowIndex === 0 && colIndex === 9) ||  
          (rowIndex === 0 && colIndex === 5) ||
          (rowIndex === 1 && colIndex === 0) ||
          (rowIndex === 1 && colIndex === 1) ||
          (rowIndex === 1 && colIndex === 2) ||
          (rowIndex === 1 && colIndex === 4) ||
          (rowIndex === 1 && colIndex === 5) ||
          (rowIndex === 1 && colIndex === 7) ||
          (rowIndex === 1 && colIndex === 8) ||
          (rowIndex === 1 && colIndex === 9) ||
          (rowIndex === 1 && colIndex === 10) ||
          (rowIndex === 3 && colIndex === 9) ||
          (rowIndex === 3 && colIndex === 10) ||
          (rowIndex === 0 && colIndex === 5) ||
          (rowIndex === 4 && colIndex === 1) ||  
          (rowIndex === 10 && colIndex === 0) ||
          (rowIndex === 11 && colIndex === 0) ||
          (rowIndex === 12 && colIndex === 0) ||
          (rowIndex === 12 && colIndex === 7) ||
          (rowIndex === 13 && colIndex === 1) ||
          (rowIndex === 13 && colIndex === 1) ||
          (rowIndex === 13 && colIndex === 4) ||
          (rowIndex === 13 && colIndex === 6) ||
          (rowIndex === 14 && colIndex === 0) ||
          (rowIndex === 14 && colIndex === 2) ||
          (rowIndex === 14 && colIndex === 3) ||
          (rowIndex === 14 && colIndex === 4) ||
          (rowIndex === 14 && colIndex === 5) ||
          (rowIndex === 14 && colIndex === 7) ||
          (rowIndex === 14 && colIndex === 9) ||
          (rowIndex === 14 && colIndex === 10) ||
          (rowIndex === 15 && colIndex === 0) ||
          (rowIndex === 15 && colIndex === 2) ||
          (rowIndex === 15 && colIndex === 4) ||
          (rowIndex === 15 && colIndex === 5) ||
          (rowIndex === 15 && colIndex === 6) ||
          (rowIndex === 15 && colIndex === 7) ||
          (rowIndex === 15 && colIndex === 8) ||
          (rowIndex === 15 && colIndex === 9) ||
          (rowIndex === 15 && colIndex === 10) ||
          (rowIndex === 16 && colIndex === 0) ||
          (rowIndex === 16 && colIndex === 1) ||
          (rowIndex === 16 && colIndex === 2) ||
          (rowIndex === 16 && colIndex === 3) ||
          (rowIndex === 16 && colIndex === 4) ||
          (rowIndex === 16 && colIndex === 5) ||
          (rowIndex === 16 && colIndex === 7) ||
          (rowIndex === 16 && colIndex === 8) ||
          (rowIndex === 16 && colIndex === 10) ||
          (rowIndex === 17 && colIndex === 0)  ||
          (rowIndex === 17 && colIndex === 1)  ||
          (rowIndex === 17 && colIndex === 2)  ||
          (rowIndex === 17 && colIndex === 3)  ||
          (rowIndex === 17 && colIndex === 4)  ||
          (rowIndex === 17 && colIndex === 5)  ||
          (rowIndex === 17 && colIndex === 6)  ||
          (rowIndex === 17 && colIndex === 7)  ||
          (rowIndex === 17 && colIndex === 8)  ||
          (rowIndex === 17 && colIndex === 9)  ||
          (rowIndex === 17 && colIndex === 10)     
        )
      }))
    );
  
    const [matrix, setMatrix] = useState(initialMatrix);
    const [selectedPositions, setSelectedPositions] = useState([]);
  
    const handleCellClick = (rowIndex, colIndex) => {
      if (!matrix[rowIndex][colIndex].selectable) return;
  
      const newMatrix = matrix.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            return { ...cell, selected: !cell.selected };
          }
          return cell;
        })
      );
  
      setMatrix(newMatrix);
  
      const newSelectedPositions = newMatrix[rowIndex][colIndex].selected
        ? [...selectedPositions, { row: rowIndex, col: colIndex }]
        : selectedPositions.filter(pos => pos.row !== rowIndex || pos.col !== colIndex);
  
      setSelectedPositions(newSelectedPositions);
    };
  
    const handleExport = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/save-positions', selectedPositions);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error saving positions:', error);
      }
    };
  
    return (
      <div className="matrix-container">
        <div className="image-container">
          <img src={moonboardImage} alt="MoonBoard" className="moonboard-image" />
          <div className="grid-container">
            {matrix.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-item ${cell.selectable ? '' : 'non-selectable'} ${cell.selected ? 'selected' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    top: `${(rowIndex / rows) * 100}%`,
                    left: `${(colIndex / cols) * 100}%`,
                    width: '9%', // Adjust this value as needed
                    height: '5.5%', // Adjust this value as needed
                  }}
                />
              ))
            )}
          </div>
        </div>
        <button onClick={handleExport} style={{ marginTop: '20px' }}>Generate</button>
      </div>
    );
  };
  
  export default MatrixBoard;