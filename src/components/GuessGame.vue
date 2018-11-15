<template>
  <div class="game">
    <h1>Guess the number</h1>

    <div class="game-menu" v-if="!isGameStart">
      Сhoose the level?

      <button @click="handleStartGame" value="easy">
        Easy
      </button>

      <button @click="handleStartGame" value="hard">
        Hard
      </button>
    </div>

    <div class="game-playground" v-else>
      <div class="game-status">
        {{userGameStatus === "hot" ? "🔥" : "❄️"}}
      </div>

      <input v-model="guessNumber" class="game-input" type="number" />
      <button @click="tryGuessNumber">
        Guess!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class GuessGame extends Vue {
  guessNumber: number = 0;
  isGameStart: boolean = false;
  currentMode: string = "";

  minGuessedNumber: number = 0;
  maxGuessedNumber: number = 0;
  guessedNumber: number = 0;

  userGameStatus: string = "";

  handleStartGame(e: Event) {
    const mode = (<HTMLInputElement>e.target).value;

    this.startNewGame(mode);
  }

  createGuessGameNumber(mode: string): number {
    switch (mode) {
      case "easy":
        this.maxGuessedNumber = 10;
        break;
      case "hard":
        this.maxGuessedNumber = 25;
        break;
    }

    const number = Math.ceil(Math.random() * this.maxGuessedNumber);

    return number;
  }

  hasUserGuessedNumber(number: number): string {
    if (number == this.guessedNumber) {
      return "yes";
    }

    // when user in 1/4 of guessedNumber it's cold
    if (Math.abs(this.guessedNumber - number) > this.guessedNumber / 4) {
      return "cold";
    } else {
      return "hot";
    }
  }

  startNewGame(mode: string) {
    this.guessedNumber = this.createGuessGameNumber(mode);

    this.currentMode = mode;
    this.isGameStart = true;
  }

  tryGuessNumber() {
    const userNumber: number = this.guessNumber;

    this.userGameStatus = this.hasUserGuessedNumber(userNumber);
  }
}
</script>

<style lang="stylus">
.game {
  &-status {
    font-size: 28px;
  }

  &-input {
    font-size: 21px;
  }
}
</style>
