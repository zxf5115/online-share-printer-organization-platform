<template>
  	<u-popup :show="show" @close="closeAction" mode="top" :safeAreaInsetBottom="false" class="date-view">
      <!-- 年组件 -->
      <div class="year fl fd-r jc-sb ai-ctr" :style="{
        'margin-top': navHeight+'px',
      }">
        <!-- 箭头 -->
        <div style="width:100rpx;height: 146rpx;" class="fl jc-ctr ai-ctr" @click="yearLeft">
          <u-icon name="arrow-left" size="32rpx" :color="canYearLeft ? '#25A1F9' : '#e2e2e2'"/>
        </div>
        <label>{{format === 'timestamp' ? dateManager.format(nowDate, 'yyyy年M月d日') : dateValue}}</label>
        <!-- 箭头 -->
        <div style="width:100rpx;height: 146rpx;" class="fl jc-ctr ai-ctr" @click="yearRight">
          <u-icon name="arrow-right" size="32rpx" :color="canYearRight ? '#25A1F9' : '#e2e2e2'"/>
        </div>
      </div>
      <!-- 月组件 -->
      <div class="month fl-wp fd-r" v-if="type == 'datemonth' || type == 'dateday'">
        <!-- 月单元 -->
        <p v-for="(item, i) in monthList" :key="item + 'm'" @click="selectMonth(i)"><span :class="{
          'in-center': 1,
          'is-active': i == monthIndex,
        }">{{item}}月</span></p>
      </div>
       <!-- 日组件 -->
      <div class="month fl-wp fd-r" v-if="type == 'dateday'">
        <!-- 月单元 -->
        <p v-for="(item, i) in dayList" :key="item + 'd'" @click="selectDay(i)"><span :class="{
          'in-center': 1,
          'is-active': i == dayIndex,
        }">{{item}}</span></p>
      </div>
      <!-- 确认取消按钮 -->
      <div class="btns fl fd-r jc-sb ">
        <button @click="cancel">取消</button>
        <button @click="confirm">确认</button>
      </div>
		</u-popup>
</template>

<script>
import {dateManager} from '../../../util/date/DateManager'
/**
 * 确认按钮回调 
 * confirm 参数 { e: this, value: 选中时间回调 }
 * 取消按钮回调
 * cancel  参数 { e: this }
 */
