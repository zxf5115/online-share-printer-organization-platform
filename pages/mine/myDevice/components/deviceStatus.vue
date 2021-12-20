<template>
  <div :class="[`status-${status}`, 'fl', 'jc-sb', 'fd-r', 'ai-ctr', 'device-label',]">
    <!-- <p :class="`status-${status}`"> -->
      <i class="point" /> <label>{{statusLabel[status]}}</label>
    <!-- </p> -->
  </div>
</template>

<script>

export default {
  props: ['status'],
  data() {
    return {
      statusLabel: {
        0: '离线',
        1: '异常',
        2: '正常',
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.device-label {
  label {
    margin-left: 10rpx;
  }
}
.point {
  width: 20rpx;
  height: 20rpx;
  border-radius: 10rpx;
}
.status-0 {
  label { color: #717E96; }
  .point { background-color: #717E96; }
}
.status-1 {
  label { color: #FF0000; }
  .point { background-color: #FF0000; }
}
.status-2 {
  label { color: #07C160; }
  .point { background-color: #07C160; }
}
</style>
