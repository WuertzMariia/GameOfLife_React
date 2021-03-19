import React, {useEffect, useState, useRef, createRef } from 'react';
import Cell from "../Cell/Cell";
import styles from './GameField.module.css'

const GameField = (props) => {
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
    let [running, setStateOfGame] = useState(false);
    let [timeoutHandler, setTimeOut] = useState(null);
    let [counter, setCounter] = useState(props.lifeCycles); 
    let [board, setNewBoard] = useState(makeBoard());
    let [cells, setNewLivingCells] = useState(makeCells());
    let [newBoard, setNextBoard] = useState(makeBoard()); 
    let [continueGame, setContinueGame] = useState(false); 
useEffect(()=> {
    stopGame();
    setNewBoard(makeBoard());
    setNewLivingCells([]); 
    setNextBoard(makeBoard()); 
}, [props]); 


    let runGame = () => {
        setStateOfGame(true);
        for (let y = 0; y < props.rows; y++) {
            for (let x = 0; x < props.cols; x++) {
                if (Math.random() >= 0.8) {
                    board[y][x] = true;
                } else {
                    board[y][x] = false;
                }

            }
        }
        nextIteration(); 
    }
   
 let generalSetTimeOutFunc = (func) => {
    setNewLivingCells(makeCells());
    if(counter>1) {
        setTimeOut(setTimeout(() => {
            func();
        }, 100))
        setCounter(counter--); 
    } else if (counter <= 1) {
        setContinueGame(true);
        setStateOfGame(false); 
        setCounter(props.lifeCycles); 
        setNewBoard(board); 
    }
 }
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
        generalSetTimeOutFunc(randomize); 

    }

    let stopGame = () => {
        setStateOfGame(false);
        setCounter(props.lifeCycles); 
        if (timeoutHandler) {
            setTimeOut(clearTimeout(timeoutHandler));  
        }   setNewBoard(makeBoard());
        setNewLivingCells([]); 
        setContinueGame(false); 
    }
    let clearField = () => {
stopGame(); 
setStateOfGame(true); 
        setNewBoard(makeBoard());
        setNewLivingCells(makeCells());
  runGame(); 

    }


    let nextIteration = () => {
        setNextBoard(makeBoard()); 
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
        
        board = newBoard; 
        generalSetTimeOutFunc(nextIteration); 

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

// MOUSEMOVE
// Cursor position
let  textInput = React.useRef(null); 

let x=0;
let y=0; 
let handleMouseMove = (event) => {
// rect.left - расстояние от левой границы до начала div
// rect.top - y : расстояние от верха до обьекта
// window.pageXOffset window.pageYOffset - учет прокрутки страницы
// document.documentElement.clientLeft - ширина border слева


let rect = textInput.current.getBoundingClientRect(); 
let offSetx = event.pageX - (rect.left+window.pageXOffset-document.documentElement.clientLeft);
let offSety = event.pageY - ((rect.top+window.pageYOffset)-document.documentElement.clientTop);
if (offSety < 0 ){
    offSety =0; 
}
x = Math.floor(offSetx/CELL_SIZE);
y = Math.floor(offSety/CELL_SIZE); 

if(x>=0 && x <=props.cols && y>=0 && y<=props.rows) {
    board[y][x] = !board[y][x]; 
}
setNewLivingCells(makeCells()); 
}
    return (
        <div className={styles.main}>
            <div className={styles.board} onClick={(event)=> handleMouseMove(event)} ref={textInput}
                 style={{ minHeight: props.rows*20, minWidth: props.cols*20, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>

                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                ))}
            </div>
            <div className={styles.buttons}>
                {running ?
                    <button className="button" onClick={() => {
                        stopGame()
                    }}>Stop
                    </button> : continueGame ? <button className="button" onClick={() => {
                      
                      nextIteration(); 
                  }}>Run again
                  </button> :
                   <button className="button" onClick={() => {
                      
                        runGame()
                    }}>Run
                    </button>}
                   
                   {running? <button className="button" onClick={() => {
                        stopGame()
                    }}>Stop
                    </button>:  <button className="button" onClick={() => {
                          setStateOfGame(true); 
                        randomize(); 
                    }}>Random
                    </button> }

                    <button className={styles.button} onClick={clearField}>Generate new cells</button>
                       
                       {(running || continueGame) && <button className="button" onClick={() => {
                        stopGame()
                    }}>Stop
                    </button>}
            </div>
            <div className={styles.coord}>
                <p>Coordinates</p>
                <div>
             

                    <p>x: {x}</p>
                    <p>y: {y}</p>
                </div>
            </div>
        </div>
    )
}

export default GameField;