export default {
  name: "r-date-view",
  props: {
    /**
     * timestamp 或 yyyy-MM-dd 格式
     */
    format: { // datemonth
      type: String,
      default: 'timestamp',
    },
    /**
     * dateyear : 年
     * datemonth: 年月
     * dateday  : 年月日
     */
    type: {
      type: String,
      default: 'datemonth',
    },
    show: {
      type: Boolean,
      default: false,
    },
    maxTimestamp: {
      default: new Date().getTime(),
    },
    minTimestamp: {
      default: 0,
    },
    value: {
      type: String|Number,
      default: 0,
    },
  },
  data() {
    return {
      dayList: [],
      monthList: [],
      yearList: [],
      dayIndex: 0,
      monthIndex: 0,
      yearIndex: 0,
      navHeight: 0,
      dateValue: void 0,
    };
  },
  watch: {
    nowDate() {
      this.setArrayList();
    },
    show() {
      if (this.show) {
        this.$nextTick(e => {
          this.dateValue = this.value;
          this.setArrayList();
        })
      }
    },
  },
  created() {
    this.navHeight = getApp().globalData.navHeight;
    this.dateValue = this.value;
  },
  computed: {
    dateManager: () => dateManager,
    dateFormat() {
      if (this.format) return this.format;
      if (this.type === 'dateyear') {
        return 'yyyy';
      } else if (this.type === 'datemonth') {
        return 'yyyy/M';
      } else {
        return 'yyyy/M/d';
      }
    },
    maxMonth() {
      let minYear  = parseInt(dateManager.format(new Date(this.minTimestamp), 'yyyy'));
      let maxYear  = parseInt(dateManager.format(new Date(this.maxTimestamp), 'yyyy'));
      let nowYear  = parseInt(dateManager.format(this.nowDate, 'yyyy'));
      let maxMonth = parseInt(dateManager.format(new Date(this.maxTimestamp), 'M'));
      if (nowYear < maxYear && nowYear > minYear) { // 中间值 取全月
        return 12;
      } else if (nowYear >= maxYear) { // 需要取小月
        return maxMonth
      } else {
        return 12;
      }
    },
    minMonth() {
      let minYear = parseInt(dateManager.format(new Date(this.minTimestamp), 'yyyy'));
      let maxYear = parseInt(dateManager.format(new Date(this.maxTimestamp), 'yyyy'));
      let nowYear = parseInt(dateManager.format(this.nowDate, 'yyyy'));
      let minMonth = parseInt(dateManager.format(new Date(this.minTimestamp), 'M'));
      if (nowYear < maxYear && nowYear > minYear) { // 中间值 取全月
        return 1;
      } else if (nowYear <= minYear) { // 需要取小月
        return minMonth;
      } else {
        return 1;
      }
    },
    maxDay() {
      // getRoundNumber
      // 最大日值
      let maxDate = new Date(this.maxTimestamp);
      // 当前大日值 这里月份不需要减一  设置日0 自动为上一月的最后一天
      let nowDate = new Date(this.nowy, this.nowM, 0);
      if (nowDate.getTime() > maxDate.getTime()) {
        return parseInt(dateManager.format(maxDate, 'd'));
      } else {
        return parseInt(dateManager.format(nowDate, 'd'));
      }
    },
    minDay() {
      // 最小日值
      let minDate = new Date(this.minTimestamp);
      // 当前最小日值 
      let nowDate = new Date(this.nowy, this.nowM - 1, 1);
      if (nowDate.getTime() <= minDate.getTime()) {
        return parseInt(dateManager.format(minDate, 'd'));
      } else {
        return parseInt(dateManager.format(nowDate, 'd'));
      }
    },
    nowd() {
      return dateManager.format(this.nowDate, 'd');
    },
    nowy() {
      return dateManager.format(this.nowDate, 'yyyy');
    },
    nowM() {
      return dateManager.format(this.nowDate, 'M');
    },
    nowDate() {
      if (!this.dateValue) return new Date(0);
      if (this.format === 'timestamp') {
        return new Date(this.dateValue);
      }
      // 这里需要一个反编译时间戳
      return dateManager.getDateWidthFormat(this.dateValue, this.dateFormat);
    },
    canYearLeft() {
      return this.yearIndex > 0;
    },
    canYearRight() {
      return this.yearIndex < this.yearList.length - 1;
    },
  },
  methods: {
    setArrayList() {
      // 年数组
      this.yearList = dateManager.getDateArray({
        starDate: dateManager.format(new Date(this.minTimestamp), 'yyyy-MM-dd'),
        endDate: dateManager.format(new Date(this.maxTimestamp), 'yyyy-MM-dd'),
        stepType: 'y',
        format: 'yyyy',
        step: 1,
      });
      // 月数组
      this.monthList = this.getArrayWithMinMax(this.minMonth, this.maxMonth);
      // 日数组
      this.dayList = this.getArrayWithMinMax(this.minDay, this.maxDay);
      // 根据当前时间设置数组选择下标
      if (this.yearList.indexOf(this.nowy) < 0) {
        if (this.nowy < this.yearList[0]) this.setDate({year: this.yearList[0]})
        else this.setDate({year: this.yearList[this.yearList.length - 1]})
        this.yearIndex = 0;
      }
      this.yearIndex = this.yearList.indexOf(this.nowy) > -1 ? this.yearList.indexOf(this.nowy) : 0;
      if (this.monthList.indexOf(this.nowM) < 0) {
        if (this.nowM < this.monthList[0]) this.setDate({month: this.monthList[0]})
        else this.setDate({month: this.monthList[this.monthList.length - 1]})
        this.monthIndex = 0;
      }
      this.monthIndex = this.monthList.indexOf(this.nowM);
      if (this.dayList.indexOf(this.nowd) < 0) {
        if (this.nowd < this.dayList[0]) this.setDate({day: this.dayList[0]})
        else this.setDate({day: this.dayList[this.dayList.length - 1]})
        this.dayIndex = 0;
      }
      this.dayIndex = this.dayList.indexOf(this.nowd);
    },
    getArrayWithMinMax(min, max) {
      let array = [];
      for (let index = min; index <= max; index++) {
        array.push(index+'');
      }
      return array;
    },
    cancel() {
      this.closeAction();
      this.$emit('cancel', {});
    },
    confirm() {
      this.closeAction();
      this.callbackValue();
      this.$emit('confirm', this.getValue());
    },
    yearLeft() {
      if (!this.canYearLeft) return;
      this.setDate({year: this.yearList[this.yearIndex-1]});
    },
    yearRight() {
      if (!this.canYearRight) return;
      this.setDate({year: this.yearList[this.yearIndex+1]});
    },
    selectMonth(i) {
      this.setDate({month: this.monthList[i]});
    },
    selectDay(i) {
      this.setDate({day: this.dayList[i]});
    },
    closeAction() {
      this.$emit('update:show', false);
    },
    getCorrectDate({year = parseInt(year), month = parseInt(month), day = parseInt(day)}) { // 日期存在2-31的可能性 所以这里做一层校验
      let nowDate = new Date(year, month - 1, day);
      let minDate = new Date(year, month - 1, 1);;
      let maxDate = new Date(year, month, 0);
      if (nowDate.getTime() > maxDate.getTime()) {
        return {year, month, day: parseInt(dateManager.format(maxDate, 'd'))};
      } else if (nowDate.getTime() < minDate.getTime()) {
        return {year, month, day: parseInt(dateManager.format(minDate, 'd'))};
      } else {
        return {year, month, day};
      }
    },
    setDate({year = this.nowy, month = this.nowM, day = this.nowd}) {
      if (day > this.maxDay) day = this.maxDay;
      day = this.getCorrectDate({year, month, day}).day;
      if (this.nowDate.getTime() === (new Date(year, month - 1, day)).getTime()) return;
      if (this.format === 'timestamp') {
         this.dateValue = this.nowDate.getTime();
      } else {
         this.dateValue = dateManager.format(`${year}/${month}/${day}`, this.format);
      }
    },
    getValue() {
      let value;
      if (this.format === 'timestamp') {
         value = this.nowDate.getTime();
      } else {
         value = dateManager.format(this.nowDate, this.format);
      }
      return value;
    },
    callbackValue() {
      let value = this.getValue();
      // this.$emit('update:value', value);
    }
  },
};
</script>
<style>
::v-deep .u-popup__content {
  background-color: transparent  ;
}
</style>
<style lang="scss" scoped>
.date-view {
  div {
    background-color: white;
  }
}
.year {
  height: 146rpx;
  padding: 0 40rpx;
  border-top: 1rpx solid #f0f0f0;
  label {
    color: #454564;
    font-size: 36rpx;
  }
}
.month {
  padding:  25rpx 10rpx;
  
  border-top: 1rpx solid #f0f0f0;
  p {
    position: relative;
    font-size: 28rpx;
    color: black;
    width: calc(100% / 7);
    height: 68rpx;
    margin: 10rpx 0;
    span {
      width: 68rpx;
      height: 68rpx;
      line-height: 68rpx;
      text-align: center;
      border-radius: 50%;
    }
    .is-active {
      background-color: #25A1F9;
      color: #fff;
    }
  }
}
.btns {
  border-top: 1rpx solid #f0f0f0;
  padding: 0;
  button {
    width: 50%;
    padding: 20rpx 0;
    &:nth-child(1) {
      color: #f56c6c;
    }
    &:nth-child(2) {
      border-left: 1rpx solid #f0f0f0;
      color: #4282F8;
    }
  }
}
</style>