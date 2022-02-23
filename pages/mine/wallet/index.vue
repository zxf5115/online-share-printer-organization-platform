<template>
  <div class="wallet">
    <p-nav :title="title"/>
    <div class="wallet-top bg-w">
      <div class="total-num fl fd-r ai-ctr">
         <span class="num-tit">收益总金额：</span>
         <span>￥<u-count-to class="count" :endVal="2000.00" :decimals="2" fontSize="48rpx" color="#FF8A00"></u-count-to></span>
      </div>
      <div class="total-num fl fd-r ai-ctr">
        <span>可提现金额：</span>
        <span>￥<u-count-to class="count" :endVal="2000.00" :decimals="2" fontSize="48rpx" color="#FF8A00"></u-count-to></span>
      </div>
    </div>
    <div class="select-bankCard bg-w fl fd-r ai-ctr jc-sb" @click="myBankcard">
      <span class="ft-14">银行卡：</span>
      <span v-if="hasBank"><image class="bankCard-image" src="@/static/mine/wallet/bankImg.png">中国工商银行（9552）</span>
      <span v-else>点击设置银行卡</span>
      <u-icon name="arrow-right" color="#B7B7B7" size="18" @click="leftAction"></u-icon>
    </div>
    <div class="takeNotes fl fd-c ai-ctr">
      <span class="cl-main ft-14" @click="takeNotesClick">提现记录</span>
      <span class="green-btn">提现</span>
      <span class="ft-12 tl-ctr"> 提现成功后七个工作日到账<br />最小提现金额为2000元
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: '我的钱包'
    }
  },
  computed: {
    ...mapGetters([ 'hasBank', 'bankinfo' ]),
  },
  created() {
      this.$api('bank').data().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    takeNotesClick() {
      console.log("djdjjdjdjd")
      uni.navigateTo({ url: '/pages/mine/wallet/takeNotes/index' })
    },
    leftAction() {
      uni.navigateTo({ url: '/pages/mine/wallet/takeNotes/index' })
    },
    myBankcard() {
      if (this.hasBank) {
        uni.navigateTo({ url: '/pages/mine/wallet/bankDetail/index' })
      } else {
        uni.navigateTo({ url: '/pages/mine/wallet/addBankcard/index' })
      }
    }
  }
  
}
</script>
<style scoped lang="scss">
.wallet-top {
  height: 298rpx;
  .total-num {
    height: 149rpx;
    line-height: 149rpx;
    padding: 0 40rpx;
    span {
      color: #454564;
      &:nth-child(2) {
        color: #FF8A00;
        font-size: 48rpx;
        margin-right: -10rpx;
        margin-left: 58rpx;
      }

    }
    &:nth-child(1) {
      border-bottom: 1rpx solid #f0f0f0;
    }
  }
}
.select-bankCard {
  margin-top: 9rpx;
  height: 152rpx;
  padding: 0 40rpx;
  span {
    color: #454564;
    display: flex;
    .bankCard-image {
      width: 41rpx;
      height: 41rpx;
      margin-right: 12rpx;
      margin-top: 6rpx;
    }
  }
}
.takeNotes {
  margin-top: 344rpx;
  span {
    &:nth-child(3) {
      color: #454564
    }
  }
  .green-btn {
    margin: 22rpx 0 22rpx
  }
}
</style>
