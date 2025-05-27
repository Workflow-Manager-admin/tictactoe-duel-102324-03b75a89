import { component$, useSignal, $ } from "@builder.io/qwik";
import styles from "./tictactoe-duel.module.css";

/**
 * Minimalist 2-player TicTacToe main container.
 * 
 * - Board: 3x3 grid of cells, clickable for turn.
 * - "X" starts. Players alternate. 
 * - Detects win/draw, disables input on over.
 * - Displays turn, win/draw status above grid.
 * - Reset button below grid.
 * - Colors: primary #fff, secondary #a38800, accent #2196f3.
 */

// Type to represent a tile value
type Cell = "" | "X" | "O";

const WIN_PATTERNS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// PUBLIC_INTERFACE
export default component$(() => {
  // State: flat board, currentPlayer, game status
  const board = useSignal<Cell[]>(Array(9).fill(""));
  const currentPlayer = useSignal<Cell>("X");
  const winner = useSignal<Cell | "Draw" | null>(null);

  // Check for winner or draw
  const checkGameStatus = $((nextBoard: Cell[]) => {
    // Check win patterns
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (
        nextBoard[a] &&
        nextBoard[a] === nextBoard[b] &&
        nextBoard[a] === nextBoard[c]
      ) {
        return nextBoard[a]; // "X" or "O"
      }
    }
    // Check draw (no empty cells)
    if (nextBoard.every((c) => c !== "")) return "Draw";
    return null;
  });

  // Handle cell click
  const handleCellClick = $((idx: number) => {
    if (winner.value || board.value[idx]) return;
    const next = board.value.slice();
    next[idx] = currentPlayer.value;
    board.value = next;
    const result = checkGameStatus(next);
    if (result) {
      winner.value = result;
    } else {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    }
  });

  // Reset the game
  const resetGame = $(() => {
    board.value = Array(9).fill("");
    currentPlayer.value = "X";
    winner.value = null;
  });

  // UI: display winner, turn, draw
  let statusText: string;
  if (winner.value === "Draw") {
    statusText = "It's a draw!";
  } else if (winner.value) {
    statusText = `Player ${winner.value} wins!`;
  } else {
    statusText = `Player ${currentPlayer.value}'s turn`;
  }

  return (
    <div class={styles.container}>
      <h2 class={styles.heading}>TicTacToe Duel</h2>
      <div class={styles.status}>{statusText}</div>
      <div class={styles.board}>
        {board.value.map((cell, i) => (
          <button
            type="button"
            class={[
              styles.cell,
              cell === "X" ? styles.x : cell === "O" ? styles.o : "",
              winner.value ? styles.disabled : "",
            ]}
            onClick$={() => handleCellClick(i)}
            disabled={!!winner.value || !!cell}
            aria-label={
              cell
                ? `Cell ${i + 1} (${cell})`
                : `Cell ${i + 1}, available for ${currentPlayer.value}`
            }
            key={i}
          >
            {cell}
          </button>
        ))}
      </div>
      <button class={styles.reset} type="button" onClick$={resetGame}>
        Reset
      </button>
    </div>
  );
});
