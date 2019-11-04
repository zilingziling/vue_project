<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel blue" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <img src="@/assets/index/shop.png" alt />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">商品</div>
          <div>
            <count-to :start-val="0" :end-val="data.zong" :duration="2600" class="card-panel-number" />
            <span class="card-panel-unit"> 个</span>
          </div>
          <el-progress class="el-progress" :percentage="45" :stroke-width="4" :show-text="false" color="#326BEB"></el-progress>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel green" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <img src="@/assets/index/stock.png" alt />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">库存</div>
          <div>
            <count-to :start-val="0" :end-val="data.mun" :duration="2600" class="card-panel-number" />
            <span class="card-panel-unit"> 个</span>
          </div>
          <el-progress class="el-progress" :percentage="45" :stroke-width="4" :show-text="false" color="#17B6A8"></el-progress>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel red" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <img src="@/assets/index/money.png" alt />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">库存成本</div>
          <div class="card-panel-number">
            <span> ¥</span>
            <count-to :start-val="0" :end-val="data.money" :duration="2600" />
          </div>
          <el-progress class="el-progress" :percentage="45" :stroke-width="4" :show-text="false" color="#E1303A"></el-progress>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel yellow" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img src="@/assets/index/profit.png" alt />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">盈亏总额</div>
          <div class="card-panel-number">
            <span>{{data.yknmsl >= 0?'+':'-'}}</span>
            <count-to :start-val="0" :end-val="data.yknmsl | priceParse" :duration="2600" />
            <!-- <span>w</span> -->
          </div>
          <el-progress class="el-progress" :percentage="45" :stroke-width="4" :show-text="false" color="#FF9600"></el-progress>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from "vue-count-to";
  import { jishu } from '@/api/user';
  export default {
    components: {
      CountTo
    },
    data() {
      return {
        data: {
          money:0,
          mun:0,
          zong:0,
          yknmsl:0
        }
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit("handleSetLineChartData", type);
      },
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    },
    created () {
      const that = this;
      jishu().then(response => {
        if (response.code == 200) {
          that.data = response.data;
        }
			});
    },
  };
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    margin-right: unset !important;
    .card-panel-col {
      margin-bottom: 32px;
      padding-right: 0px !important;
      .blue {
        background: linear-gradient( to right, rgba(72, 128, 255, 1), rgba(116, 159, 255, 1));
      }
      .green {
        background: linear-gradient(to right, #1ebeb1, #27f3e3);
      }
      .red {
        background: linear-gradient(to right, #ec3c47, #ff8189);
      }
      .yellow {
        background: linear-gradient(to right, #f6a10f, #fed550);
      }
    }
    .card-panel {
      height: 190px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      border-radius: 20px;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      &-number {
        font-size: 32px;
        font-family: DINAlternate;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      &-unit {
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        } // .icon-people {
        //   background: #40c9c6;
        // }
        // .icon-message {
        //   background: #36a3f7;
        // }
        // .icon-money {
        //   background: #f4516c;
        // }
        // .icon-shopping {
        //   background: #34bfa3;
        // }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3;
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 0 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .el-progress {
        margin-top: 11px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 16px;
        min-width: 140px;
        .card-panel-text {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }
    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
