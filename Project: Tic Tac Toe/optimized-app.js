// ==== FACTORY: Game Board Logic ====
function createGameBoard() {
  const board = Array(9).fill(null);
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => [...board];
  const reset = () => board.fill(null);

  const setMove = (index, symbol) => {
    if (!board[index]) {
      board[index] = symbol;
      return true;
    }
    return false;
  };

  const checkWinner = () => {
    for (const [a, b, c] of WINNING_COMBOS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.every(Boolean) ? "draw" : null;
  };

  return { getBoard, setMove, checkWinner, reset };
}

// ==== FACTORY: Game Controller ====
function createGameController(player1, player2) {
  const gameBoard = createGameBoard();
  let currentPlayer = player1;
  let winner = null;

  const playMove = (index) => {
    if (winner) return { status: "finished", winner };

    const moved = gameBoard.setMove(index, currentPlayer.symbol);
    if (!moved) return { status: "invalid" };

    const result = gameBoard.checkWinner();
    if (result) {
      winner = result;
      return { status: "finished", winner: result };
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return { status: "next", next: currentPlayer.symbol };
  };

  const restart = () => {
    gameBoard.reset();
    currentPlayer = player1;
    winner = null;
  };

  return {
    playMove,
    restart,
    getBoard: gameBoard.getBoard,
    getCurrentPlayer: () => currentPlayer.symbol,
  };
}

// ==== UI: DOM + Rendering ====
function createGameUI() {
  const gameWrapper = document.querySelector(".game");
  const player1 = { name: "Player X", symbol: "X" };
  const player2 = { name: "Player O", symbol: "O" };
  const game = createGameController(player1, player2);

  const renderBoard = () => {
    gameWrapper.innerHTML = ""; // Clear old state
    const boardEl = document.createElement("div");
    boardEl.className = "board";

    const fragment = document.createDocumentFragment();

    game.getBoard().forEach((cell, i) => {
      const box = document.createElement("div");
      box.className = "box";
      box.dataset.index = i;
      box.textContent = cell || "";
      box.addEventListener("click", handleBoxClick);
      fragment.appendChild(box);
    });

    boardEl.appendChild(fragment);
    gameWrapper.appendChild(boardEl);

    const statusEl = document.createElement("p");
    statusEl.className = "status";
    statusEl.textContent = `Current Turn: ${game.getCurrentPlayer()}`;
    gameWrapper.appendChild(statusEl);
  };

  const handleBoxClick = (e) => {
    const index = +e.target.dataset.index;
    const result = game.playMove(index);

    if (result.status === "invalid") return;

    if (result.status === "finished") {
      renderResult(result.winner);
      return;
    }

    renderBoard();
  };

  const renderResult = (winner) => {
    gameWrapper.innerHTML = "";

    const resultDiv = document.createElement("div");
    resultDiv.className = "result";

    const label = document.createElement("p");
    label.className = "winner_label";
    label.textContent =
      winner === "draw" ? "It's a Draw!" : `Winner: ${winner}`;

    const resetBtn = document.createElement("button");
    resetBtn.className = "reset_btn";
    resetBtn.textContent = "Restart Game";
    resetBtn.onclick = () => {
      game.restart();
      renderBoard();
    };

    resultDiv.append(label, resetBtn);
    gameWrapper.append(resultDiv);
  };

  // Initial render
  renderBoard();
}

// ==== Initialize ====
createGameUI();
