const gameWrapper = document.querySelector(".game");

const moves = new Array(9).fill(null); //fill to ensure to retreive val at every index
let last_recorded_move = null;
let winner = null;

const winning_moves = [
  //x-axis
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //y-axis
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWinner = () => {
  for (let combo of winning_moves) {
    const [a, b, c] = combo;
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      winner = moves[a];
      const winner_label = document.createElement("p");
      winner_label.innerText = `Winner is ${winner}`;
      winner_label.className = "winner_label";
      const reset_btn = document.createElement("button");
      reset_btn.className = "reset_btn";
      reset_btn.textContent = "Restart Game";
      reset_btn.onclick = resetGame;
      gameWrapper.append(winner_label, reset_btn);
      return;
    }
  }
};

const resetGame = () => {
  // Clear game state
  moves.fill(null);
  last_recorded_move = null;
  winner = null;

  // Remove existing board and result elements
  const board = document.querySelector(".board");
  const resultElements = gameWrapper.querySelectorAll(
    ".winner_label,.reset_btn"
  );

  if (board) board.remove();
  resultElements.forEach((el) => el.remove());

  // Re-render fresh board
  renderBoard();
};
const onBoxClick = (node, pos) => {
  if (node.dataset.recorded || winner) return;
  let move = !last_recorded_move ? "x" : last_recorded_move === "x" ? "o" : "x";
  last_recorded_move = move;
  node.innerText = move;
  node.dataset.recorded = move;
  moves[pos] = move;
  checkForWinner();
};
const renderBoard = () => {
  const board = document.createElement("div");
  board.className = "board";
  for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.className = `box box-${i + 1}`;
    box.addEventListener("click", () => onBoxClick(box, i));
    board.append(box);
  }
  gameWrapper.append(board);
};

renderBoard();
