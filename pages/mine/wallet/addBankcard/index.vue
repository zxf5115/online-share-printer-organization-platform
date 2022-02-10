<template>
  <div class="addBankcard">
    <p-nav title="添加银行卡"/>
    <u-form :model="bankcardMessage" ref="uForm" label-width="140" :labelStyle="labelStyle">
      <div class="addBankcardTop bg-w">
        <u-form-item label="姓名: " prop="name">
          <u-input v-model="bankcardMessage.name" border="none" placeholder="请输入您的姓名"></u-input>
        </u-form-item>
        <u-form-item label="身份证号: " prop="id">
          <u-input v-model="bankcardMessage.id" border="none" placeholder="请输入您的身份证号码"></u-input>
        </u-form-item>
      </div>
      <div class="addBankcardBottom bg-w">
        <u-form-item label="银行卡号: " prop="cardId">
          <u-input v-model="bankcardMessage.cardId" border="none" placeholder="请输入持卡人本人银行卡号"></u-input>
        </u-form-item>
        <u-form-item label="开户行: " prop="bankDeposit">
          <u-input v-model="bankcardMessage.bankDeposit" border="none" placeholder="请输入开户行"></u-input>
        </u-form-item>
         <u-form-item label="开户支行: " prop="depositBranch">
          <u-input v-model="bankcardMessage.depositBranch" border="none" placeholder="请输入开户行支行"></u-input>
        </u-form-item>
         <u-form-item label="银行卡预留号码: " prop="phone">
          <u-input v-model="bankcardMessage.phone" type="number" border="none" placeholder="请输入银行卡预留号码"></u-input>
        </u-form-item>
         <u-form-item label="验证码: " prop="verificationCode">
          <u-input type="number" placeholder="请输入验证码" border="none" v-model="bankcardMessage.verificationCode">
            <template slot="suffix">
              <u-code @change="codeChange" ref="uCode" seconds="60" changeText="X秒重新获取"></u-code>
              <u-button @tap="getCode" :text="tips" type="primary" :customStyle="{width:'226rpx',height: '70rpx'}" shape="circle"></u-button>
            </template>
          </u-input>

        </u-form-item>
      </div>
      <div class="submitBankCard">
        <u-button @click="submitBankCard" :customStyle="SubmitCustomStyle">{{submitTips}}</u-button>
      </div>
    </u-form>
    
  </div>
</template>
<script>
import common from "@/util/date/common.js"
export default {
  data() {
    return {
      bankcardMessage: {
        name: "",
        id: "",
        cardId: "",
        bankDeposit: "",
        depositBranch: "",
        phone: "",
        verificationCode: ""
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change']}],
        id: [{ required: true, message: '请输入身份证号', trigger: ['blur', 'change']}],
        cardId: [{ required: true, message: '请输入银行卡号', trigger: ['blur', 'change']}],
        bankDeposit: [{ required: true, message: '请输入开户行', trigger: ['blur', 'change']}],
        depositBranch: [{ required: true, message: '请输入开户支行', trigger: ['blur', 'change']}],
        phone: [{ required: true, message: '请输入手机号', trigger: ['blur', 'change']}],
        verificationCode: [{ required: true, message: '请输入验证码', trigger: ['blur', 'change']}]
      },
      tips: "发送验证码",
      submitTips: "添加银行卡",
      labelStyle: {
        fontSize: "28rpx"
      },
      SubmitCustomStyle: {
        width:'396rpx',
        height: '94rpx',
        background: '#07C160',
        color: '#fff',
        borderRadius: '50rpx'
      }
    }
  },
  methods: {
    codeChange(text) {
      this.tips = text
    },
    /**
     * 获取验证码
     */
    getCode() {
      if(!this.bankcardMessage.phone) {
        uni.$u.toast('请先输入银行卡预留号码') 
        return 
      }
      this.$nextTick(() => {
        console.log(this.$refs.uCode)
      })
      // if (this.$refs.uCode.canGetCode) {
        uni.showLoading({
          title: '正在获取验证码'
        })
        setTimeout(() => {
          uni.hideLoading()
          uni.$u.toast("验证码已发送")
          // this.$refs.uCode.start()
        }, 2000)
      // }
    },
    /**
     * 提交银行卡信息
     */
    submitBankCard() {
      console.log(this.bankcardMessage) 
      let flag = common.checkRules(this.bankcardMessage, this.rules)
      if (flag) {
        console.log("校验通过")
      }
      // this.$refs.uForm.validate(valid => { // 不好使
      //   console.log(valid)
      //   if(valid) { uni.$u.toast("验证通过")} else { uni.$u.toast("验证不通过")}
      // })
    }
  }
}
</script>
<style scoped lang="scss">
.addBankcard {
  margin: 12rpx 0 auto;
  font-size: 14rpx;
  /deep/.u-form-item__body__right {
    border-bottom: 1px solid #F0F0F0;
  }
  /deep/.u-input__content__field {
    font-size: 28rpx!important
  }
  .addBankcardTop {
    height: 298rpx;
    padding: 58rpx 28rpx 0 20rpx;
    border-radius: 16rpx;
    box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(0, 0, 0, .25),0 -2px 8px -1px rgba(0, 0, 0, .25);
    /deep/.u-form-item {
      margin-bottom: 30rpx!important;
    }
  }
  .addBankcardBottom {
    height: auto;
    padding: 58rpx 28rpx 0 20rpx;
    margin-top: 14rpx;
    border-radius: 16rpx;
    /deep/.u-form-item {
      margin-bottom: 30rpx!important
    }
  }
  .submitBankCard {
    margin: 192rpx auto;
  }
}
</style>
