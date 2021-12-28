<template>
  <div>
    <div @click="show = !show">
      <div v-if="!$slots.default" class="default fl fd-r jc-sb ai-ctr">
        <image style="height: 38rpx;width: 38rpx;" src="../../../static/icon/date.png">
        <p>{{dateValue}}</p>
        <image style="height: 32rpx;width: 32rpx;" src="../../../static/icon/down.png">
      </div>
      <slot></slot>
    </div>
    <r-date-view :show.sync="show" :value="dateValue" :type="type" :format="format" @confirm="confirm"/>
  </div>
</template>

<script>
import rDateView from '../r-date-view'
import {dateManager} from '../../../util/date/DateManager'
export default {
  name: "date-view",
  components: { rDateView },
  props: {
    value: {
      type: String|Number,
      default: () => '0',
    },
    type: {
      type: String,
      default: 'datemonth',
    },
  },
  watch: {
    type() {
      this.setFormat();
    },
  },
  data() {
    return {
      dateValue: void 0,
      format: 'yyyy年M月',
      show: false,
    };
  },
  created() {
    this.setFormat();
    this.dateValue = dateManager.format(new Date(this.value), this.format);
  },
  methods: {
    confirm(e) {
      this.dateValue = e;
      this.$emit('update:value', dateManager.getDateWidthFormat(this.dateValue, this.format));
    },
    setFormat() {
      if (this.type === 'dateyear') {
        this.format = 'yyyy年';
      } else if (this.type === 'datemonth') {
        this.format = 'yyyy年M月';
      } else if (this.type === 'dateday') {
        this.format = 'yyyy年M月d日';
      } else {
        throw new Error('组件内输入的"type"格式不正确');
      }
      console.log(this.format);
    }
  },
};
</script>

<style lang="scss" scoped>
.default {
  p {
    margin-left: 10rpx;
    margin-right: 20rpx;
    font-size: 24rpx;
    color: #454564;
  }
}
</style>