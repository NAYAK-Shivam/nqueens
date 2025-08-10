const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// N-Queens Solver
function solveNQueens(n) {
  const solutions = [];
  const steps = [];
  const board = Array.from({ length: n }, () => ".".repeat(n));

  function placePossible(board, r, c) {
    let r1 = r,
      r2 = r,
      r3 = r,
      c1 = c,
      c2 = c;
    while (r1 >= 0) if (board[r1--][c] === "Q") return false;
    while (r2 >= 0 && c1 < n) if (board[r2--][c1++] === "Q") return false;
    while (r3 >= 0 && c2 >= 0) if (board[r3--][c2--] === "Q") return false;
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      solutions.push([...board]);
      return;
    }
    for (let c = 0; c < n; c++) {
      if (placePossible(board, row, c)) {
        let rowStr = board[row].split("");
        rowStr[c] = "Q";
        board[row] = rowStr.join("");
        steps.push([...board]);
        backtrack(row + 1);
        rowStr[c] = ".";
        board[row] = rowStr.join("");
        steps.push([...board]);
      }
    }
  }

  backtrack(0);
  return { solutions, steps };
}

// API Endpoint
app.get("/solve", (req, res) => {
  const n = parseInt(req.query.n) || 4;
  const { solutions, steps } = solveNQueens(n);
  res.json({ solutions, steps });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
