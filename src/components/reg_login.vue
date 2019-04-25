<template>
  <div id="reg_login">
    <div class="content">
      <i class="icon iconfont iconguanbi" @click="offreg_login"></i>
      <div class="select-button">
        <div
          class="select login-button"
          v-bind:class="{'selectenable':tag==1}"
          @click="chooselogin"
        >登录</div>
        <div
          class="select register-button"
          v-bind:class="{'selectenable':tag==0}"
          @click="chooseregister"
        >注册</div>
      </div>
      <!-- 注册 -->
      <div class="input-wrapper register-wrapper" v-if="tag==0">
        <!-- <div class="register-title"></div> -->
        <input type="text" placeholder="登陆账户名" class="id" v-model="reg_id">
        <input type="text" placeholder="昵称" class="name" v-model="reg_name">
        <input type="password" placeholder="密码" class="password" v-model="reg_pw">
        <div class="submit-wrapper" v-bind:class="{'activated':reg_activated}" @click="register">
          <div>注册</div>
        </div>
      </div>
      <div class="input-wrapper login-wrapper" v-if="tag==1">
        <input type="text" placeholder="账户名" class="id" v-model="log_id">
        <input type="password" placeholder="密码" class="name" v-model="log_pw">
        <!-- <input type="password" class="password"> -->
        <div class="submit-wrapper" v-bind:class="{'activated':log_activated}" @click="login">
          <div>登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      tag: 1,
      reg_id: "",
      reg_name: "",
      reg_pw: "",
      log_id: "",
      log_pw: ""
    };
  },
  computed: {
    reg_activated: function() {
      // return this.reg_id.trim() && this.reg_name.trim() && this.reg_pw.trim();
      return true
    },
    log_activated: function() {
      // return this.log_id.trim() && this.log_pw.trim();
      return true
    }
  },
  methods: {
    login: function() {
      if (this.log_activated) {
        console.log("keyidenlu");
        this.GLOBAL.islogin = true;
        console.log(this.GLOBAL.islogin)
      }
    },
    register: function() {
      if (this.reg_activated) {
        console.log("keyizhuce");
      }
    },
    chooseregister: function() {
      this.tag = 0;
    },
    chooselogin: function() {
      this.tag = 1;
    },
    offreg_login: function() {
      this.$emit("offreg_login");
    }
  }
};
</script>
<style lang="scss">
#reg_login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(55, 55, 55, 0.3);
  .content {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 320px;
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    i {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 12px;
    }
    .select-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 200px;
      .select {
        padding: 8px;
        color: rgb(195, 195, 195);
      }
      .selectenable {
        color: rgb(91, 91, 91);
      }
    }
    .input-wrapper {
      // flex-grow: 1;
      margin-top: 50px;
      height: 200px;
      display: flex;
      flex-direction: column;
      input {
        border-bottom: solid 1px #ddd;
        margin: 10px;
        height: 22px;
        outline: none;
        &::-webkit-input-placeholder {
          color: #ddd;
          font-size: 14px;
        }
      }

      .submit-wrapper {
        width: 266px;
        height: 60px;
        background-color: rgb(183, 187, 191);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        div {
          color: #fff;
        }
      }
      .activated {
        background: rgb(22,194,194);
      }
    }
  }
}
</style>
