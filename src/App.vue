<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div id="area"></div>
    <div id="personal" @click="toPersonal">
      <i class="icon iconfont icongerenzhongxin1"></i>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import func from './vue-temp/vue-editor-bridge';

import Epub from 'epubjs'

export default {
  name: "app",
  data: function() {
    return {};
  },
  methods:{
    toPersonal:function(){
      // ths.$router.push()
      console.log("!23");
    }
  },
  mounted:function(){
    this.book = new Epub("http://140.143.24.96/epubBook/8720238.epub");
    this.rendition = this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
      method: 'default'
    })
    this.rendition.display()
  }
};
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_1101334_eiees6olxs4.css");
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   // text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
#app {
  #personal {
    position: fixed;
    bottom: 40px;
    left: 40px;
    height:60px;
    width:60px;
    border-radius: 50%;
    border: solid #c8c7cc 2upx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(102, 102, 102, 0.6);
    i {
      padding: 10px;
      font-size: 40px;
      color: rgb(22, 194, 194);
    }
  }
}
</style>
