<template>
  	<u-popup :show="show" @close="closeAction" mode="top" :safeAreaInsetBottom="false">
      <!-- 年组件 -->
      <div class="year fl fd-r jc-sb ai-ctr" :style="{
        'margin-top': top,
      }">
      
        <!-- 箭头 -->
        <div style="width:100rpx;height: 146rpx;" class="fl jc-ctr ai-ctr" @click="yearLeft">
          <u-icon name="arrow-left" size="32rpx" :color="canYearLeft ? '#25A1F9' : '#e2e2e2'"/>
        </div>
        <label>{{format === 'timestamp' ? dateManager.format(nowDate, 'yyyy年M月d日') : value}}</label>
        <!-- 箭头 -->
        <div style="width:100rpx;height: 146rpx;" class="fl jc-ctr ai-ctr" @click="yearRight">
          <u-icon name="arrow-right" size="32rpx" :color="canYearRight ? '#25A1F9' : '#e2e2e2'"/>
        </div>
      </div>
      <!-- 月组件 -->
      <div class="month fl-wp fd-r" v-if="type == 'datemonth' || type == 'dateday'">
        <!-- 月单元 -->
        <p v-for="(item, i) in monthList" :key="item+'i'" @click="selectMonth(i)"><span :class="{
          'in-center': 1,
          'is-active': i == monthIndex,
        }">{{item}}月</span></p>
      </div>
       <!-- 日组件 -->
      <div class="month fl-wp fd-r" v-if="type == 'dateday'">
        <!-- 月单元 -->
        <p v-for="(item, i) in dayList" :key="item+i" @click="selectDay(i)"><span :class="{
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
    top: {
      type: String,
      default: '20px',
    },
    show: {
      type: Boolean,
      default: false,
    },
    maxTimestamp: {
      default: new Date().getTime(),
    },
    minTimestamp: {
      default: 1426975229000,
    },
    value: {
      type: String|Number,
      default: 0,
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    dateManager: () => dateManager,
    yearIndex() {
      if (this.yearList.indexOf(this.nowy) < 0) {
        if (this.nowy < this.yearList[0]) this.setDate({year: this.yearList[0]})
        else this.setDate({year: this.yearList[this.yearList.length - 1]})
        return 0;
      }
      return this.yearList.indexOf(this.nowy) > -1 ? this.yearList.indexOf(this.nowy) : 0;
    },
    monthIndex() {
      if (this.monthList.indexOf(this.nowM) < 0) {
        if (this.nowM < this.monthList[0]) this.setDate({month: this.monthList[0]})
        else this.setDate({month: this.monthList[this.monthList.length - 1]})
        return 0;
      }
      return this.monthList.indexOf(this.nowM);
    },
    dayIndex() {
      if (this.dayList.indexOf(this.nowd) < 0) {
        console.log(this.nowd < this.dayList);
        if (this.nowd < this.dayList[0]) this.setDate({day: this.dayList[0]})
        else this.setDate({day: this.dayList[this.dayList.length - 1]})
        return 0;
      }
      return this.dayList.indexOf(this.nowd);
    },
    dateFormat() {
      if (this.format) return this.format;
      if (this.type === 'dateyear') {
        return 'yyyy';
      } else if (this.type === 'datemonth') {
        return 'yyyy-M';
      } else {
        return 'yyyy-M-d';
      }
    },
    maxYear() {
      if (this.format === 'timestamp') {
        return this.maxTimestamp;
      }
      return ;
    },
    yearList() {
      console.log(dateManager.getDateArray({
        starDate: dateManager.format(new Date(this.minTimestamp), 'yyyy-MM-dd'),
        endDate: dateManager.format(new Date(this.maxTimestamp), 'yyyy-MM-dd'),
        stepType: 'y',
        format: 'yyyy',
        step: 1,
      }));
      return dateManager.getDateArray({
        starDate: dateManager.format(new Date(this.minTimestamp), 'yyyy-MM-dd'),
        endDate: dateManager.format(new Date(this.maxTimestamp), 'yyyy-MM-dd'),
        stepType: 'y',
        format: 'yyyy',
        step: 1,
      });
    },
    monthList() {
      let params = {
        starDate: dateManager.format(new Date(`${this.nowy}-${this.minMonth}-1`), `${this.nowy}-MM-dd`),
        endDate: dateManager.format(new Date(`${this.nowy}-${this.maxMonth}-1`), `${this.nowy}-MM-dd`),
        stepType: 'M',
        format: 'M',
        step: 1,
      };
      console.log(params, this.maxMonth);
      let arr = dateManager.getDateArray(params);
      console.log(arr)
      return arr;
    },
    dayList() {
      return dateManager.getDateArray({
        starDate: dateManager.format(new Date(`${this.nowy}-${this.nowM}-${this.minDay}`), `${this.nowy}-${this.nowM}-dd`),
        endDate: dateManager.format(new Date(`${this.nowy}-${this.nowM}-${this.maxDay}`), `${this.nowy}-${this.nowM}-dd`),
        stepType: 'd',
        format: 'd',
        step: 1,
      });
    },
    maxMonth() {
      let minYear = parseInt(dateManager.format(new Date(this.minTimestamp), 'yyyy'));
      let maxYear = parseInt(dateManager.format(new Date(this.maxTimestamp), 'yyyy'));
      let nowYear = parseInt(this.yearList[this.yearIndex]);
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
      let nowYear = parseInt(this.yearList[this.yearIndex]);
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
      console.log(this.nowy, this.nowM, dateManager.format(nowDate, 'yyyy-MM-dd'))
      console.log(maxDate.getTime(), nowDate.getTime());
      if (nowDate.getTime() > maxDate.getTime()) {
        console.log('设置最大day');
        return parseInt(dateManager.format(maxDate, 'd'));
      } else {
        console.log('走默认最大day')
        return parseInt(dateManager.format(nowDate, 'd'));
      }
    },
    minDay() {
      // 最小日值
      let minDate = new Date(this.minTimestamp);
      // 当前最小日值 
      let nowDate = new Date(this.nowy, this.nowM - 1, 1);
      console.log(this.nowy, this.nowM, dateManager.format(nowDate, 'yyyy-MM-dd'))
      console.log(minDate.getTime(), nowDate.getTime());
      if (nowDate.getTime() <= minDate.getTime()) {
        console.log('来取设置的最小day', parseInt(dateManager.format(minDate, 'd')));
        return parseInt(dateManager.format(minDate, 'd'));
      } else {
        console.log('走默认最小day');
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
      if (this.format === 'timestamp') {
        return new Date(this.value);
      }
      // 这里需要一个反编译时间戳
      return dateManager.getDateWidthFormat(this.value, this.dateFormat);
    },
    canYearLeft() {
      return this.yearIndex > 0;
    },
    canYearRight() {
      return this.yearIndex < this.yearList.length - 1;
    },
  },
  methods: {
    cancel() {
      this.closeAction()
    },
    confirm() {
      this.$emit('changed', 111);
      this.closeAction()
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
      console.log(this.monthList, i);
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
      console.log(nowDate.getTime(), minDate.getTime(), maxDate.getTime())
      console.log(nowDate.getTime() > maxDate.getTime());
      if (nowDate.getTime() > maxDate.getTime()) {
        return {year, month, day: parseInt(dateManager.format(maxDate, 'd'))};
      } else if (nowDate.getTime() < minDate.getTime()) {
        return {year, month, day: parseInt(dateManager.format(minDate, 'd'))};
      } else {
        return {year, month, day};
      }
    },
    setDate({year = this.nowy, month = this.nowM, day = this.nowd}) {
      console.log('setDate', `${year}-${month}-${day}`);
      // day = this.getCorrectDate({year, month, day}).day;
      // console.log(this.getCorrectDate({year, month, day}).day);
      if (day > this.maxDay) day = this.maxDay;
      console.log(day, month);
      day = this.getCorrectDate({year, month, day}).day;
      if (this.format === 'timestamp') {
        this.$emit('update:value', new Date(`${year}-${month}-${day}`).getTime());
      } else {
        console.log(dateManager.format(this.nowDate, this.format));
        this.$emit('update:value', dateManager.format(new Date(`${year}-${month}-${day}`), this.format));
      }
    }
  },
};
</script>
<style>
::v-deep .u-popup__content {
  background-color: transparent !important;
}
</style>
<style lang="scss" scoped>
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