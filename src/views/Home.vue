<template>
  <div @click="toLibrary">
    <div class="upper">
      <svg style="width: 32px; height: 32px" viewBox="2 1 26 19">
        <path
          fill="currentColor"
          color="#299162"
          d="M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M20 18H4V8H20M13 17V14H15V17H17V13H19L14 9L9 13H11V17Z"
        />
      </svg>
      <p>Photo library.</p>
    </div>
    <div class="under">
      <svg style="width: 50px; height: 50px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          color="#17232e"
          d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  toLibrary() {
    this.$router.push("./library");
  }
}
</script>
<style>
.upper {
  height: calc(var(--vh, 1vh) * 50);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-weight: bold;
  font-size: 1.3rem;
}
.under {
  height: calc(var(--vh, 1vh) * 47);
  display: flex;
  justify-content: center;
  padding-top: calc(var(--vh, 1vh) * 3);
}
p {
  color: #2c3e50;
  padding: 0;
  margin-block-end: 0;
}
</style>
