import {
  Board,
  BoardCell,
  checkForWinner,
  GameState,
  TicTacToe,
} from "./tictactoe";

describe("tictactoe", () => {
  let game: TicTacToe;

  beforeEach(() => {
    game = new TicTacToe();
  });

  it("setup empty board", () => {
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ].forEach(([y, x]) => {
      expect(game.board[y][x]).toBe(null);
    });
  });

  describe("winner check", () => {
    it("detect winner", () => {
      const board: BoardCell[][] = [
        ["O", "O", "O"],
        ["X", "X", null],
        ["O", null, "X"],
      ];

      const winner = checkForWinner(board);

      expect(winner).toEqual('O');
    });

    it("detect no winner", () => {
      const board: Board = [
        ["O", "O", "X"],
        ["X", "X", "O"],
        ["O", "O", "X"],
      ];

      const winner = checkForWinner(board);

      expect(winner).toBeUndefined();
    });
  });

  it("switch player", () => {
    const player0 = game.currPlayer;
    game.play(0, 0);
    const player1 = game.currPlayer;
    game.play(1, 1);
    const player2 = game.currPlayer;

    expect(player0).toBe("O");
    expect(player1).toBe("X");
    expect(player2).toBe("O");
  });

  it("does not play if cell already played", () => {
    const player0 = game.currPlayer;
    game.play(0, 0);
    const player1 = game.currPlayer;
    game.play(0, 0);
    const player2 = game.currPlayer;

    expect(player0).toBe("O");
    expect(player1).toBe("X");
    expect(player2).toBe("X");
  });

  describe("game state", () => {
    it("run", () => {
      const state1 = game.state;
      game.play(0, 0);
      const state2 = game.state;
      game.play(0, 1);
      const state3 = game.state;

      expect(state1).toBe(GameState.Running);
      expect(state2).toBe(GameState.Running);
      expect(state3).toBe(GameState.Running);
    });

    it("draw", () => {
      game.play(0, 0);
      game.play(0, 2);
      game.play(0, 1);
      game.play(1, 0);
      game.play(1, 2);
      game.play(1, 1);
      game.play(2, 0);
      game.play(2, 2);
      game.play(2, 1);

      expect(game.state).toBe(GameState.Draw);
    });

    it("victory before last step (empty cells remaining)", () => {
      game.play(0, 0);
      game.play(1, 0);
      game.play(0, 1);
      game.play(1, 1);
      game.play(0, 2);

      expect(game.state).toBe(GameState.Victory);
    });

    it("victory with full board (victory on last play)", () => {
      game.play(1, 0);
      game.play(0, 0);
      game.play(1, 1);
      game.play(0, 1);
      game.play(2, 0);
      game.play(1, 2);
      game.play(2, 2);
      game.play(2, 1);
      game.play(0, 2);

      expect(game.state).toBe(GameState.Victory);
    });
  });

  it("returns winner", () => {
    game.play(1, 0);
    game.play(0, 0);
    game.play(1, 1);
    game.play(0, 1);
    game.play(2, 0);
    game.play(1, 2);
    game.play(2, 2);
    game.play(2, 1);
    game.play(0, 2);

    expect(game.winner).toBe("O");
  });

  describe("does not switch current player after last move", () => {
    it("on victory", () => {
      game.play(0, 0);
      game.play(1, 0);
      game.play(0, 1);
      game.play(1, 1);
      const player0 = game.currPlayer;
      game.play(0, 2);
      const player1 = game.currPlayer;

      expect(player0).toBe(player1);
    });

    it("on draw", () => {
      game.play(0, 0);
      game.play(0, 2);
      game.play(0, 1);
      game.play(1, 0);
      game.play(1, 2);
      game.play(1, 1);
      game.play(2, 0);
      game.play(2, 2);
      const player0 = game.currPlayer;
      game.play(2, 1);
      const player1 = game.currPlayer;

      expect(player0).toBe(player1);
    });
  });

  it("does not allow playing after victory", () => {
    game.play(0, 0);
    game.play(1, 0);
    game.play(0, 1);
    game.play(1, 1);
    game.play(0, 2);

    // After victory play
    game.play(2, 0);

    expect(game.board[2][0]).toBe(null);
  });

  describe("best move", () => {
    it("play best move 1", () => {});
  });
});
