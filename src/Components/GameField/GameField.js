import React, {useState} from 'react';
import Cell from "../Cell/Cell";
import styles from './GameField.module.css'

const GameField = (props) => {

    let [running, setStateOfGame] = useState(false);
    let [timeoutHandler, setTimeOut] = useState(null);


    let runGame = () => {
        setStateOfGame(true);
        randomize();

    }
    let makeBoard = () => {

        let board = [];
        for (let y = 0; y < props.rows; y++) {
            board[y] = [];
            for (let x = 0; x < props.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    let makeCells = () => {

        let cells = [];
        for (let y = 0; y < props.rows; y++) {
            for (let x = 0; x < props.cols; x++) {
                if (board[y][x]) {
                    cells.push({x, y});
                }
            }
        }

        return cells;
    }
    let [board, setNewBoard] = useState(makeBoard());
    let [cells, setNewLivingCells] = useState(makeCells());
    let randomize = () => {
        for (let y = 0; y < props.rows; y++) {
            for (let x = 0; x < props.cols; x++) {
                if (Math.random() >= 0.5) {
                    board[y][x] = true;
                } else {
                    board[y][x] = false;
                }

            }
        }
        setNewLivingCells(makeCells());
        setTimeOut(setTimeout(() => {
            randomize();
        }, 1000))

    }

    let stopGame = () => {
        setStateOfGame(false);
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
            setTimeOut(null);
        }
    }
    let clearField = () => {
        setNewBoard(makeBoard());
       setNewLivingCells(makeCells());
    }


    let nextIteration = () => {
        let newBoard = makeBoard();
        for (let y = 0; y < props.rows; y++) {
            for (let x = 0; x < props.cols; x++) {
                let neighbors = nextGenaration(board, x, y);
                if (board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }
        setNewBoard(newBoard);
        // board = newBoard;
        setNewLivingCells(makeCells());


    }

    let nextGenaration = (board, x, y) => {
        let neighbors = 0;
        const direction = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < direction.length; i++) {
            const dir = direction[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < props.cols && y1 >= 0 && y1 < props.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }
const CELL_SIZE=20;
    return (
        <div className={styles.main}>
            <div className={styles.board}
                 style={{ height: props.rows*20, width: props.cols*20, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>

                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                ))}
            </div>
            <div className={styles.buttons}>
                {running ?
                    <button className="button" onClick={() => {
                        stopGame()
                    }}>Stop
                    </button> :
                    <button className="button" onClick={() => {
                        runGame()
                    }}>Run
                    </button>}

                <button className="button" onClick={clearField}>Generate new cells</button>
            </div>
        </div>
    )
}

export default GameField;