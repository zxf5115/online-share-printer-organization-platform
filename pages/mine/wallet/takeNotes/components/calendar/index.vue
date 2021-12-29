<template>
  <div class="calendarCom fl fd-r ai-ctr jc-ctr">
    <div @click="showCalender('startT')" class="calenderLeft fl fd-r ai-ctr">
      <image src="../../../../../../static/icon/date.png">{{startTime}}
    </div>
    <p>-</p>
    <div  @click="showCalender('endT')" class="calenderLeft fl fd-r ai-ctr">
      <image src="../../../../../../static/icon/date.png">{{endTime}}
    </div>
    <r-date-view :show.sync="showDateBox" :maxTimestamp="maxTimestamp" :minTimestamp="minTimestamp" :value="dateValue" type="dateday" :format="format" @confirm="confirm"/>
  </div>
</template>
<script>
import rDateView from '../../../../../../components/ui/r-date-view/index.vue'
import { dateManager } from '../../../../../../util/date/DateManager';
export default {
  components: { rDateView },
  data() {
    return {
      startTime: void 0, // 绑定的选中值
      endTime: void 0, // 绑定的选中值
      startTimestamp: 0, // 日历组件默认最大展示值(截止日期)
      endTimestamp: Number(new Date()), // 日历组件默认最大展示值(截止日期)
      selectType: void 0,
      showDateBox: false,
      format: 'yyyy年MM月dd日',
    }
  },
  watch: {
    startTime () {
      if (this.endTime)
        this.$emit('changed', {startTime: this.startTime + ' 00:00:00', endTime: this.endTime + ' 23:59:59'})
    },
    endTime() {
      if (this.startTime) 
        this.$emit('changed', {startTime: this.startTime + ' 00:00:00', endTime: this.endTime + ' 23:59:59'})
    }
  },
  computed: {
    dateValue() {
      return this.selectType === 'startT' ? this.startTime : this.endTime;
    },
    maxTimestamp() {
      return this.selectType === 'startT' ? dateManager.getDateWidthFormat(this.endTime, this.format).getTime() : this.endTimestamp;
    },
    minTimestamp() {
      return this.selectType === 'startT' ? 0 : dateManager.getDateWidthFormat(this.startTime, this.format).getTime();
    }
  },
  created() {
      this.startTime = dateManager.format(new Date(), this.format); // 绑定的选中值
      this.endTime   = dateManager.format(new Date(), this.format); // 绑定的选中值
  },
  methods: {
    confirm(e) {
      this.selectType === 'startT' ? this.startTime = e : this.endTime = e;
    },
    showCalender(v) {
      this.selectType = v;
      this.showDateBox = true;
    },
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