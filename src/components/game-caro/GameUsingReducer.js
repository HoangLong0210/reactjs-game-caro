import React, { useReducer } from "react";
import { calculateWinner } from "../../ultils";
import Board from "./Board";

const GameUsingReducer = () => {
  const initialState = {
    board: Array(9).fill(null),
    xIsNext: true,
  };
  const gameReducer = (state, action) => {
    switch (action.types) {
      case "CLICK": {
        const { board, xIsNext } = state;
        const { index, winner } = action;
        if (winner || board[index]) return state;
        const nextState = JSON.parse(JSON.stringify(state));
        nextState.board[index] = xIsNext ? "X" : "O";
        nextState.xIsNext = !xIsNext;
        return nextState;
      }

      case "RESET": {
        const nextState = JSON.parse(JSON.stringify(state));
        nextState.board = Array(9).fill(null);
        return nextState;
      }

      default:
        break;
    }
  };
  const [state, dispath] = useReducer(gameReducer, initialState);
  const winner = calculateWinner(state.board);
  const handleClick = (index) => {
    dispath({
      type: "CLICK",
      payload: {
        index: index,
        winner,
      },
    });
  };
  const handleResetGame = () => {
    dispath({
      type: "RESET",
      payload: {
        winner,
      },
    });
  };
  return (
    <div>
      <Board cells={state.board} onClick={handleClick}></Board>
      {winner && (
        <div className="game-winner">{winner ? `Winner is ${winner}` : ""}</div>
      )}
      <button className="btn-reset" onClick={handleResetGame}>
        RESET GAME
      </button>
    </div>
  );
};

export default GameUsingReducer;
