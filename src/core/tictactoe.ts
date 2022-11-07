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
  otherPlayer: Player = "X";
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

    if (winner) {
      this.state = GameState.Victory;
      this.winner = winner;
      return;
    }

    if (this.isBoardFull()) {
      this.state = GameState.Draw;
      return;
    }

    this.currPlayer = this.currPlayer === "O" ? "X" : "O";
    this.otherPlayer = this.currPlayer === "O" ? "X" : "O";
  }

  bestPlay() {
    let bestScore = -Infinity;
    let bestY!: number;
    let bestX!: number;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (this.board[y][x] === null) {
          this.board[y][x] = this.currPlayer;
          let score = this.minimax(0, false);
          this.board[y][x] = null;
          if (score > bestScore) {
            bestScore = score;
            bestY = y;
            bestX = x;
          }
        }
      }
    }

    this.play(bestY, bestX);
  }

  private minimax(depth: number, isCurrPlayerTurn: boolean): number {
    const winner = checkForWinner(this.board);

    if (winner) {
      if (winner === this.currPlayer) return 10 - depth;
      return -10 + depth;
    }

    if (this.isBoardFull()) {
      return 0;
    }

    if (isCurrPlayerTurn) {
      let maxScore = -Infinity;
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (this.board[y][x] === null) {
            this.board[y][x] = this.currPlayer;
            let score = this.minimax(depth + 1, false);
            this.board[y][x] = null;
            maxScore = Math.max(score, maxScore);
          }
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (this.board[y][x] === null) {
            this.board[y][x] = this.otherPlayer;
            let score = this.minimax(depth + 1, true);
            this.board[y][x] = null;
            minScore = Math.min(score, minScore);
          }
        }
      }
      return minScore;
    }
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
