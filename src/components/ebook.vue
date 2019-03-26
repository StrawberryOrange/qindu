<template>
  <div id="app">
    <div id="area"></div>
    <div id="personal" @click="toPersonal" v-bind:class="{leave:isleave}">
      <i class="icon iconfont icongerenzhongxin1"></i>
    </div>
    <div id="mask">
      <div id="mask-left" @click="prevPage"></div>
      <div id="mask-center" @click="toggleBar"></div>
      <div id="mask-right" @click="nextPage"></div>
    </div>
    <div id="menu-bar">
      <div class="menu-wrapper">
        <div class="icon-wrapper">
          <i class="icon iconfont iconProgressread"></i>
        </div>
        <div class="icon-wrapper">
          <i class="icon iconfont iconzhuti"></i>
        </div>
        <div class="icon-wrapper">
          <i class="icon iconfont iconA"></i>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
//http://192.168.137.1/ebook/8720238.epub
//http://localhost/ebook/8720238.epub

import Epub from "epubjs";
const ebookurl = "http://localhost/ebook/8720238.epub";
// const ebookurl = "http://140.143.24.96/epubBook/8720238.epub"

export default {
  name: "ebook",
  data: function() {
    return {
      isleave: false,
      defaultFontSize: 16,
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {}
    };
  },
  methods: {
    showEpub: function() {
      this.book = new Epub(ebookurl);
      this.rendition = this.book.renderTo("area", {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default"
      });
      this.rendition.display();
      //theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      // this.setFontSize(this.defaultFontSize);
      // 注册主题
      // this.registerTheme();
      // 设置默认主题
      // this.setTheme(this.defaultTheme);
      // Book对象的钩子函数ready
      this.book.ready
        .then(() => {
          this.navigation = this.book.navigation;
          // 生成Locations对象
          return this.book.locations.generate();
        })
        .then(result => {
          // 保存locations对象
          this.locations = this.book.locations;
          // 标记电子书为解析完毕状态
          this.bookAvailable = true;
        });
      // console.log(this.rendition)
    },
    toPersonal: function() {
      this.$router.push({
        name: "personal"
      });
      // console.log("!23");
    },
    prevPage: function() {
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage: function() {
      if (this.rendition) {
        this.rendition.next();
      }
    },
    toggleBar: function() {
      this.isleave = !this.isleave;
    },
    //跳转
    jumpTo(href) {
      this.rendition.display(href);
      // this.hideTitleAndMenu()
    },
    //注册主题
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    // 设置字号大小
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    }
  },
  mounted: function() {
    this.showEpub();
  }
};
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_1101334_gp70avx2014.css");

#app {
  position: relative;
  #personal {
    z-index: 12;
    position: fixed;
    bottom: 40px;
    left: 40px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    // border: solid #c8c7cc 2px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(102, 102, 102, 0.6);
    transition: all 0.5s linear;
    &.leave {
      transform: translate3d(0, 200%, 0);
      transition: all 0.5s ease;
    }
    i {
      padding: 10px;
      font-size: 40px;
      color: rgb(22, 194, 194);
    }
  }

  #mask {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 11;
    #mask-left {
      width: 120px;
    }
    #mask-center {
      flex-grow: 1;
    }
    #mask-right {
      width: 120px;
    }
  }
  #menu-bar {
    .menu-wrapper {
      display: flex;
      height: 48px;
      background-color: aqua;
      // justify-content: center;
      align-items: center;
      .icon-wrapper{
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>

