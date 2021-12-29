<template>
  <div id="NAV_BODY" :class="{'nav-line': line}">
    <u-navbar :title="title" fixed placeholder safeAreaInsetTop>
      <div slot="left">
        <u-icon
          v-if="leftBtnFlag"
          name="arrow-left"
          color="#000000"
          size="36rpx"
          @click="leftAction"
        />
        <u-icon
          v-else-if="notBlackList"
          name="home"
          color="#000000"
          size="36rpx"
          @click="leftAction"
        />
      </div>
    </u-navbar>
  </div>
</template>

<script>
export default {
  name: "p-nav",
  props: {
    title: { type: String, default: "首页" },
    fixed: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: true },
    safeAreaInsetTop: { type: Boolean, default: true },
    leftClick: { type: Function, required: false },
    line: { type:String|Boolean, default: true }
  },
  data() {
    return {
      leftBtnFlag: true,
      blackList: [
        'pages/home/index',
        'pages/mine/index',
        'pages/printRevenue/index',
      ]
    };
  },
  created() {
    this.leftBtnFlag = getCurrentPages().length > 1;
    // 返回组件信息 有些需要计算高度的地方等需要使用
    this.$nextTick((e) => {
      const query = uni.createSelectorQuery().in(this);
      query.select("#NAV_BODY").boundingClientRect((data) => {
        console.log(data);
        this.$emit("callback", data);
      }).exec();
    });
  },
  computed: {
    notBlackList() {
      let path = getCurrentPages()[getCurrentPages().length - 1].route;
      console.log(this.blackList.indexOf(path), path);
      if (this.blackList.indexOf(path) >= 0) {
        return false;
      }
      return true;
    }
  },
  methods: {
    leftAction() {
      if (this.leftBtnFlag)
        this.leftClick ? this.leftClick() : uni.navigateBack();
      else if (this.notBlackList)
        uni.switchTab({url: '/pages/home/index'})  
    },
  },
};
</script>