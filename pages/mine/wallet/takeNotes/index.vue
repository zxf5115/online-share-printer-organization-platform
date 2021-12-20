<template>
  <div class="wr-record">
    <p-nav :title="title"/>
    <div class="calendarCom">
      <calendar />
    </div>
    <div class="recordList bg-w">
      1111
    </div>
  </div>
</template>
<script>
import calendar from "./components/calendar"
export default {
  components: {
    calendar
  },
  data() {
    return {
      title: '提现', // title
    }
  },
  methods: {
    confirm(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.calendarCom {
  height: 104rpx;
  padding: 22rpx 20rpx 20rpx
}
</style>
