<template>
  <div id="user">
    <div class="header">
      <div class="user-name">
        <span class="name">用户昵称</span>
        <span class="user">{{username}}</span>
      </div>
    </div>

    <div class="sitting">
      <div class="sitting-content">
        <span class="name">书籍商店</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
      <div class="sitting-content">
        <span class="name">我的书架</span>
        <span class="right">
          <i class="icon iconfont iconright1"></i>
        </span>
      </div>
      <div class="sitting-content">
        <span class="name">进度管理</span>
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: "煜淞"
    };
  },
  methods: {
    exit: function() {
      console.log("退出登录~");
    }
  }
};
</script>
<style lang="scss">
#user {
  position: absolute;
  top: 0;
  width: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  z-index: 20;

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


