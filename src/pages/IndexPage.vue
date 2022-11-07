<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="column items-center q-gutter-lg">
        <div>
          <span class="text-h4">{{ STATE_TO_STR[game.state] }}</span>
        </div>

        <div v-if="game.state === GameState.Running">
          <span>Current player: {{ game.currPlayer }}</span>
        </div>
        <div v-if="game.winner !== undefined">
          <span>Winner: {{ game.winner }}</span>
        </div>

        <table>
          <tbody>
            <tr v-for="(row, y) in game.board">
              <td
                v-for="(cell, x) in row"
                @click="play(y, x)"
                :class="[
                  cell === null && game.state === GameState.Running
                    ? 'empty'
                    : 'fulfilled',
                ]"
              >
                {{ cell === null ? "" : cell }}
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="game.state !== GameState.Running">
          <q-btn
            unelevated
            label="New Game"
            color="primary"
            @click="newGame"
          ></q-btn>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { GameState, TicTacToe } from "src/core/tictactoe";
import { ref } from "vue";

const game = ref(new TicTacToe());

const STATE_TO_STR: Record<GameState, string> = {
  [GameState.Draw]: "Draw 🫤",
  [GameState.Running]: "Let's play !",
  [GameState.Victory]: "Victory 🎉",
};

function newGame() {
  game.value = new TicTacToe();
}

function play(y: number, x: number) {
  game.value.play(y, x);
  game.value.bestPlay();
}
</script>

<style scoped>
td {
  font-size: 32px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 100px;
  width: 100px;
  text-align: center;
}

td.empty {
  cursor: pointer;
}

td.empty:hover {
  background: rgba(0, 0, 0, 0.06);
}

td.fulfilled {
  cursor: not-allowed;
}
</style>
