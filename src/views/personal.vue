<template>
  <div id="user">
    <div class="title">
      <div class="icon-wrapper">
        <i class="icon iconfont iconleft" @click="back"></i>
      </div>
      <div class="title-wrapper">
        <div>个人中心</div>
      </div>
    </div>

    <div class="header" v-if="islogin">
      <div class="user-name">
        <span class="name">用户账号</span>
        <span class="user">{{id}}</span>
      </div>
    </div>
    <div class="header-nologin" v-if="!islogin">
      <div class="header-content">
        <div @click="reg_login">注册/登录</div>
      </div>
    </div>

    <div class="sitting">
      <div class="sitting-content" @click="toEbookStore">
        <span class="name">书籍商店</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
      <div class="sitting-content" @click="toMyBookShelf">
        <span class="name">我的书架</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
      <!-- <div class="sitting-content">
        <span class="name">进度管理</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>-->
    </div>

    <div class="sitting">
      <div class="sitting-content" @click="setDefaultFontSize">
        <span class="name">默认字号</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
      <div class="sitting-content" @click="setDefaultTheme">
        <span class="name">默认主题</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
      <div class="sitting-content" @click="setUserTheme">
        <span class="name">自定义主题</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
    </div>

    <div class="sitting">
      <div class="sitting-content" hover-class="navigator-hover">
        <span class="name">账户设置</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
    </div>
    <div class="button-exit" @click="exit" v-if="islogin">
      <span>退出登录</span>
    </div>
    <div class="zhanwei"></div>
    <reglogin @offreg_login="offreg_login" v-if="regLogShow"></reglogin>
    <router-view @chooseBook="chooseBook"></router-view>
  </div>
</template>

