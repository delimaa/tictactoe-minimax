export type BoardCell = "O" | "X" | null;

export type Board = BoardCell[][];

export type Player = "O" | "X";

export enum GameState {
  Running,
  Draw,
  Victory,
}

export class TicTacToe {
  board: Board;
  currPlayer: Player = "O";
  state: GameState = GameState.Running;
  winner?: Player;

  constructor() {
    this.board = [];
    for (let y = 0; y < 3; y++) {
      this.board[y] = [];
      for (let x = 0; x < 3; x++) {
        this.board[y][x] = null;
      }
    }
  }

  play(y: number, x: number) {
    if (this.state !== GameState.Running || this.board[y][x] !== null) {
      return;
    }

    this.board[y][x] = this.currPlayer;

    const winner = checkForWinner(this.board);

    if (winner !== undefined) {
      this.state = GameState.Victory;
      this.winner = winner;
      return;
    }

    if (this.isBoardFull()) {
      this.state = GameState.Draw;
      return;
    }

    this.currPlayer = this.currPlayer === "O" ? "X" : "O";
  }

  private isBoardFull(): boolean {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell === null) {
          return false;
        }
      }
    }
    return true;
  }
}

const WIN_ALIGNMENTS = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

export function checkForWinner(board: Board): Player | undefined {
  for (const alignment of WIN_ALIGNMENTS) {
    const [coordsa, coordsb, coordsc] = alignment;
    const [ya, xa] = coordsa;
    const [yb, xb] = coordsb;
    const [yc, xc] = coordsc;
    const a = board[ya][xa];
    const b = board[yb][xb];
    const c = board[yc][xc];

    if (a !== null && a === b && a === c) {
      return a as Player;
    }
  }
}
