<template>
  <div id="app">
    <div id="area"></div>
    <div id="personal" @click="toPersonal" v-bind:class="{leaveForP:isleave,topForS:isTop}">
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
        <div class="setting-progress" v-if="showTag === 0">
          <div class="progress-wrapper">
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
            >
          </div>
          <div class="text-wrapper">
            <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
          </div>
        </div>
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
              <div class="text" :class="{'selected':index===defaultTheme}">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="setting-font-size" v-if="showTag === 2">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item, index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
          >A</div>
        </div>
        <div class="setting-mark" v-if="showTag === 3"></div>
      </div>
    </div>
    <router-view @chooseBook="chooseBook" @offreg_login="offreg_login"></router-view>
  </div>
</template>
<script>
//http://192.168.137.1/ebook/8720238.epub
//http://localhost/ebook/8720238.epub

import Epub from "epubjs";
// import { clearInterval } from "timers";
// const ebookurl = "/static/8720238.epub";
// const ebookurl = "http://localhost/ebook/8720267.epub";
// const ebookurl = "http://140.143.24.96/epubBook/8720238.epub"

export default {
  name: "ebook",
  data: function() {
    return {
      isleave: false,
      isTop: false,
      bookurl: "http://140.143.24.96/static/8720000.epub",
      // isleave_forS: false,
      fontSizeList: this.GLOBAL.fontSizeList,
      defaultFontSize: 16,
      userDefaultFontSize: "",
      themeList: this.GLOBAL.themeList,
      defaultTheme: 3,
      userDefaultTheme: "",
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {},
      showTag: -1,
      progress: 0,
      user: "",
      userInfo: {},
      tagAvailable: false
    };
  },
  watch: {
    userInfo: function() {
      if (this.rendition && this.userInfo.default_fontsize) {
        setTimeout(() => {
          this.setFontSize(this.userInfo.default_fontsize);
        }, 100);
      }
    }
  },
  methods: {
    toPersonal: function() {
      this.$router.push({
        name: "personal",
        query: {
          id: this.user
        }
      });
      // console.log("!23");
    },
    prevPage: function() {
      if (this.rendition) {
        this.rendition.prev();
        setTimeout(() => {
          this.setFontSize(this.defaultFontSize);
        }, 100);
      }
    },
    nextPage: function() {
      if (this.rendition) {
        this.rendition.next();
        setTimeout(() => {
          this.setFontSize(this.defaultFontSize);
        }, 100);
        setTimeout(() => {
          this.setFontSize(this.defaultFontSize);
        }, 1000);
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
      if (tag != 3) {
        this.isTop = true;
      } else {
        this.isTop = false;
        console.log("baocunanniu~~biubiubiu");
        this.addReadingProgress();
      }
    },
    addReadingProgress: function() {
      var self = this;
      if (self.tagAvailable) {
        self
          .$createDialog({
            type: "prompt",
            title: "上传书签内容",
            content:
              "在这里输入书签提示，您将在下次登陆时看到书签提示，以帮助您快速跳转至上次阅读点。",
            onConfirm: function(e, value) {
              console.log(value);
              self.updateReadingProgress(value);
            }
          })
          .show();
      } else {
        self.GLOBAL.toast({
          type: "error",
          message: "请先登录！"
        });
      }
    },
    updateReadingProgress: function(value) {
      var self = this;
      self.GLOBAL.loadingShow();
      self.GLOBAL.myaxios({
        method: "POST",
        data: {
          id: self.user,
          progress: value
        },
        url: self.GLOBAL.PATH + "updateprogress",
        success: function(res) {
          if (res.code == "0") {
            console.log(res);
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "correct",
              message: "上传成功",
              time: 1000
            });
          } else {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "error",
              message: "上传书签内容失败：" + res.message,
              time: 1000
            });
            self.$router.go(0);
          }
        }
      });
    },
    // 松开进度条触发
    onProgressChange: function(progress) {
      console.log("selectProjress" + progress);
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    // 拖动进度条出发
    onProgressInput: function(progress) {
      this.progress = progress;
      console.log("onProgressInput" + progress);
      this.$refs.progress.style.backgroundSize = "${this.progress}% 100%";
    },
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
    },
    toggleAvailable: function() {
      if (this.userInfo.default_fontsize)
        this.setFontSize(this.userInfo.default_fontsize);
      // console.log(this.userInfo.default_theme);
      if (this.userInfo.default_theme)
        this.setTheme(this.userInfo.default_theme);
    },
    showEpub: function(ebookurl) {
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
      this.setFontSize(this.defaultFontSize);
      // 注册主题
      this.registerTheme();
      // 设置默认主题
      this.setTheme(this.defaultTheme);
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
          console.log("电子书解析完毕");
        });
      // console.log(this.rendition)
    },
    getUserInfo: function() {
      var self = this;
      this.GLOBAL.loadingShow();
      self.GLOBAL.myaxios({
        method: "GET",
        data: {
          id: self.user
        },
        url: self.GLOBAL.PATH + "readinginfo",
        success: function(res) {
          if (res.code == "0") {
            // let data = res.data;
            self.GLOBAL.loadingHide();
            // console.log("获取到了个人信息，如下");
            self.userInfo = res.data;
            console.log(Object.prototype.toString.call(res.data.progress));
            if (res.data.progress) {
              self
                .$createDialog({
                  type: "alert",
                  title: "欢迎回来",
                  content: "上次进度：" + res.data.progress,
                  icon: "cubeic-alert"
                })
                .show();
            }
            console.log(self.bookurl);
            self.showEpub(self.bookurl);
            setTimeout(function() {
              self.toggleAvailable();
            }, 1000);
          } else {
            self.GLOBAL.loadingHide();
            window.localStorage.setItem("user", "");
            self.GLOBAL.toast({
              type: "error",
              message: "获取个人信息失败：" + res.message + ",请重新登陆！",
              time: 1000
            });
            self.$router.go(0);
          }
        }
      });
    },
    offreg_login: function(id) {
      window.location.href = window.location.href.split("#")[0] + "#/ebook";
      window.location.reload();
      // console.log("看看是不是刷新了呢");
      // alert(id);
    },
    chooseBook: function(item) {
      this.offreg_login("1");
      // console.log("heiheihaha");
      // console.log(item);
      // this.$router.go(-2);
      // this.$router.go(0);
      // window.location.href = window.location.href.split("#")[0] + "#/ebook";
      // console.log(window.location.href.split("#")[0] + "#/ebook");
    }
  },
  mounted: function() {
    var user = window.localStorage.getItem("user");
    if (user) {
      this.user = user;
      this.bookurl = window.localStorage.getItem("bookurl")
        ? window.localStorage.getItem("bookurl")
        : this.bookurl;
      this.tagAvailable = true;
      this.getUserInfo();
    } else {
      this.showEpub(this.bookurl);
    }
    // this.showEpub(this.bookurl);
    // this.GLOBAL.myaxios({
    //   url: "http://127.0.0.1:5000/login",
    //   method: "POST",
    //   data: {
    //     username: "1518589418123"
    //   },
    //   success: function(res) {
    //     console.log(res);
    //   }
    // });
  }
};
</script>

