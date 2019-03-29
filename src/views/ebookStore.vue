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
    <div class="book-wrapper">
      <!-- 123123123 -->
      <div class="book" v-for="(item,index) in list" :key="index">
        <img v-bind:src="item.img">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted: function() {
    console.log(this.GLOBAL);
  },
  data: function() {
    return {
      list: this.GLOBAL.booklist
    };
  },
  methods: {
    back: function() {
      console.log("back");
      this.$router.go(-1);
    }
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
  background-color: #f8f8f8;
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
  .book-wrapper {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    .book {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
      }
    }
  }
}
</style>
