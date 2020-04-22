<template>
  <div class="DetailedCard">
    <AppBar pageTitle="还款明细" shadow occupyBtn></AppBar>
    <div class="contentBox">
      <div class="content-appBar basic-info">

        <div class="header"> <span>肚丝(1期)</span> </div>
        <div class="middle">
          <div class="itemBox">
            <div class="item"><span>身份证号</span> <span>510923198802250021</span></div><div class="item"><span>手机号</span> <span>13111866951</span></div>
          </div>
          <div v-if="carTitle == '还款明细'">
            <div class="itemBox">
              <div class="item"><span>本期还款金额</span> <span>90,234,76元</span></div><div class="item"><span>应还款日期</span> <span>2020.01.21</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>放款平台</span> <span>工商-海南分行</span></div><div class="item"><span>还款方式</span> <span>保证金扣除</span></div>
            </div>
          </div>
          <div v-else-if="carTitle == '回款明细'">
            <div class="itemBox">
              <div class="item"><span>贷款金额</span> <span>90,234,76元</span></div><div class="item"><span>应还总金额</span> <span>90,234,76元</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>拟代偿金额</span> <span>90,234,76元</span></div><div class="item"><span>代偿类型</span> <span>逾期代偿</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>代偿分类</span> <span>银行要垫资</span></div><div class="item"><span>已还总金额</span> <span>90,234,76元</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>剩余应还金额</span> <span>90,234,76元</span></div><div class="item"><span>所属公司</span> <span>贵州公司</span></div>
            </div>
          </div>
        </div>

        <div class="header"> <span>肚丝(1期)</span> </div>
        <div class="middle">
          <div class="itemBox">
            <div class="item"><span>身份证号</span> <span>510923198802250021</span></div><div class="item"><span>手机号</span> <span>13111866951</span></div>
          </div>
          <div v-if="carTitle == '还款明细'">
            <div class="itemBox">
              <div class="item"><span>本期还款金额</span> <span>90,234,76元</span></div><div class="item"><span>应还款日期</span> <span>2020.01.21</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>放款平台</span> <span>工商-海南分行</span></div><div class="item"><span>还款方式</span> <span>保证金扣除</span></div>
            </div>
          </div>
          <div v-else-if="carTitle == '回款明细'">
            <div class="itemBox">
              <div class="item"><span>贷款金额</span> <span>90,234,76元</span></div><div class="item"><span>应还总金额</span> <span>90,234,76元</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>拟代偿金额</span> <span>90,234,76元</span></div><div class="item"><span>代偿类型</span> <span>逾期代偿</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>代偿分类</span> <span>银行要垫资</span></div><div class="item"><span>已还总金额</span> <span>90,234,76元</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>剩余应还金额</span> <span>90,234,76元</span></div><div class="item"><span>所属公司</span> <span>贵州公司</span></div>
            </div>
          </div>
        </div>

        <div v-if="carTitle == '还款明细'">
          <div v-if="detailedType == '还款'">
            <div class="header"> <span>实还款信息</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>还款金额</span> <span>90,234,76元</span></div><div class="item"><span>实还款日期</span> <span>2020.01.21</span></div>
              </div>
              <div class="itemBox">
                <div class="item"><span>还款状态</span> <span>已代偿</span></div><div class="item"><span>还款行为</span> <span>代偿</span></div>
              </div>
            </div>
          </div>
          <div v-else-if="detailedType == '回款'">
            <div class="header"> <span>实还款信息(1)</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>已回款金额</span> <span>90,234,76元</span></div><div class="item"><span>回款日期</span> <span>2020.01.21</span></div>
              </div>
              <div class="itemBox">
                <div class="item"><span>未回款金额</span> <span>10000.00元</span></div><div class="item"><span>还款方式</span> <span>代偿回款</span></div>
              </div>
              <div class="itemBox">
                <div class="item voucher"><span>回款凭证</span>
                  <div class="imgList">
                    <img :src="item" v-for="(item,index) in imagesList" :key="index" @click="openPreview(item, index)">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top:12px;">
            <div class="header"> <span>资方应还信息</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>本金</span> <span>90,234,76元</span></div><div class="item"><span>利息</span> <span>90,234,76元</span></div>
              </div>
              <div class="itemBox">
                <div class="item"><span>罚息</span> <span>90,234,76元</span></div>
              </div>
            </div>
            <div class="header"> <span>平台应收信息</span> </div>
            <div class="middle">
              <div class="itemBox">
                <div class="item"><span>违约金</span> <span>90,234,76元</span></div><div class="item"><span>罚息</span> <span>90,234,76元</span></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="carTitle =='回款明细'">
          <div class="header"> <span>代偿放款</span> </div>
          <div class="middle">
            <div class="itemBox">
              <div class="item"><span>放贷金额</span> <span>90,234,76元</span></div><div class="item"><span>部门</span> <span>放款中心</span></div>
            </div>
            <div class="itemBox">
              <div class="item"><span>需代偿平台</span> <span>贵州-工商银行</span></div>
            </div>
          </div>
          <div class="header"> <span>代偿回款</span> </div>
          <div class="middle">
            <div class="itemBox">
              <div class="item"><span>回款金额</span> <span>90,234,76元</span></div><div class="item"><span>回款时间</span> <span>2020.01.21</span></div>
            </div>
            <div class="itemBox">
              <div class="item voucher"><span>回款凭证</span>
                <div class="imgList">
                  <img :src="item" v-for="(item,index) in imagesList" :key="index" @click="openPreview(item, index)">
                </div>
              </div>
            </div>
          </div>
        </div>

        <PreviewImage :previewView="previewView" :imagesList="imagesList" :previewSrc="previewSrc" :previewIndex="previewIndex" :testImgState="false" @closePreview="closePreview"></PreviewImage>

      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@components/basics/AppBar'
import PreviewImage from '@components/upLoad/components/PreviewImage'
export default {
  components: {
    AppBar, PreviewImage
  },
  data() {
    return {
      carTitle:'还款明细',
      detailedType:'回款',
      previewView:false,
      previewSrc:'',
      previewIndex:0,
      imagesList:['../../../../static/images2/dog.jpg','../../../../static/images2/github.jpg','../../../../static/images2/吹泡泡.jpg']
    }
  },
  methods: {
    // 显示查看图片 view
    openPreview(item, index){
      this.previewView = true;
      this.previewSrc = item;
      this.previewIndex = index;
    },
    // 关闭 图片预览 view
    closePreview(val){
      this.previewView = val;
    },
  }
}
</script>
