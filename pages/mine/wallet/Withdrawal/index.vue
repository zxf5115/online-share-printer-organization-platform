<template>
  <div class="withdrawal">
    <p-nav title="我的银行卡"/>
    <div class="myBankcard">
      <div class="bankCard-list" v-for="(item, index) in bankCardList" :key="index" :style="{'background': item.color}">
        <div class="bankCardContent fl fd-r">
          <div class="cardMessageLeft fl ai-ctr jc-ctr">
            <div class="cardImg"><img src="@/static/mine/wallet/home_s.png" alt=""></div>
          </div>
          <div class="bankMessageRight">
             <p class="bankCardName">{{item.name}}</p>
             <p class="bankCardType">{{item.type}}</p>
             <p class="bankCardNumber">**** **** **** {{item.number}}</p>
          </div>
        </div>
      </div>
      <div class="bankCard-add bg-w fl fd-r ai-ctr jc-ctr">
        <div class="addBankcardImg" @click="addBankcard"><img src="@/static/mine/wallet/addBankcard.png" alt=""></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bankCardList: [
        {
          color: '#D83D3D',
          name: '中国工商银行',
          type: '储蓄卡',
          number: '2849'
        },
        {
          color: '#199176',
          name: '中国工商银行',
          type: '储蓄卡',
          number: '2849'
        }
      ]
    }
  },
  methods: {
    /**
     * 添加银行卡
     */
    addBankcard() {
      uni.navigateTo({ url: '/pages/mine/wallet/addBankcard/index' })
    }
  }
}
</script>
<style scoped lang="scss">
.myBankcard {
  margin: 16rpx 18rpx 32rpx;
  .bankCard-list {
    height: 262rpx;
    width: 100%;
    border-radius: 10rpx;
    color: #ffffff;
    margin-bottom: 32rpx;
    .bankCardContent {
      margin: 38rpx auto auto 36rpx;
      .cardMessageLeft {
        width: 60rpx;
        height: 60rpx;
        background: #ffffff;
        border-radius: 50%;
        margin-right: 22rpx;
        .cardImg {
          width: 44rpx;
          height: 44rpx;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .bankMessageRight {
        color: #ffffff;
        .bankCardName {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
        }
        .bankCardType {
          height: 26rpx;
          line-height: 26rpx;
          font-size: 18rpx;
          margin: 6rpx 0 11rpx;
        }
        .bankCardNumber {
           height: 50rpx;
          line-height: 50rpx;
          font-size: 36rpx;
        }
      }
    }
  }
  .bankCard-add {
    height: 262rpx;
    width: 100%;
    border-radius: 10rpx;
    .addBankcardImg {
      width: 186rpx;
      height: 40rpx;
      img {
        width: 100%;
        height: 100%
      }
    }
  }
}
</style>
