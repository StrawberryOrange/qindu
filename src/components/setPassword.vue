<template>
  <div id="reg_login">
    <div class="content">
      <i class="icon iconfont iconguanbi" @click="offSetPassword(-1)"></i>
      <div class="select-button">修改密码</div>
      <div class="input-wrapper register-wrapper">
        <!-- <div class="register-title"></div> -->
        <input type="password" placeholder="请输入新密码" class="id" v-model="p1">
        <input type="password" placeholder="确认密码" class="password" v-model="p2">
        <div class="submit-wrapper" v-bind:class="{'activated':activated}" @click="set">
          <div>确认修改</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data: function() {
    return {
      p1: "",
      p2: ""
    };
  },
  computed: {
    activated: function() {
      return this.checkInput(this.p1.trim()) && this.checkInput(this.p2.trim());
    }
  },
  methods: {
    set: function() {
      var self = this;
      if (this.activated && self.p1 === self.p2) {
        self.GLOBAL.loadingShow();
        // console.log(self.GLOBAL.PATH);
        this.GLOBAL.myaxios({
          method: "POST",
          url: self.GLOBAL.PATH + "updatepassword",
          data: {
            id: self.id,
            password: self.p1
          },
          success: function(res) {
            if (res.code == "0") {
              var data = res.data;
              // self.offreg_login(data.id);
              self.GLOBAL.loadingHide();
              self.GLOBAL.toast({
                type: "correct",
                message: "修改成功",
                time: 3000
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
      }
      if (!this.activated) {
        self.GLOBAL.toast({
          type: "error",
          message: "密码长度需要大于6,且只能为字母和数字"
        });
      }
      if (self.p1 != self.p2) {
        self.GLOBAL.toast({
          type: "error",
          message: "密码长度需要大于6,且只能为字母和数字"
        });
      }
    },
    // chooseregister: function() {
    //   this.tag = 0;
    // },
    // chooselogin: function() {
    //   this.tag = 1;
    // },
    offSetPassword: function(name) {
      this.$emit("offSetPassword");
    },
    checkInput: function(id) {
      var str = id;
      if (str.length < 6) return false;
      for (let i = 0; i < str.length; i++) {
        // console.log(str.substr(i, 1));
        if (
          !(
            (str.substr(i, 1) >= "a" && str.substr(i, 1) <= "z") ||
            (str.substr(i, 1) >= 0 && str.substr(i, 1) <= 9)
          )
        )
          return false;
      }
      return true;
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
      margin-top: 10px;
      height: 200px;
      display: flex;
      flex-direction: column;
      input {
        border-bottom: solid 1px #ddd;
        margin: 16px 10px;
        height: 22px;
        outline: none;
        &::-webkit-input-placeholder {
          color: #ddd;
          font-size: 14px;
        }
      }

      .submit-wrapper {
        margin: 25px 20px;
        width: 226px;
        height: 40px;
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
        background: rgb(22, 194, 194);
      }
    }
  }
}
</style>
