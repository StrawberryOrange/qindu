<template>
  <div id="ebookStore">
    <div class="title">
      <div class="icon-wrapper">
        <i class="icon iconfont iconleft" @click="back"></i>
      </div>
      <div class="title-wrapper">
        <div>我的书架</div>
      </div>
    </div>
    <cube-scroll
      class="scroll-wrapper"
      :data="list"
      :style="{'height': (windowHeight - 50) + 'px'}"
    >
      <div class="book-wrapper">
        <!-- <div
          class="book"
          v-for="(item,index) in list"
          :key="index"
          @click="deleteBook(index)"
        >-->
        <div
          class="book"
          v-for="(item,index) in userBookList"
          :key="index"
          @touchstart="mytouchstart(item)"
          @touchmove="mytouchmove(item)"
          @touchend="mytouchend(item)"
        >
          <img v-bind:src="item.bookimg">
          <div>{{item.bookname}}</div>
        </div>
      </div>
      <div class="icon-wrapper" v-if="haveData">
        <i class="icon iconfont iconwushuju"></i>
      </div>
      <div class="tips">这里是我的书架，你可以点击选择阅读书籍、长按删除书籍，或者从书籍商店添加/上传自己的书籍</div>
    </cube-scroll>
  </div>
</template>
<script>
var timeOutEvent = 0;
export default {
  data: function() {
    return {
      flag: 0,
      id: "",
      userBookIdList: "",
      bookList: [],
      list: this.GLOBAL.getUserBookList(),
      windowHeight: window.innerHeight
    };
  },
  computed: {
    haveData: function() {
      return this.bookList.length == 0 ? true : false;
    },
    userBookList: function() {
      var self = this;
      var filtered = self.bookList.filter(function(item) {
        return self.userBookIdList.indexOf(item.bookid) >= 0;
      });
      return filtered;
    }
  },
  // watch: {
  //   userBookList: function(val) {
  //     console.log(val);
  //   }
  // },
  methods: {
    back: function() {
      console.log("back");
      this.$router.go(-1);
    },
    chooseBookConfirm: function(item) {
      var self = this;
      this.$createDialog({
        type: "confirm",
        content: "正在阅读的书籍将会切换为此书",
        title: "确认？",
        confirmBtn: {
          text: "确定",
          active: true
        },
        cancelBtn: {
          text: "取消",
          active: false
        },
        onConfirm: () => {
          self.chooseBook(item);
          // self.$router.go(-2);
        },
        onCancel: () => {}
      }).show();
    },
    chooseBook: function(item) {
      var self = this;
      // console.log("chooseBook");
      self.GLOBAL.myaxios({
        url: self.GLOBAL.PATH + "updatebookurl",
        method: "POST",
        data: {
          id: self.id,
          bookurl: item.bookurl
        },
        success: function(res) {
          if (res.code == "0") {
            console.log(res);
            self.GLOBAL.loadingHide();
            window.localStorage.setItem("bookurl", item.bookurl);
            self.GLOBAL.toast({
              type: "correct",
              message: "切换成功",
              time: 1000
            });
            this.$emit("chooseBook", item);
          } else {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "error",
              message: "错误：" + res.message,
              time: 1000
            });
          }
        }
      });
    },
    deleteBookConfirm: function(item) {
      var self = this;
      this.$createDialog({
        type: "confirm",
        content: "将从您的书架中删除此书，您也可以在商店中重新添加",
        title: "确认删除？",
        confirmBtn: {
          text: "确定",
          active: true
        },
        cancelBtn: {
          text: "取消",
          active: false
        },
        onConfirm: () => {
          self.deleteBook(item);
        },
        onCancel: () => {}
      }).show();
    },
    deleteBook: function(item) {
      console.log(item);
      var self = this;
      self.GLOBAL.loadingShow();
      self.GLOBAL.myaxios({
        url: self.GLOBAL.PATH + "deletebook",
        method: "POST",
        data: {
          id: self.id,
          bookid: item.bookid
        },
        success: function(res) {
          if (res.code == "0") {
            console.log(res);
            self.bookList.splice(self.bookList.indexOf(item));
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "correct",
              message: "删除成功",
              time: 1000
            });
          } else {
            self.GLOBAL.loadingHide();
            self.GLOBAL.toast({
              type: "error",
              message: "错误：" + res.message,
              time: 1000
            });
          }
        }
      });
      // console.log(this.GLOBAL.getUserBookList());
    },
    getUserBookIdList: function() {
      var self = this;
      // self.GLOBAL.loadingShow();
      self.GLOBAL.myaxios({
        url: self.GLOBAL.PATH + "userbook",
        method: "GET",
        data: {
          id: self.id
        },
        success: function(res) {
          if (self.flag == 1) self.GLOBAL.loadingHide();
          else self.flag++;
          if (res.code == "0") {
            self.userBookIdList = res.data;
          } else {
            self.GLOBAL.toast({
              type: "error",
              message: "错误：" + res.message,
              time: 1000
            });
          }
        }
      });
    },
    mytouchstart: function(item) {
      timeOutEvent = setTimeout(() => {
        this.deleteBookConfirm(item);
      }, 500);
      return false;
    },
    mytouchend: function(item) {
      clearTimeout(timeOutEvent);
      // console.log('dianjishijian');
      if (timeOutEvent != 0) {
        this.chooseBookConfirm(item);
      }
    },
    mytouchmove: function(item) {
      clearTimeout(timeOutEvent);
      timeOutEvent = 0;
    }
  },
  mounted: function() {
    var self = this;
    self.GLOBAL.loadingShow();
    this.id = this.$route.query.id;
    console.log(this.$route.query.id);
    this.GLOBAL.myaxios({
      method: "GET",
      url: self.GLOBAL.PATH + "book",
      success: function(res) {
        if (self.flag == 1) self.GLOBAL.loadingHide();
        else self.flag++;
        // console.log(res);
        if (res.code == 0) {
          self.bookList = res.data;
        }
      }
    });
    this.getUserBookIdList();
  }
};
</script>
<style lang="scss">
#ebookStore {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: #f8f8f8;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 30;
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
  .scroll-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    .book-wrapper {
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      .book {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border: 1px solid #ccc;
        background-color: #f8f8f8;
        box-shadow: 0 0 5px rgba(102, 102, 102, 0.4);
        width: 100px;
        height: 140px;
        //   border: solid 1px #111;
        margin: 10px;
        img {
          width: 60px;
          height: 100px;
        }
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: rgb(51, 51, 51);
        }
      }
    }
    .icon-wrapper {
      text-align: center;
      color: #b4c8e7;
      margin: 200px auto 200px;
      i {
        font-size: 55px;
      }
    }
    .tips {
      color: #ccc;
      margin: 20px 40px 80px 40px;
      text-align: center;
      line-height: 18px;
      font-size: 12px;
    }
  }
}
</style>
