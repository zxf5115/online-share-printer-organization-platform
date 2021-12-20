<template>
  <div class="calendarCom fl fd-r ai-ctr jc-ctr">
    <div @click="showCalender('startT')" class="calenderLeft fl fd-r ai-ctr">
      <image src="../../../../../../static/icon/date.png">{{startTime}}
    </div>
    <p>-</p>
    <div  @click="showCalender('endT')" class="calenderLeft fl fd-r ai-ctr">
      <image src="../../../../../../static/icon/date.png">{{endTime}}
    </div>
    <u-datetime-picker
      :show="showStartTime"
      v-model="startTime"
      :maxDate="startTimestamp"
      mode="date"
      @confirm="confirmStartTime"
    ></u-datetime-picker>
    <u-datetime-picker
      :show="showEndTime"
      v-model="endTime"
      :maxDate="endTimestamp"
      mode="date"
      @confirm="confirmEndTime"
    ></u-datetime-picker>
  </div>
</template>
<script>

export default {
  data() {
    return {
      showStartTime: false, // 开始日期弹出框显示隐藏
      showEndTime: false, // 结束日期弹出框显示隐藏
      startTime: Number(new Date()), // 绑定的选中值
      endTime: Number(new Date()), // 绑定的选中值
      startTimestamp: Number(new Date()), // 日历组件默认最大展示值(截止日期)
      endTimestamp: Number(new Date()), // 日历组件默认最大展示值(截止日期)
    }
  },
  mounted() {
    this.startTime = uni.$u.timeFormat(new Date(), 'yyyy年-mm月-dd日')
    this.endTime = uni.$u.timeFormat(new Date(), 'yyyy年-mm月-dd日')
    // 传入开始、结束日期请求接口
  },
  methods: {
    showCalender(v) {
      v === 'startT' ? this.showStartTime = true : this.showEndTime = true
    },
    confirmStartTime(e) {
      this.showStartTime = false
      this.startTime = uni.$u.timeFormat(e.value, 'yyyy年-mm月-dd日')
      console.log(this.startTime, this.endTime)
    },
    confirmEndTime(e) {
      this.showEndTime = false
      this.endTime = uni.$u.timeFormat(e.value, 'yyyy年-mm月-dd日')
      console.log(this.startTime, this.endTime)
    }
  }
}
</script>
<style lang="scss" scoped>
.calendarCom {
  p {
      box-shadow: 4px 4rpx 8rpx rgba(0, 0, 0, 0.1);
      height: 2rpx;
      line-height: 2rpx;
      margin: 0 10rpx;
      font-size: 40rpx;
      font-weight: bold;
  }
  .calenderLeft {
    width: 254rpx;
    padding: 0 32rpx;
    height: 62rpx;
    border-radius: 31rpx;
    background: #F1F3FF;
    border: 1rpx solid #BBBBDE;
    color: #454564;
    font-size: 24rpx;
    image {
      width: 38rpx;
      height: 38rpx;
      margin-right: 10rpx;
    }
  }
}
</style>