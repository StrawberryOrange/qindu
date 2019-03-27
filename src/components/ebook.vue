<template>
  <div id="app">
    <div id="area"></div>
    <div id="personal" @click="toPersonal" 
         v-bind:class="{leaveForP:isleave,topForS:isTop}">
      <i class="icon iconfont icongerenzhongxin1"></i>
    </div>
    <div id="mask">
      <div id="mask-left" @click="prevPage"></div>
      <div id="mask-center" @click="toggleBar"></div>
      <div id="mask-right" @click="nextPage"></div>
    </div>
    <div id="menu-bar">
      <div class="menu-wrapper" v-bind:class="{leaveForB:isleave}">
        <div class="icon-wrapper" @click="showSetting(0)">
          <i class="icon iconfont iconProgressread"></i>
        </div>
        <div class="icon-wrapper" @click="showSetting(1)">
          <i class="icon iconfont iconzhuti"></i>
        </div>
        <div class="icon-wrapper" @click="showSetting(2)">
          <i class="icon iconfont iconfengniao_zitidaxiao"></i>
        </div>
        <div class="icon-wrapper" @click="showSetting(3)">
          <i class="icon iconfont iconshuqian"></i>
        </div>
      </div>
      <div class="setting-wrapper" v-bind:class="{leaveForS:isTop}">
        <div class="setting-progress" v-if="showTag === 0"></div>
        <div class="setting-theme" v-if="showTag === 1">
          <div class="theme-wrapper">
            <div
              class="theme"
              v-for="(item,index) in themeList"
              :key="index"
              @click="setTheme(index)"
            >
              <div
                class="preview"
                :style="{background: item.style.body.background}"
                :class="{'no-border': item.style.body.background !== '#fff'}"
              ></div>
              <div class="text" 
                   :class="{'selected':index===defaultTheme}">
                   {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="setting-font-size" v-if="showTag === 2"></div>
        <div class="setting-mark" v-if="showTag === 3"></div>
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
      isleave: true,
      isTop: false,
      // isleave_forS: false,
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#999",
              background: "#000"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgb(241, 236, 226)"
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {},
      showTag: -1
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
      this.registerTheme();
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
      if (this.isleave) {
        this.showTag = -1;
        this.isTop = false;
      }
      // this.isleave_forS = true;
    },
    showSetting: function(tag) {
      this.showTag = tag;
      this.isTop = true;
    },
    selectProgress: function() {
      console.log("selectProjress");
    },
    selectTheme: function() {
      console.log("selectTemes");
    },
    selectFontsize: function() {
      console.log("selecfFontsize");
    },
    addMark: function() {
      console.log("addMark");
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
    //设置主题
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
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
// @import url("//at.alicdn.com/t/font_1101334_gp70avx2014.css");

#app {
  position: relative;
  #personal {
    z-index: 13;
    position: fixed;
    bottom: 88px;
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
    transition: all 0.5s ease;
    &.leaveForP {
      transform: translate3d(0, 300%, 0);
      transition: all 0.5s ease;
    }
    &.topForS {
      transform: translate3d(0, -60px, 0);
      transition: all 0.3s ease;
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
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 12;
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(102, 102, 102, 0.6);
      display: flex;
      height: 48px;
      // background-color: aqua;
      // justify-content: center;
      align-items: center;
      &.leaveForB {
        transform: translate3d(0, 45px, 0);
        transition: all 0.3s ease;
      }
      .icon-wrapper {
        flex-grow: 1;
        display: flex;
        justify-content: center;
      }
    }
    .setting-wrapper {
      position: fixed;
      bottom: 0px;
      left: 0;
      right: 0;
      transition: all 0.1s ease;
      z-index: 12;
      &.leaveForS {
        transform: translate3d(0, -47px, 0);
        transition: all 0.1s ease;
      }
      .setting-progress {
        height: 60px;
        background-color: red;
      }
      .setting-theme {
        background-color: white;
        box-shadow: 0 -5px 5px rgba(102, 102, 102, 0.4);
        height: 60px;
        .theme-wrapper {
          display: flex;
          flex-direction: row;
          .theme {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 60px;
            .preview {
              height: 30px;
              margin: 5px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              &.no-border {
                border: none;
              }
            }
            .text {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ccc;
              &.selected {
                color: #333;
              }
            }
          }
        }
      }
      .setting-font-size {
        height: 60px;
        background-color: gray;
      }
    }
  }
}
</style>

