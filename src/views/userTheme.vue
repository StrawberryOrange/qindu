<template>
  <div id="userTheme">
    <div class="title">
      <div class="icon-wrapper">
        <i class="icon iconfont iconleft" @click="back"></i>
      </div>
      <div class="title-wrapper">
        <div>自定义主题</div>
      </div>
    </div>
    <!-- <div class="preview" v-bind:style="{'color':item.color}"></div> -->
    <div class="colorInput"></div>
    <div class="save"></div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      test: "test"
    };
  },
  methods: {
    back: function() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss">
#userTheme {
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
  }
  .preview {
  }
  .colorInput {
  }
  .save {
  }
}
</style>
