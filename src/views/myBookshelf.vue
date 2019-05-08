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
          v-for="(item,index) in list"
          :key="index"
          @touchstart="mytouchstart(index)"
          @touchmove="mytouchmove(index)"
          @touchend="mytouchend(index)"
        >
          <img v-bind:src="item.img">
          <div>{{item.name}}</div>
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
      id: "",
      list: this.GLOBAL.getUserBookList(),
      windowHeight: window.innerHeight
    };
  },
  computed: {
    haveData: function() {
      return this.list.length == 0 ? true : false;
    }
  },
  methods: {
    back: function() {
      console.log("back");
      this.$router.go(-1);
    },
    deleteBook: function(index) {
      // console.log("添加的书籍序号" + index);
      this.GLOBAL.setUserBookList("delete", index);
      // console.log(this.GLOBAL.getUserBookList());
    },
    mytouchstart: function(index) {
      timeOutEvent = setTimeout(() => {
        console.log("删除了！");
        this.deleteBook(index);
      }, 500);
      return false;
    },
    mytouchend: function(index) {
      clearTimeout(timeOutEvent);
      // console.log('dianjishijian');
      if (timeOutEvent != 0) {
        console.log("切换至此书");
      }
    },
    mytouchmove: function(index) {
      clearTimeout(timeOutEvent);
      timeOutEvent = 0;
    }
  },
  mounted: function() {
    this.id = this.$route.query.id;
    console.log(this.$route.query.id);
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
