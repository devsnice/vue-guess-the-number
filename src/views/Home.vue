<template>
  <div class="home">
    <GuessGame />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GuessGame from "@/components/GuessGame.vue"; // @ is an alias to /src

@Component({
  components: {
    GuessGame
  }
})
export default class Home extends Vue {}
</script>
