<template>
  <div style="border-bottom: 1px solid #f0f0f0;">
    <u-navbar
        :title="title"
        fixed
        placeholder
        safeAreaInsetTop
    >
        <div slot="left">
          <u-icon  v-if="leftBtnFlag" name="arrow-left" color="#000000" size="18" @click="leftAction"></u-icon>
        </div>
    </u-navbar>
  </div>
</template>

<script>
export default {
  name: 'p-nav',
  props: {
      title: {type: String, default: '首页'},
      fixed: {type: Boolean, default: true},
      placeholder: {type: Boolean, default: true},
      safeAreaInsetTop: {type: Boolean, default: true},
      leftClick: { type: Function, required: false },
  },
  data() {
    // TODO: 这里需要设置个白名单， 防止后续有分享需求情况， 暂时先不做 这部分后续再做  目前没需求。
    return {
      leftBtnFlag: true,
    }
  },
  created() {
    // const pages = getCurrentPages();
    this.leftBtnFlag = getCurrentPages().length > 1;
  },
  methods: {
    leftAction() {
      this.leftClick ? this.leftClick() : uni.navigateBack();
    }
  },
}
</script>