<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import "normalize.css";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI",
    "Helvetica Neue", HelveticaNeue, YuGothic, "Yu Gothic Medium", "Yu Gothic",
    Verdana, Meiryo, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
