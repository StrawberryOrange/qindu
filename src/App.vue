<template>
  <div id="app">
    <ebook/>
  </div>
</template>

<script>
import ebook from './components/ebook.vue'
export default {
  name: 'app',
  components: {
    ebook
  }
}
</script>

<style>
@import url("//at.alicdn.com/t/font_1101334_ngt7a79kbo.css");
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
