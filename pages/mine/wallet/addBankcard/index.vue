<template>
  <div class="addBankcard">
    <p-nav :title="title"/>
    <u-form :model="bankcardMessage" ref="uForm" label-width="200rpx" :labelStyle="labelStyle">
      <div class="addBankcardBottom bg-w">
        <u-form-item label="户名: " prop="name">
          <u-input v-model="bankcardMessage.company_name" border="none" placeholder="请输入您的户名"></u-input>
        </u-form-item>
        <u-form-item label="银行卡号: " prop="cardId">
          <u-input v-model="bankcardMessage.card_no" border="none" placeholder="请输入持卡人本人银行卡号"></u-input>
        </u-form-item>
        <u-form-item label="开户行: " prop="bankDeposit">
          <p @click="showPicker = true">
            <span v-if="bankcardMessage.open_bank_name">{{bankcardMessage.open_bank_name}}</span>
            <span style="color: rgba(193, 196, 203, 1)" v-else>点击选择开户行</span>
          </p>
          
        </u-form-item>
         <u-form-item label="开户支行: " prop="depositBranch">
          <u-input v-model="bankcardMessage.branch_bank_name" border="none" placeholder="请输入开户行支行"></u-input>
        </u-form-item>
      </div>
      <div class="submitBankCard">
        <u-button @click="submitBankCard" :customStyle="SubmitCustomStyle">{{title}}</u-button>
      </div>
    </u-form>
    <u-picker :show="showPicker" :columns="[bankList]" :keyName="'name'" @confirm="pickerConfirm" @cancel="showPicker = false"></u-picker>
  </div>

</template>
<script>
import common from "@/util/date/common.js"
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      bankcardMessage: {
        company_name: void 0,
        card_no: void 0,
        open_bank_name: void 0,
        branch_bank_name: void 0,
      },
      rules: {
        company_name: [{ required: true, message: '请输入户名', trigger: ['blur', 'change']}],
        card_no: [{ required: true, message: '请输入银行卡号', trigger: ['blur', 'change']}],
        open_bank_name: [{ required: true, message: '请选择开户行', trigger: ['blur', 'change']}],
        branch_bank_name: [{ required: true, message: '请输入开户支行', trigger: ['blur', 'change']}],
      },
      title: "添加银行卡",
      labelStyle: { // 表单的样式
        fontSize: "28rpx"
      },
      SubmitCustomStyle: { // 提交按钮的样式
        width:'396rpx',
        height: '94rpx',
        background: '#07C160',
        color: '#fff',
        borderRadius: '50rpx'
      },
      resultParams: {}, // 成功失败结果
      showPicker: false, 
    }
  },
  computed: {
    ...mapGetters([ 'bankList' ]),
  },
  methods: {
    pickerConfirm(e) {
      this.showPicker = false;
      console.log(e);
      this.bankcardMessage.open_bank_name = e.value[0].name;
    },
    selectBankList() {
      this.showPicker = true;
    },
    /**
     * 提交银行卡信息
     */
    submitBankCard() {
      if (!common.checkRules(this.bankcardMessage, this.rules)) {
        return this.$u.toast('请输入银行卡相关信息');
      }
      uni.showLoading({ mask: true, title: '加载中'});
      this.$api('bank').handle(this.bankcardMessage).then(res => {
        this.$store.dispatch('user/getBankInfo').then(res => {
          uni.hideLoading();
          this.next(true);
        }).catch(error => {
          uni.hideLoading();
        })
      }).catch(error => {
        uni.hideLoading();
        this.next(false, error.message);
      })
    },
    next(flag, message) {
      if (flag) {
        this.resultParams =  {
          type: 1, // 成功
          title: '添加成功',
          img: require("@/static/mine/wallet/Done.png"),
          titleColor: '#07C160',
          subtitleTitle: "",
          resultBtn: "确定"
        }
      } else {
        this.resultParams =  {
          type: 0, // 成功
          title: '添加失败',
          img: require("@/static/mine/wallet/Info.png"),
          titleColor: '#F76160',
          subtitleTitle: message||"请重新添加银行卡",
          resultBtn: "重新添加银行卡"
        }
      }
      uni[!flag ? 'navigateTo' : 'redirectTo']({
        url: '/pages/mine/wallet/resultView/index?resultParams=' + encodeURIComponent(JSON.stringify(this.resultParams))
      })
    }
  }
}
</script>
<style scoped>
::v-deep .u-input {
    background: white !important;
}
</style>
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
