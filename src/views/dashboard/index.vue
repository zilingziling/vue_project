<template>
  <div class="dashboard-container">
    <div class="dashboard-text">首页</div>
    <panel-group :chart-data="panelGroup" />
    <el-row :gutter="8">
      <el-col>
        <div class="flex">
          <div class="lineCart_wrap">
            <div class="lineCart_wrap_title">月利走势图</div>
            <div class="lineChart_wrap">
              <line-chart :chart-data="lineChartData" />
            </div>
          </div>
          <div class="warehouse_data">
            <div class="warehouse_data_top">
              <div class="warehouse_data_title">入出库数据</div>
              <div class="flex data_wrap">
                <div class="data_wrap_left">
                  <div class="minititle" style="margin-bottom:15px">入库（今日入库）</div>
                  <span class="warehouse_data_number">{{ allData.todayInCount }} </span><span style="color:#4a4a4a">/双</span>
                  <div style="width:100px;margin-top:20px">
                    <el-progress class="el-progress" :percentage="30" :stroke-width="4" :show-text="false" color="#24CCB8" />
                  </div>
                </div>
                <div class="data_wrap_right">
                  <div class="minititle" style="margin-bottom:15px">出库（今日出库）</div>
                  <span class="warehouse_data_number">{{ allData.todaySellCount }} </span><span style="color:#4a4a4a">/双</span>
                  <div style="width:100px;margin-top:20px">
                    <el-progress class="el-progress" :percentage="50" :stroke-width="4" :show-text="false" color="#FF5660" />
                  </div>
                </div>
              </div>
            </div>
            <div class="warehouse_data_bottom">
              <img src="@/assets/index/data.png" alt="">
              <div>
                <div class="minititle">本月利润</div>
                <div class="profit" :class="allData.monthProfitCount >= 0 ?'fc_red' :'fc_green'">{{ allData.monthProfitCount >= 0 ?'+' :'-' }}¥{{ allData.monthProfitCount/100 | toDecimal }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="chart-wrapper ">
          <pie-chart :pie-data="pieData1" name="数量" />
          <div class="flex1" style="flex:1">
            <div class="flex ">
              <img style="width:30rpx;height:30px;;margin-top:-3px" src="@/assets/index/sale.png" alt="">
              <div>
                <div class="chart-wrapper-title">月销售量</div>
                <span class="chart-wrapper-number">{{ allData.monthSellCount }}/</span><span>双</span>
              </div>
            </div>
            <div class="pie_data flex">
              <img style="width:30rpx;height:30px;;margin-top:-3px" src="@/assets/index/remaining.png" alt="">
              <div>
                <div class="chart-wrapper-title">商品剩余</div>
                <span class="chart-wrapper-number">{{ allData.allNumCount }}/</span><span>双</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="chart-wrapper">
          <pie-chart :pie-data="pieData2" name="盈亏" :color="color" />
          <div style="flex:1">
            <div class="flex">
              <img style="width:30rpx;height:30px;;margin-top:-3px" src="@/assets/index/profitt.png" alt="">
              <div>
                <div class="chart-wrapper-title">月总盈亏</div>
                <span class="chart-wrapper-number" :class="allData.monthProfitCount >= 0 ?'fc_red' :'fc_green'">{{ allData.monthProfitCount >= 0 ?'+' :'-' }}¥{{ allData.monthProfitCount | priceParse }}</span>
              </div>
            </div>
            <div class="pie_data flex">
              <img style="width:30rpx;height:30px;;margin-top:-3px" src="@/assets/index/profita.png" alt="">
              <div>
                <div class="chart-wrapper-title">年总盈亏</div>
                <span class="chart-wrapper-number" :class="allData.yearProfitCount >= 0 ?'fc_red' :'fc_green'">{{ allData.yearProfitCount >= 0 ?'+' :'-' }}¥{{ allData.yearProfitCount | priceParse }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div>
          <div class="flex updata_wrap">
            <img style="width:30rpx;height:30px;;margin-top:-18px" src="@/assets/index/hand.png" alt="">
            <div>
              <div class="chart-wrapper-title">毒当前手续费：3.5%</div>
              <span class="chart-wrapper-number fc_reds">（计算方式:毒标价*0.955-33）</span>
            </div>
          </div>
          <div class="flex updata_wrap" style="margin-top:20px">
            <img style="width:30rpx;height:30px;;margin-top:-18px" src="@/assets/index/date.png" alt="">
            <div>
              <div class="chart-wrapper-title">数据更新日期</div>
              <span class="chart-wrapper-number">{{ allData.updateTime }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import {
  getdashTop,getLineChart
} from '@/api/user'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
const lineChartData = {
  purchases: {
    xmonth: [],
    yprice: []
  }
}
export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChartData: {
        xmonth: [],
        yprice: []
      },
      allData: {},
      panelGroup:{
        shoeCount:0,
        sizeCount:0,
        priceInCount:0,
        profitCount:0
      },
      pieData1: [],
      pieData2: [],
      color: ['#F7535B', '#24CCB8']
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    const that = this
    getdashTop().then(response => {
      if (response.code ===0 ) {
        console.log(response.data)
        that.allData = response.data
        that.panelGroup = {
          ...this.data,
          ...response.data
        };
        that.handleData(response.data)
      }
    })
    getLineChart().then(response => {
      if (response.code ===0 ) {
        that.handleLine(response.data)
      }
    })
  },
  methods: {
    handleSetLineChartData() {},
    handleLine(opt){
      // const lineChartD = opt.month_total_profit_array
      const lineChartData = this.lineChartData

      for (let i = 0; i < opt.length; i++) {
        lineChartData.xmonth.push(parseInt(opt[i].date))
        lineChartData.yprice.push(opt[i].price)
      }
    },
    handleData(opt) {
      console.log(opt.monthSellCount)
      this.pieData1 = [{
        value: opt.monthSellCount,
        name: '月销售量'
      },
      {
        value: opt.allNumCount,
        name: '商品剩余'
      }
      ]
      this.pieData2 = [{
        value: opt.monthProfitCount,
        name: '月总盈亏'
      },
      {
        value: opt.yearProfitCount,
        name: '年总盈亏'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .lineChart_wrap {
    width: 100%;
    height: 262px;
  }
  .data_wrap {
    margin-top: 15px;
  }
  .data_wrap_left {
    width: 179px;
    padding-left: 38px;
  }
  .data_wrap_right {
    width: 177px;
    padding-left: 38px;
    border-left: 1px solid #e9e9e9;
  }
  .profit {
    font-size: 32px;
    font-family: DINAlternate;
    font-weight: bold;
    line-height: 37px;
  }
  .minititle {
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
  }
  .lineCart_wrap {
    width: 953px;
    height: 315px;
    background: #fff;
    border-radius: 20px 0 0 20px;
    margin-bottom: 20px;
    padding-right: 30px;
    &_title {
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 33px;
      margin: 20px;
    }
  }
  .warehouse_data {
    width: 358px;
    height: 315px;
    margin-left: 2px;
    &_top {
      background: #fff;
      border-radius: 0 20px 0 0;
      height: 208px;
      width: 100%;
      padding-top: 20px;
    }
    &_bottom {
      background: #fff;
      border-radius: 0 0 20px 0;
      height: 105px;
      width: 100%;
      margin-top: 2px;
      display: flex;
      align-items: center;
      padding-left: 40px;
      padding-right: 44px;
      justify-content: space-between
    }
    &_title {
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 33px;
      margin-left: 36px;
    }
    &_number {
      font-size: 30px;
      font-family: DINAlternate;
      font-weight: bold;
      color: rgba(74, 74, 74, 1);
      line-height: 35px;
    }
  }
  .dashboard {
    &-container {
      margin: 40px 24px;
    }
    &-text {
      font-size: 32px;
      font-weight: 600;
      color: rgba(34, 34, 34, 1);
      line-height: 45px;
      margin-bottom: 24px;
    }
  }
  .pie_data {
    padding: 28px 28px 0 0;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .flex {
    display: flex
  }
  .updata_wrap {
    width: 255px;
    height: 88px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0 0 14px;
  }
  .chart-wrapper {
    background: #fff; // width: 367px;
    height: 195px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-title {
      font-size: 16px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    ;
    &-number {
      font-size: 18px;
      font-family: DINAlternate;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
  }
  .fc_reds {
    font-size: 14px;
    font-family: DINAlternate;
    font-weight: bold;
    color: rgba(247, 83, 92, 1);
    line-height: 16px;
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
  .fc_red {
    color: rgba(245, 76, 76, 1);
  }
  .fc_green {
    color: rgba(36, 204, 184, 1);
  }
  ;
</style>