<script>
var self = this;
import reglogin from "../components/reg_login";
export default {
  components: {
    reglogin
  },
  data: function() {
    return {
      id: "",
      regLogShow: false,
      islogin: this.GLOBAL.islogin
    };
  },
  watch: {
    id: function() {
      console.log(this.id);
    }
  },
  // computed: {
  //   islogin: function() {
  //     var self = this;
  //     // console.log(this)
  //     setInterval(function() {
  //       console.log(self.GLOBAL.islogin);
  //       return self.GLOBAL.islogin;
  //     }, 1000);
  //   }
  // },
  mounted: function() {
    var self = this;
    // console.log(this)
    // setInterval(function() {
    //   console.log("wenjianxiade islogin" + self.islogin);
    // }, 5000);
  },
  methods: {
    chooseBook: function(item) {
      this.$emit("chooseBook", item);
    },
    setDefaultFontSize: function() {
      var self = this;
      if (self.id == "") {
        self.GLOBAL.toast({
          type: "error",
          message: "请先登录！"
        });
        return;
      }
      // if (!this.picker) {
      this.picker = this.$createPicker({
        title: "字号选择",
        data: [this.GLOBAL.pickerlistForFontSize],
        onSelect: function(selectedVal, selectedIndex, selectedText) {
          self.updateDefaultFontsize(selectedVal.join(" "));
          // self.GLOBAL.toast({
          //   type: "correct",
          //   message: "默认字号" + selectedText.join(" ")
          // });
        }
      });
      this.picker.show();
    },
    updateDefaultFontsize: function(val) {
      var self = this;
      self.GLOBAL.loadingShow();
      self.GLOBAL.myaxios({
        method: "POST",
        data: {
          id: self.id,
          fontsize: val
        },
        url: self.GLOBAL.PATH + "updatefontsize",
        success: function(res) {
          if (res.code == "0") {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "correct",
              message: "修改成功",
              time: 1000
            });
          } else {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "error",
              message: res.message,
              time: 1000
            });
          }
        }
      });
    },
    setDefaultTheme: function() {
      var self = this;
      if (self.id == "") {
        self.GLOBAL.toast({
          type: "error",
          message: "请先登录！"
        });
        return;
      }
      // if (!this.picker) {
      this.picker = this.$createPicker({
        title: "主题选择",
        data: [this.GLOBAL.pickerlistForTheme],
        onSelect: function(selectedVal, selectedIndex, selectedText) {
          console.log(selectedVal.join(" "));
          self.updateDefaultTheme(selectedVal.join(" "));
          // self.GLOBAL.toast({
          //   type: "correct",
          //   message: "默认主题：" + selectedText.join(" ")
          // });
        }
      });
      // }
      this.picker.show();
    },
    updateDefaultTheme: function(val) {
      var self = this;
      self.GLOBAL.loadingShow();
      self.GLOBAL.myaxios({
        method: "POST",
        data: {
          id: self.id,
          theme: val
        },
        url: self.GLOBAL.PATH + "updatetheme",
        success: function(res) {
          if (res.code == "0") {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "correct",
              message: "修改成功",
              time: 1000
            });
          } else {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "error",
              message: res.message,
              time: 1000
            });
          }
        }
      });
    },
    back: function() {
      this.$router.back();
    },
    reg_login: function() {
      this.regLogShow = true;
    },
    offreg_login: function(id) {
      if (id != -1) {
        this.islogin = true;
        this.id = id;
      }
      this.regLogShow = false;
    },
    setUserTheme: function() {
      var self = this;
      if (self.id == "") {
        self.GLOBAL.toast({
          type: "error",
          message: "请先登录！"
        });
        return;
      }
      this.$router.push({
        name: "userTheme"
      });
    },
    toEbookStore: function() {
      this.$router.push({
        name: "ebookStore",
        query: {
          id: this.id
        }
      });
    },
    toMyBookShelf: function() {
      var self = this;
      if (self.id == "") {
        self.GLOBAL.toast({
          type: "error",
          message: "请先登录！"
        });
        return;
      }
      this.$router.push({
        name: "myBookshelf",
        query: {
          id: this.id
        }
      });
    },
    exit: function() {
      console.log("退出登录~");
      this.islogin = false;
      this.id = "";
    }
  }
};
</script>
<style lang="scss">
#user {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  z-index: 20;

  .title {
    position: relative;
    .icon-wrapper {
      position: absolute;
      // top:0;
      // z-index:102;
      top: 11px;
      left: 10px;
      i {
        font-size: 28px;
      }
    }
    .title-wrapper {
      height: 50px;
      background-color: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .header {
    // margin:10px 0;
    border-top: solid #c8c7cc 0.5px;
    border-bottom: solid #c8c7cc 0.5px;
    background-color: #fff;

    .user-name {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 56px;

      .name {
        margin-left: 20px;
        // font-size: 14px;
        color: #666;
      }

      .user {
        margin-right: 20px;
        // font-size: 14px;
        color: 12px;
      }
    }
  }
  .header-nologin {
    background-color: #fff;
    border-top: solid #c8c7cc 0.5px;
    border-bottom: solid #c8c7cc 0.5px;
    .header-content {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        color: rgb(234, 88, 92);
        // border: solid 2px #aaaaaa;
        padding: 10px;
        box-shadow: 0 0 5px #ccc;
        border-radius: 7px;
      }
    }
  }

  .sitting {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-top: solid #c8c7cc 0.5px;
    border-bottom: solid #c8c7cc 0.5px;

    .sitting-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 56px;
      border-bottom: solid #c8c7cc 0.5px;

      .name {
        margin-left: 20px;
        color: #666;
      }

      .right {
        margin-right: 20px;
        // font-size: 14px;
        color: #666;
      }
    }
  }

  .button-exit {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    background-color: white;
    border-top: solid #c8c7cc 0.5px;
    border-bottom: solid #c8c7cc 0.5px;
    span {
      color: rgb(234, 88, 92);
    }
  }

  .zhanwei {
    flex-grow: 1;
    // height: 600px;
    background-color: #f8f8f8;
  }
}
</style>


