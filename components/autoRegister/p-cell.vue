<template>
  <div class="p-cell fl fd-r jc-sb ai-ctr" :style="{
    'background': bg,
    'padding'   : padding,
  }">
    <label :style="{
      'color': labelColor,
      'font-size': labelSize,
      'width' : labelWidth 
    }" class="p-cell-label">{{label}}</label>
    <div class="p-cell-right" :style="{
      'color': valueColor,
      'font-size': valueSize,
      'flex': 1,
      'margin-left': margin,
      'text-align': textAlign,
      }">
      <slot>{{value}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "p-nav",
  props: {
    label     : { type: String, default: "标签" },
    value     : { type: String, default: '' },
    valueColor: { type: String, default: '#434343' },
    valueSize : { type: String, default: '28rpx' },
    labelColor: { type: String, default: '#000000' },
    labelSize : { type: String, default: '28rpx' },
    labelWidth: { type: String, default: '140rpx'},
    height    : { type: String, default: 'auto'},
    margin    : { type: String, default: '0'},
    bg        : { type: String, default: 'white'},
    padding   : { type: String, default: '10rpx 40rpx'},
    textAlign : { type: String, default: 'left' },
  },
};
</script>
<style lang="scss" scoped>
.p-cell-label {
  width: auto;
}
</style>
