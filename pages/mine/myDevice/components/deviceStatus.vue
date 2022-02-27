<template>
  <div :class="[`status-${status}`, 'fl', 'jc-sb', 'fd-r', 'ai-ctr', 'device-label',]">
    <!-- <p :class="`status-${status}`"> -->
      <i class="point" /> <label style="width: 84rpx;">{{statusLabel[status]}}</label>
    <!-- </p> -->
  </div>
</template>

<script>

export default {
  props: ['status'],
  data() {
    return {
      statusLabel: {
        1: '正常',
        2: '离线',
        3: '异常',
        4: '未分配',
        5: '待确认',
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
.status-1 {
  label { color: #07C160; }
  .point { background-color: #07C160; }
}
.status-2 {
  label { color: #717E96; }
  .point { background-color: #717E96; }
}
.status-3 {
  label { color: #FF0000; }
  .point { background-color: #FF0000; }
}
.status-4 {
  label { color: #979797; }
  .point { background-color: #979797; }
}
.status-5 {
  label { color: #E8830E; }
  .point { background-color: #E8830E; }
}

</style>
