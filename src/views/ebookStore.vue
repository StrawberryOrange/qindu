<template>
  <div id="ebookStore">
    <div class="title">
      <div class="icon-wrapper">
        <i class="icon iconfont iconleft" @click="back"></i>
      </div>
      <div class="title-wrapper">
        <div>书籍商店</div>
      </div>
    </div>
    <cube-scroll
      class="scroll-wrapper"
      :data="list"
      :style="{'height': (windowHeight - 50) + 'px'}"
    >
      <div class="book-wrapper">
        <div class="book" v-for="(item,index) in list" :key="index" @click="addBook(item)">
          <img v-bind:src="item.bookimg">
          <div>{{item.bookname}}</div>
        </div>
      </div>
      <div class="tips">这里是书籍商店，点击添加一本至我的书架吧</div>
    </cube-scroll>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      id: "",
      list: [],
      windowHeight: window.innerHeight
    };
  },
  methods: {
    back: function() {
      console.log("back");
      this.$router.go(-1);
    },
    addBook: function(item) {
      var self = this;
      if (this.id == "") {
        self.GLOBAL.toast({
          type: "error",
          message: "请先登录！"
        });
        return;
      }
      console.log("添加的书籍序号" + item.bookid);
      // this.GLOBAL.setUserBookList("add", index);
      // console.log(this.GLOBAL.getUserBookList());
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
        self.GLOBAL.loadingHide();
        console.log(res);
        if (res.code == 0) {
          self.list = res.data;
        }
      }
    });
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
  z-index: 31;
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
        border-radius: 3px;
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
    .tips {
      color: #ccc;
      margin: 20px auto 80px auto;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
