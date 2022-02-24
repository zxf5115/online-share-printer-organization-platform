<template>
  <div class="bank-ctn">
    <p-nav title="我的银行卡"/>
    <div class="bank-detail" :style="bankStyle">
      <div class="bank-info fl jc-ctr ai-ctr">
        <image :src="bank.logo"/>
        <span>{{bank.open_bank_name}}</span>
      </div>
      <p class="card-number">{{bank.number}}</p>
      <div class="payinfo">
        <p class="paysize">支付限额</p>
        <p class="paycell">
          <label>单笔限额</label><span>¥50000</span>
        </p>
        <p class="paycell">
          <label>每日限额</label><span>¥50000</span>
        </p>
      </div>
    </div>
    <div class="bank-del">
      <u-button @click="delAction" type="error" :customStyle="{width:'392rpx',height: '94rpx', background: '#D95555'}" shape="circle">解除绑定</u-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([ 'bank' ]),
    bankStyle() {
      return `background: ${this.bank.color};`;
    }
  },
  methods: {
   delAction() {
     this.$api('bank').delete(this.bank.id).then(res => {
       // 删除成功;
       this.$store.dispatch('user/getBankInfo').then(res => {
         this.$u.toast('删除成功');
         uni.navigateBack();
       })
     })
   }
  }
}
</script>
<style scoped lang="scss">
.bank-ctn {
  display: flex;
  height: 100vh;
  .bank-detail {
    width: calc(100% - 36rpx);
    height: 792rpx;
    border-radius: 16rpx;
    background: blue($color: #000000);
    margin: 54rpx 18rpx;
    .bank-info {
      margin-top: 66rpx;
      image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
        background-color: white;
      }
      span {
        color: white;
        font-size: 28rpx;
        margin-top: 24rpx;
      }
    }
    .payinfo {
      width: 670rpx;
      height: 202rpx;
      margin-top: 52rpx;
      font-size: 24rpx;
      border-radius: 12rpx;
      margin-left: 22rpx;
      background: white;
      .paysize {
        color: #A1A1A1;
        font-size: 22rpx;
        text-align: left;
        margin-left: 36rpx ;
        margin-top: 24rpx;
        margin-bottom: 10rpx;
      }
      .paycell {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 11rpx 36rpx;
        span {
          color: #787878;
        }
      }
    }
    .card-number {
      font-size: 36rpx;
      color: white;
      text-align: center;
      margin-top: 52rpx;
    }
  }
  .bank-del {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
