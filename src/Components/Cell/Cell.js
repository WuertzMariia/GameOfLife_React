import React from 'react';
import styles from './Cell.module.css'

const Cell = (props) => {
    const CELL_SIZE = 20;
    const { x, y } = props;
    return (
        <div className={styles.Cell} style={{
            left: `${CELL_SIZE * x + 1}px`,
            top: `${CELL_SIZE * y + 1}px`,
            width: `${CELL_SIZE - 1}px`,
            height: `${CELL_SIZE - 1}px`,
        }}></div>
    )
}

export default Cell;