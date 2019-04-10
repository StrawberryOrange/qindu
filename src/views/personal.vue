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
    <div class="header">
      <div class="user-name">
        <span class="name">用户昵称</span>
        <span class="user">{{username}}</span>
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
    <div class="button-exit" @click="exit">
      <span>退出登录</span>
    </div>
    <div class="zhanwei"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: this.GLOBAL.username
    };
  },
  // mounted:function(){
  //   for(item in this.GLOBAL.fontSizeList){
  //     this.pickerlistForFontSize.push({
  //       text:item.fontSize,
  //       value:item.fontSize
  //     })
  //   }
  //   console.log()
  // },
  methods: {
    setDefaultFontSize: function() {
      var self = this;
      // if (!this.picker) {
      this.picker = this.$createPicker({
        title: "字号选择",
        data: [this.GLOBAL.pickerlistForFontSize],
        onSelect: function(selectedText) {
          self.GLOBAL.toast({
            type: 'correct',
            message: "默认字号" + selectedText.join(" ")
          })
        }
      });
      // }
      this.picker.show();
    },
    setDefaultTheme: function() {
      var self = this;
      // if (!this.picker) {
      this.picker = this.$createPicker({
        title: "主题选择",
        data: [this.GLOBAL.pickerlistForTheme],
        onSelect: function(selectedText) {
          self.GLOBAL.toast({
            type: 'correct',
            message: "默认主题：" + selectedText.join(" ")
          })
        }
      });
      // }
      this.picker.show();
    },
    back: function() {
      this.$router.back();
    },
    setUserTheme: function() {
      this.$router.push({
        name: "userTheme"
      });
    },
    toEbookStore: function() {
      this.$router.push({
        name: "ebookStore"
      });
    },
    toMyBookShelf: function() {
      this.$router.push({
        name: "myBookshelf"
      });
    },
    exit: function() {
      console.log("退出登录~");
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
        color: #999;
      }

      .user {
        margin-right: 20px;
        // font-size: 14px;
        color: 12px;
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
        color: #999;
      }

      .right {
        margin-right: 20px;
        // font-size: 14px;
        color: #999;
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