<style lang="scss">
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
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 11;
    #mask-left {
      flex-grow: 1;
      width: 120px;
    }
    #mask-center {
      flex-grow: 2;
      width: 120px;
    }
    #mask-right {
      flex-grow: 1;
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
        background-color: white;
        box-shadow: 0 -5px 5px rgba(102, 102, 102, 0.4);
        .progress-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 30px;
          box-sizing: border-box;
          .progress {
            width: 100%;
            -webkit-appearance: none;
            height: 2px;
            background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
            background-size: 0 100%;
            &:focus {
              outline: none;
            }
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: white;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
              border: 1px solid #ddd;
            }
          }
        }
        .text-wrapper {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          color: #333;
          font-size: 12px;
          text-align: center;
        }
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
        box-shadow: 0 -5px 5px rgba(102, 102, 102, 0.4);
        background-color: white;
        display: flex;
        .preview {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 20px;
        }
        .select {
          display: flex;
          flex: 1;
          .select-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            &:first-child {
              .line {
                &:first-child {
                  border-top: none;
                }
              }
            }
            &:last-child {
              .line {
                &:last-child {
                  border-top: none;
                }
              }
            }
            .line {
              flex: 1;
              height: 0;
              border-top: 1px solid #ccc;
            }
            .point-wrapper {
              position: relative;
              flex: 0 0 0;
              width: 0;
              height: 7px;
              border-left: 1px solid #ccc;
              .point {
                position: absolute;
                top: -8px;
                left: -10px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 1px solid #ccc;
                box-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
                display: flex;
                align-items: center;
                justify-content: center;
                .small-point {
                  width: 5px;
                  height: 5px;
                  background: black;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

