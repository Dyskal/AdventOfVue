<template>
  <div class="flex h-full w-full flex-col items-center justify-center text-center">
    <table class="h-80 w-80 table-fixed border-collapse text-4xl">
      <tr
        v-for="(_, row) in 3"
        :key="row"
      >
        <td
          v-for="(item, col) in grid[row]"
          :key="col"
          class="border-2"
          @click="click(row, col)"
        >
          {{ item.description }}
        </td>
      </tr>
    </table>

    <p
      v-if="game"
      class="my-5 text-2xl"
    >
      {{ `It's ${player.description}'s turn.` }}
    </p>
    <p
      v-else-if="game === undefined"
      class="my-5 text-2xl"
    >
      It's a draw!
    </p>
    <p
      v-else
      class="my-5 text-2xl"
    >
      {{ `${player.description} has won!` }}
    </p>
    <button
      :style="{visibility: game ? 'hidden' : 'visible'}"
      class="rounded-lg bg-green px-3 py-2 text-xl focus:outline-none"
      @click="playagain"
    >
      Play again
    </button>
  </div>
</template>

<script>
const State = Object.freeze({
  Blank: Symbol("⠀"),
  X: Symbol("╳"),
  O: Symbol("◯")
});

export default {
  name: "App",
  data() {
    return {
      grid: [
        [State.Blank, State.Blank, State.Blank],
        [State.Blank, State.Blank, State.Blank],
        [State.Blank, State.Blank, State.Blank]
      ],
      player: Math.floor(Math.random() * 2) ? State.O : State.X,
      game: true,
      moves: 0
    };
  },
  methods: {
    click(row, col) {
      if (this.game && this.grid[row][col] === State.Blank) {
        this.grid[row][col] = this.player;
        this.moves++;
        if (this.moves > 4) this.game = this.verification(row, col);
        if (this.game) this.player = this.player === State.O ? State.X : State.O;
      }
    },
    verification(row, col) {
      // Vérif ligne
      for (const i of [0, 1, 2]) {
        if (this.grid[row][i] !== this.player) break;
        if (i === 2) return false;
      }
      // Vérif colonne
      for (const i of [0, 1, 2]) {
        if (this.grid[i][col] !== this.player) break;
        if (i === 2) return false;
      }
      // Vérif diagonale
      if (row === col) {
        for (const i of [0, 1, 2]) {
          if (this.grid[i][i] !== this.player) break;
          if (i === 2) return false;
        }
      }
      // Vérif diagonale inverse
      if (row + col === 2) {
        for (const i of [0, 1, 2]) {
          if (this.grid[i][2 - i] !== this.player) break;
          if (i === 2) return false;
        }
      }
      if (this.moves === 9) return undefined;
      return true;
    },
    playagain() {
      this.grid = [
        [State.Blank, State.Blank, State.Blank],
        [State.Blank, State.Blank, State.Blank],
        [State.Blank, State.Blank, State.Blank]
      ];
      this.player = Math.floor(Math.random() * 2) ? State.O : State.X;
      this.game = true;
      this.moves = 0;
    }
  }
};
</script>

<style>
table tr:first-child td {
  border-top: none;
}

table tr:last-child td {
  border-bottom: none;
}

table tr td:first-child {
  border-left: none;
}

table tr td:last-child {
  border-right: none;
}
</style>
