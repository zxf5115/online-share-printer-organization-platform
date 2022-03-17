<template>
  <div class="withdrawal">
    <p-nav title="提现"/>
    <div class="bankinfo fl fd-r jc-sb ai-ctr">
      <label>到账账户</label>
      <div class="bank fl fd-c ai-ctr jc-ctr">
        <div class="top fl fd-r ai-ctr">
          <image :src="bank.logo">
          <span>{{bank.open_bank_name}}（{{bank.lastNumber}}）</span>
        </div>
        <span>5个工作日内到账</span>
      </div>
      <u-icon name="arrow-right" color="#B7B7B7" size="32rpx"></u-icon>
    </div>
    <div class="with-info">
      <p class="title">提现金额</p>
      <div class="input fl fd-r ai-ctr">
        <label>￥</label>
        <div class="i-b">
          <u-input v-model="price" style="font-weight: blod;" type="number"></u-input>
        </div>
      </div>
      <div class="with-set">
        <p>当前可提现金额{{asset.money||'-'}}，<span @click="withAll">全部提现</span></p>
        <p>费率：{{withdrawal_data.withdrawal_rate||'-'}}%</p>
      </div>
      <div class="btns fl ai-ctr jc-ctr">
        <button @click="withdrawal">提现</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([ 'bank', 'asset' ]),
  },
  data() {
    return {
      price: '',
      withdrawal_data: {},
    }
  },
  onLoad(e) {
    this.withdrawal_data = JSON.parse(e.withdrawal_data);
  },
  watch: {
    price() {
      var price = '$' + this.price;
      price = price
          .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
          .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
          .replace('.', '$#$')
          .replace(/\./g, '')
          .replace('$#$', '.')
          .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
      if (price.indexOf('.') < 0 && price != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          price = parseFloat(price);
      }
      if (price > +this.asset.money) price = +this.asset.money
      setTimeout(() => {
        this.price = price
      }, 0);
    }
  },  
  methods: {
    withAll() {
      this.price = this.asset.money;
    },
    withdrawal() {
      if (!this.price.length) {
        return this.$u.toast('请输入提现金额')
      }
      uni.showLoading({ mask: true,  title: '加载中...' });
      this.$api('asset').withdrawal_handle(this.price).then(res => {
        this.$store.dispatch('user/getOrgAsset').then(res => {
          this.$u.toast('提现成功');
          uni.navigateBack();
          uni.hideLoading();
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.withdrawal {
  height: 100vh;
  .with-info {
    width: calc(100% - 80rpx);
    padding: 40rpx;
    margin-top: 40rpx;
    background: white;
    flex: 1;
    .btns {
      margin-top: 80rpx;
      button {
        background: #07C160;
        width: 400rpx;
        height: 94rpx;
        color: white;
        border-radius: 47rpx;
      }
    }
    .title {
      color: #454564;
    }
    .with-set {
      padding: 20rpx 78rpx;
      p {
        height: 50rpx;
        display: flex;
        align-items: center;
        flex-direction: row;
        color: #454564;
        font-size: 24rpx;
        span {
          color: #25A1F9;
        }
      }
    }
    .input {
      height: 112rpx;
      label {
        font-size: 60rpx;
      }
      .i-b {
        height: 100%;
        width: 550rpx;
        margin-left: 20rpx;
        border-bottom: #F0F0F0 1rpx solid;
        input {
          font-size: 38rpx !important;
        }
      }
    }
  }
  .bankinfo {
    background: white;
    height: 176rpx;
    width: calc(100% - 80rpx);
    padding: 0 40rpx;
    label {
      color: #454564;
    }
    .bank {
      flex: 1;
      .top {
        image {
          width: 42rpx;
          height: 42rpx; 
          margin-right: 10rpx;
        }
        span {
          color: #454564;
          font-size: 26rpx;
        }
      }
      span {
        color: #7A7A7D;
        font-size: 20rpx;
      }
    }
  }
}
</style>
