<template>
  <div v-loading.fullscreen.lock="Loading" class="app-container">
    <div class="flex jus-bet">
      <div class="dashboard-text">仓库</div>
      <div class="flex">
        <el-input placeholder="请输入货号" clearable  icon="search" v-model="inputSearch" class="search-input">
        </el-input>
        <el-button class="top_button" @click="getLog(2)">
          出库记录
          <img src="@/assets/warehouse/eyes.png" alt="">
        </el-button>
        <el-button class="top_button" @click="getLog(1)">
          入库记录
          <img src="@/assets/warehouse/eyes.png" alt="">
        </el-button>
        <el-button class="top_button" @click="dialogSearchVisible = true">
          <img src="@/assets/warehouse/add.png" alt=""> 新增商品
        </el-button>
      </div>
    </div>
<!--    <div class="scrollWrapper">-->
    <el-table
      v-loading="listLoading"
      :data="tables"
      :row-style="{ height: '105px' }"
      element-loading-text="Loading"
      style="width: 100%;border-radius:12px"
      border
      fit
      highlight-current-row
      :header-row-style="{
        height: '54px',
        'box-shadow':
          '1px 0px 0px 0px rgba(232, 232, 232, 1), 0px 1px 0px 0px rgba(232, 232, 232, 1)',
        'font-size': '14px',
        'font-weight': '500',
        color: 'rgba(0, 0, 0, 0.85)'
      }"
      :header-cell-style="{
        background: '#FAFAFA'
      }"
    >
      <el-table-column align="center" label="商品信息" min-width="474">
        <template slot-scope="list">
          <div class="flex goods_wrap">
            <div class="goods_img">
              <img v-if="list.row.image != ''" :src="list.row.img" alt="">
            </div>
            <div class="goods_name">{{ list.row.shoeName }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="货号"
        min-width="140"
        align="center"
        :cell-style="{ background: 'red' }"
      >
        <template slot-scope="list">
          <span class="numberCell">{{ list.row.shoeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" min-width="140" align="center">
        <template slot-scope="list">
          <span class="numberCell">{{ list.row.resultNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存成本" min-width="140" align="center">
        <template slot-scope="list">
          <span class="moneyCell">￥</span>
          <span class="numberCell">{{ Math.round(list.row.priceIn/100) | toDecimal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="毒到手总利润" min-width="140" align="center">
        <template slot-scope="list">
          <span
            class="moneyCell"
            :class="
              list.row.priceDo > 0 || list.row.priceDo == 0
                ? 'fc_red'
                : 'fc_green'
            "
          >
            {{
              list.row.priceDo > 0 || list.row.priceDo == 0
                ? "+"
                : "-"
            }}
            ￥</span>
          <span
            class="numberCell"
            :class="
              list.row.priceDo > 0 || list.row.priceDo == 0
                ? 'fc_red'
                : 'fc_green'
            "
          >{{ Math.round(list.row.priceDo/100) | toDecimal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前盈亏" min-width="160" align="center">
        <template slot-scope="list">
          <span
            class="moneyCell"
            :class="
              list.row.priceProfit > 0 || list.row.priceProfit == 0
                ? 'fc_red'
                : 'fc_green'
            "
          >{{
            list.row.priceProfit > 0 || list.row.priceProfit == 0
              ? "+"
              : "-"
          }}￥</span>
          <span
            class="numberCell"
            :class="
              list.row.priceProfit > 0 || list.row.priceProfit == 0
                ? 'fc_red'
                : 'fc_green'
            "
          >{{ Math.round(list.row.priceProfit/100) | toDecimal }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        class-name="status-col"-->
      <!--        label="当前盈亏"-->
      <!--        min-width="140"-->
      <!--        align="center"-->
      <!--      >-->
      <!--        <template slot-scope="list">-->
      <!--          <span-->
      <!--            class="profit_red"-->
      <!--            :class="-->
      <!--              list.row.cnmslba > 0 || list.row.cnmslba == 0-->
      <!--                ? 'fc_red'-->
      <!--                : 'fc_green'-->
      <!--            "-->
      <!--            >{{-->
      <!--              list.row.cnmslba > 0 || list.row.cnmslba == 0 ? "+" : "-"-->
      <!--            }}￥</span-->
      <!--          >-->
      <!--          <span-->
      <!--            class="profit_red_number"-->
      <!--            :class="-->
      <!--              list.row.cnmslba > 0 || list.row.cnmslba == 0-->
      <!--                ? 'fc_red'-->
      <!--                : 'fc_green'-->
      <!--            "-->
      <!--            >{{ list.row.cnmslba | toDecimal }}</span-->
      <!--          >-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
        min-width="200"
      >
        <template slot-scope="list">
          <el-button type="primary" @click="goodsOption(list.row)">
            入库/卖出</el-button>
          <div class="delectBtn" @click="delectBtn(list.row.shoeNum)">删除</div>
        </template>
      </el-table-column>
      <!--无限滚动-->
    </el-table>
<!--    <mugen-scroll :handler="loadMore" :should-handle="!loadSign" />-->
<!--    </div>-->

    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
    <!-- 日志弹窗 -->
    <el-dialog
      width="740"
      custom-class="logs_dialog"
      :show-close="false"
      :visible.sync="dialogTableVisible"
    >
      <div class="dialog_title">{{ this.modalName }}</div>
      <img
        class="close"
        src="@/assets/warehouse/close.png"
        @click="dialogTableVisible = false"
      >
      <el-table
        :data="logData"
        style="border-radius:4px;"
        height="400"
        border
        :header-row-style="{
          height: '54px',
          'font-size': '14px',
          'font-weight': '500',
          color: '#333333'
        }"
        :header-cell-style="{
          background: '#FAFAFA'
        }"
      >
        <el-table-column
          property="type"
          label="操作类型"
          width="98"
          align="center"
        >
          <template slot-scope="logData">
            <span class="logs_table_text">{{ logData.row.operateType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="name"
          label="名称"
          width="158"
          align="center"
        >
          <template slot-scope="logData">
            <span class="logs_table_text">{{ logData.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column property="size" label="尺码" width="83" align="center">
          <template slot-scope="logData">
            <span class="logs_table_text">{{ logData.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="number"
          label="数量"
          width="83"
          align="center"
        >
          <template slot-scope="logData">
            <span class="logs_table_text">{{ logData.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="103"
          align="center"
        >
          <template slot-scope="logData">
            <span class="logs_table_text">￥{{ Math.round(logData.row.price/100) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="date"
          label="日期"
          width="173"
          align="center"
        >
          <template slot-scope="logData">
            <span class="logs_table_text">{{ logData.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 搜索弹窗 -->
    <el-dialog
      width="740"
      custom-class="search_dialog"
      :show-close="false"
      :visible.sync="dialogSearchVisible"
    >
      <div class="flex search_wrap">
        <img src="@/assets/warehouse/search.png">
        <el-input
          v-model="search_key"
          class="search_input"
          placeholder="请输入货号，例如384665-060"
          clearable
          @change="search"
        />
      </div>
      <!-- 搜索没有数据 -->
      <div v-if="searchData.length === 0" class="search_wrap_noData">
        <img src="@/assets/warehouse/shop.png">
        <div class="search_tip">
          搜索的商品未搜索到，点击<span
            class="search_tip_else"
            @click="addGoods"
          >自定义添加</span>
        </div>
      </div>
      <!-- 搜索有数据 -->
      <div v-else class="search_wrap_Data">
        <div
          v-for="(item, index) in searchData"
          :key="index"
          class="flex search_data_item"
          @click="idStorage(item)"
        >
          <div class="search_data_img">
            <img v-if="item.img" :src="item.img">
          </div>
          <div>
            <div class="search_data_name">{{ item.shoeName }}</div>
            <div class="search_data_model">{{ item.shoeNum }}</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 自定义添加商品弹窗 -->
    <el-dialog
      width="740"
      custom-class="add_dialog"
      :show-close="false"
      :visible.sync="dialogAddVisible"
    >
      <div>
        <img
          class="close"
          src="@/assets/warehouse/close.png"
          @click="hideDialog"
        >
        <div>
          <el-upload
            class="goods-uploader"
            action="/prod-api/index.php/ebapi/index_page/upload"
            name="filename"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="storageData.img" :src="storageData.img" class="avatar">
            <img
              v-else
              src="@/assets/warehouse/picture.png"
              class="avatar"
              style="width:119px"
            >
          </el-upload>
          <div class="add_title">品名</div>
          <el-input
            v-model="storageData.name"
            class="addGoods_msg_input"
            placeholder="请输入商品名称"
            clearable
          />
          <div class="add_title">货号</div>
          <el-input
            v-model="storageData.huo"
            class="addGoods_msg_input"
            placeholder="货号，如jk133455"
            clearable
          />
          <el-button class="addGoods_btton" @click="storage">添加</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加尺寸弹窗 -->
    <el-dialog
      width="740"
      custom-class="size_dialog"
      :show-close="false"
      :visible.sync="dialogSizeVisible"
    >
      <div>
        <img
          class="close"
          src="@/assets/warehouse/close.png"
          @click="hideDialog"
        >
        <div class="options_goods_detail">
          <div class="options_img">
            <img :src="goodDetail.img">
          </div>
          <div class="options_detail">
            <div class="options_name line3">{{ goodDetail.shoeName }}</div>
            <div class="flex jus-bet al-cen" style="margin-top:10px">
              <div class="options_model">{{ goodDetail.shoeNum }}</div>
            </div>
          </div>
        </div>
        <div class="size_minititle">尺寸</div>
        <div class="size_wrap">
          <div
            v-for="(item, index) in sizeList"
            :key="index"
            class="size_item"
            :class="item.isSelect ? 'size_item_select' : ''"
            @click="sizeSelect(index)"
          >
            {{ item.value }}
          </div>
          <el-input
            v-for="(item, indexs) in sizeSelfData"
            :key="'a' + indexs"
            v-model="item.value"
            class="sizeInput"
            :class="item.isSelect ? 'sizeInput_select' : ''"
            @focus="sizeInputFocus(indexs)"
          />
          <!--          <div class="size_item" @click="sizeSelf">自定义</div>-->
        </div>
        <div class="size_minititle">入货价格（¥）</div>
        <el-input
          v-model="addSizeData.price"
          class="sale_peice_input"
          placeholder="请输入价格"
          @input="check_price"
        />
        <div class="size_minititle">数量</div>
        <div class="add_number_wrap">
          <img
            src="@/assets/warehouse/minus_number.png"
            alt=""
            @click="intMinus"
          >
          <div class="addsize_number">
            <el-input
              v-model.number="addSizeData.num"
              class="sale_num_input"
              :min="0"
              @blur="intNumBlur($event)"
            />
          </div>
          <img src="@/assets/warehouse/add_number.png" alt="" @click="intAdd">
        </div>
        <el-button class="addSize_button" @click="addSize">添加</el-button>
      </div>
    </el-dialog>
    <!-- 卖出弹窗 -->
    <el-dialog
      width="740"
      custom-class="sale_dialog"
      :show-close="false"
      :visible.sync="dialogSaleVisible"
    >
      <div>
        <img
          class="close"
          src="@/assets/warehouse/close.png"
          @click="hideDialog"
        >
        <div class="options_goods_detail">
          <div class="options_img">
            <img :src="goodDetail.img">
          </div>
          <div class="options_detail">
            <div class="options_name line3">{{ goodDetail.shoeName }}</div>
            <div class="flex jus-bet al-cen" style="margin-top:10px">
              <div class="options_model">{{ goodDetail.shoeNum }}</div>
            </div>
          </div>
        </div>
        <div class="size_minititle">卖出单价（¥）</div>
        <el-input
          v-model="saleData.price"
          class="sale_peice_input"
          placeholder="请输入价格"
          @input="saleCheck_price"
        />
        <div class="size_minititle">数量</div>
        <div class="add_number_wrap">
          <img
            src="@/assets/warehouse/minus_number.png"
            alt=""
            @click="saleMinus"
          >
          <div class="addsize_number">
            <el-input
              v-model.number="saleData.num"
              class="sale_num_input"
              :min="0"
              :max="saleMaxnum"
              @blur="saleNumBlur($event)"
            />
          </div>
          <img
            src="@/assets/warehouse/add_number.png"
            alt=""
            @click="saleAdd"
          >
        </div>
        <el-button class="addSize_button" @click="sale">卖出</el-button>
      </div>
    </el-dialog>

    <!-- 入库卖出弹窗 -->
    <el-dialog
      width="740"
      custom-class="option_dialog"
      :show-close="false"
      :visible.sync="dialogOptionVisible"
    >
      <div>
        <img
          class="close"
          src="@/assets/warehouse/close.png"
          @click="hideDialog"
        >
        <div class="options_goods_detail">
          <div class="options_img">
            <img v-if="goodDetail.img" :src="goodDetail.img">
          </div>
          <div class="options_detail">
            <div class="options_name line3">{{ goodDetail.shoeName }} {{ goodDetail.corlor }}</div>
            <div class="flex jus-bet al-cen" style="margin-top:10px">
              <div class="options_model">{{ goodDetail.shoeNum }}</div>
              <div class="addsize_button" @click="addSizeButton">
                添加尺寸
                <img src="@/assets/warehouse/add.png">
              </div>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <el-table
          v-loading="listLoading"
          :data="goodSize"
          :row-style="{ height: '54px' }"
          height="300"
          element-loading-text="Loading"
          style="width: 100%;border-radius:12px;margin-top:21px"
          border
          fit
          highlight-current-row
          :header-row-style="{
            height: '54px',
            'box-shadow':
              '1px 0px 0px 0px rgba(232, 232, 232, 1), 0px 1px 0px 0px rgba(232, 232, 232, 1)',
            'font-size': '14px',
            'font-weight': '500',
            color: 'rgba(0, 0, 0, 0.85)'
          }"
          :header-cell-style="{
            background: '#FAFAFA'
          }"
        >
          <el-table-column align="center" label="尺码" min-width="88">
            <template slot-scope="goodSize">
              <span>{{ goodSize.row.size }}</span>
            </template>
          </el-table-column>

          <el-table-column label="库存" min-width="89" align="center">
            <template slot-scope="goodSize">
              <span>{{ goodSize.row.resultNum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="入库单价"
            min-width="100"
            align="center"
            :cell-style="{ background: 'red' }"
          >
            <template slot-scope="goodSize">
              <span>{{ Math.round(goodSize.row.inPrice/100) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="入库总价" min-width="134" align="center">
            <template slot-scope="goodSize">
              <span>{{ Math.round(goodSize.row.priceIn/100) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到手利润" min-width="130" align="center">
            <template slot-scope="goodSize">
              <span class="moneyCell">￥</span>
              <span class="numberCell">{{ Math.round(goodSize.row.priceDo/100) }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            class-name="status-col"-->
          <!--            label="毒到手单码利润"-->
          <!--            min-width="130"-->
          <!--            align="center"-->
          <!--          >-->
          <!--            <template slot-scope="goodSize">-->
          <!--              <span-->
          <!--                class="moneyCell"-->
          <!--                style="font-size:18px"-->
          <!--                :class="-->
          <!--                  goodSize.row.priceProfit >= 0 ? 'fc_red' : 'fc_green'-->
          <!--                "-->
          <!--              >{{ goodSize.row.priceProfit >= 0 ? "+" : "-" }}￥</span>-->
          <!--              <span-->
          <!--                class="numberCell"-->
          <!--                style="font-size:18px"-->
          <!--                :class="-->
          <!--                  goodSize.row.priceProfit >= 0 ? 'fc_red' : 'fc_green'-->
          <!--                "-->
          <!--              >{{ goodSize.row.priceProfit/100 | toDecimal }}</span>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column
            align="center"
            prop="created_at"
            label="操作"
            min-width="87"
          >
            <template slot-scope="goodSize">
              <el-button
                type="primary"
                class="sale_button"
                @click="saleOption(goodSize.row)"
              >
                卖出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getGoodsInfo,
  getGoodsSize,
  addSize,
  delectItem,
  sale,
  search,
  storage,
  idStorage,
  getLog,
  getSize,
  getSoldList
} from '@/api/table'
import BackToTop from '@/components/BackToTop'
import MugenScroll from 'vue-mugen-scroll'
export default {
  components: {
    BackToTop, MugenScroll
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      inputSearch:"",
      Loading: false,
      logData: [],
      modalName: '',
      searchData: [],
      search_key: '',
      inpue: '',
      list: [],
      listLoading: true,
      dialogTableVisible: false,
      dialogSearchVisible: false,
      dialogAddVisible: false,
      dialogOptionVisible: false,
      dialogSizeVisible: false,
      dialogSaleVisible: false,
      myBackToTopStyle: {
        right: '0',
        bottom: '25px',
        width: '116px',
        height: '120px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: 'transparent' // 按钮的背景颜色 The background color of the button
      },
      // 页码
      p: {
        pageIndex: 1,
        pageSize: 10000,
        shoeName: ''
      },
      totalPages: '',
      sizeList: [],
      sizeSelfData: [],
      goodDetail: {},
      goodSize: [],
      sizeType: 0, // 0表示选择的  1表示自定义的尺码
      addSizeData: {
        size: 36,
        rid: 0,
        price: null,
        num: 1,
        inPrice: '',
        shoeNum: ''
      },
      saleData: {
        sizeid: 0,
        rid: 0,
        price: null,
        size: 0,
        num: 1,
        inPrice: '',
        shoeNum: ''
      },
      saleMaxnum: 0,
      storageData: {
        img: '',
        name: '',
        huo: ''
      },
      loadSign: false
    }
  },
  computed: {
    tables () {
      const inputSearch = this.inputSearch
      if (inputSearch) {
        return this.list.filter(dataNews => dataNews.shoeNum.includes(inputSearch))
      }else {
        return this.list
      }

    }
  },
  created() {
    this.fetchData()
  },
  // mounted() {
  //   window.addEventListener('scroll', this.handleScroll, true)
  // },
  // destroyed: function() {
  //   window.removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
  // },

  methods: {
    loadMore() {
      this.p.pageIndex++
      if (this.p.pageIndex > this.totalPages) {
        return
      }
      console.log(11)
      this.fetchData()
      console.log('到底了', this.p.pageIndex)
    },
    // 尺码
    getSizeList(shoeNum) {
      getSize({ pageIndex: 1, pageSize: 1000, shoeNum }).then(r => {
        if (r.code === 0) {
          const list = r.data.list
        }
      })
    },
    // 滚动事件
    handleScroll() {
      // const isBottom = getScrollHeight() - (Math.round(getScrollTop()) + getWindowHeight())
      // if (isBottom === 0 && this.p.pageIndex !== this.totalPages) {
      this.p.pageIndex++
      this.fetchData()
      // window.scrollBy(0, -1400)
      // }
    },

    sizeInputFocus(index) {
      const sizeList = this.sizeList
      for (const i of sizeList) {
        i.isSelect = false
      }
      const sizeSelfData = this.sizeSelfData
      for (const i of sizeSelfData) {
        i.isSelect = false
      }
      sizeSelfData[index].isSelect = true
      this.sizeType = 1
      this.sizeSelfData = sizeSelfData
      this.sizeList = sizeList
    },
    sizeSelf() {
      const sizeList = this.sizeList
      for (const i of sizeList) {
        i.isSelect = false
      }
      const sizeSelfData = this.sizeSelfData
      if (sizeSelfData != '') {
        for (const i of sizeSelfData) {
          i.isSelect = false
        }
      }
      sizeSelfData.push({ value: '', isSelect: true })
      this.sizeType = 1
      this.sizeList = sizeList
      this.sizeSelfData = sizeSelfData
    },
    // 获取日志
    getLog(mark) {
      const that = this
      that.modalName = mark === 1 ? '入库记录' : '出库记录'
      getLog({ pageSize: 10000, pageIndex: 1, type: mark === 1 ? '入库' : '卖出' }).then(res => {
        if (res.code === 0) {
          that.logData = res.data.list
        }
      })
      that.dialogTableVisible = true
    },
    // 自定义入库
    storage() {
      const that = this
      const storageData = this.storageData
      storage(storageData).then(res => {
        if (res.code === 0) {
          that.$message({
            type: 'success',
            message: '操作成功!'
          })
          that.hideDialog()
          that.fetchData()
          that.that.storageData = {
            img: '',
            name: '',
            huo: ''
          }
        }
      })
    },
    // 照片上传成功
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: '上传成功!'
        })
        this.storageData.img = `https://www.styleking.cn/${res.data.path}`
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片格式仅支持jpg|jpeg|png|gif')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    formatterSize(size) {
      const list = []
      size.map(i => list.push(
        {
          value: i,
          isSelect: false
        }
      ))
      this.sizeList = list
    },
    // 根据id入库
    idStorage(item) {
      const that = this
      this.dialogSearchVisible = false
      this.dialogSizeVisible = true
      this.goodDetail = item
      const size = item.size.split(',')
      this.formatterSize(size)
      // this.getSizeList(item.shoeNum)
      // idStorage({ id: id }).then(res => {
      //   if (res.code == 0 && res.msg == "ok" && res.data == 1) {
      //     that.searchData = [];
      //     that.search_key = "";
      //     that.hideDialog();
      //     that.fetchData();
      //     that.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   }
      // });
    },
    // 搜索
    search(key) {
      const that = this
      if (key === '') {
        that.searchData = []
        return false
      }
      search({ pageSize: 1000, pageIndex: 1, shoeName: key }).then(res => {
        that.searchData = res.data.list
      })
    },
    // 卖鞋
    sale() {
      const that = this
      const saleData = this.saleData
      saleData.price = saleData.price * 100
      sale(saleData).then(res => {
        if (res.code === 0) {
          that.fetchData(true)
          that.hideDialog()
          that.resetAddSizeData()
          that.$message({
            type: 'success',
            message: '操作成功!'
          })
        }
      })
    },
    delectBtn(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delectItem(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delectItem(id) {
      const that = this
      delectItem({ shoeNum: id }).then(res => {
        if (res.code === 0) {
          that.fetchData(true)
          that.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    },
    check_price(e) {
      const value = e.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.addSizeData.price = value
    },
    intNumBlur(e) {
      const addSizeData = this.addSizeData
      if (e.target.value <= 0) {
        addSizeData.num = 1
      }
      this.addSizeData = addSizeData
    },
    intMinus() {
      const addSizeData = this.addSizeData
      if (addSizeData.num == 1) {
        return
      } else {
        addSizeData.num--
      }
      this.addSizeData = addSizeData
    },
    intAdd() {
      const addSizeData = this.addSizeData
      addSizeData.num++
      this.addSizeData = addSizeData
    },
    saleCheck_price(e) {
      const value = e.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.saleData.price = value
    },
    saleNumBlur(e) {
      console.log(e.target.value)
      console.log(this.saleMaxnum)
      const saleData = this.saleData
      if (e.target.value <= 0) {
        saleData.num = 1
      }
      if (e.target.value > this.saleMaxnum) {
        this.$message({
          type: 'info',
          message: '卖出数量不能超过库存数量'
        })
        saleData.num = this.saleMaxnum
      }
      this.saleData = saleData
    },
    saleMinus() {
      const saleData = this.saleData
      if (saleData.num == 1) {
        return
      } else {
        saleData.num--
      }
      this.saleData = saleData
    },
    saleAdd() {
      const saleData = this.saleData
      if (saleData.num == this.saleMaxnum) {
        this.$message({
          type: 'info',
          message: '卖出数量不能超过库存数量'
        })
        return false
      }
      saleData.num++
      this.saleData = saleData
    },
    sizeSelect(index) {
      const sizeSelfData = this.sizeSelfData
      const addSizeData = this.addSizeData
      const sizeList = this.sizeList
      for (const i in sizeList) {
        sizeList[i].isSelect = false
      }
      for (const i in sizeSelfData) {
        sizeSelfData[i].isSelect = false
      }
      sizeList[index].isSelect = true
      addSizeData.size = sizeList[index].value
      this.sizeType = 0
      this.sizeList = sizeList
      this.sizeSelfData = sizeSelfData
    },
    // 入库
    addSize() {
      const that = this
      const addSizeData = this.addSizeData
      const sizeSelfData = this.sizeSelfData
      if (this.sizeType == 1) {
        for (let i = 0; i < sizeSelfData.length; i++) {
          if (sizeSelfData[i].isSelect) {
            addSizeData.size = sizeSelfData[i].value
          }
        }
      }
      addSizeData.inPrice = this.goodDetail.inPrice
      addSizeData.shoeNum = this.goodDetail.shoeNum
      addSizeData.price = addSizeData.price * 100
      addSize(addSizeData).then(res => {
        if (res.code === 0) {
          that.$message({
            message: '添加成功',
            type: 'success',
            customClass: 'zZindex'
          })
          that.fetchData(true)
          that.dialogSizeVisible = false
          // that.dialogOptionVisible = true;
          // this.dialogSearchVisible=false
          // getGoodsSize({ id: addSizeData.rid }).then(resp => {
          //   if (resp.code == 0) {
          //     that.goodSize = resp.data;
          //   }
          // });
          that.resetAddSizeData(addSizeData.rid)
        }
      })
    },
    resetAddSizeData(id) {
      this.addSizeData = {
        size: 36,
        rid: id,
        price: 0.0,
        num: 1,
        shoeNum: '',
        inPrice: ''
      }
      this.saleData = {
        sizeid: 0,
        rid: 0,
        inPrice: '',
        shoeNum: '',
        sizeid: 0,
        price: 0.0,
        size: 0,
        num: 1
      }
      const sizeList = this.sizeList
      for (const i in sizeList) {
        sizeList[i].isSelect = false
      }
      sizeList[0].isSelect = true
    },
    addSizeButton() {
      this.dialogSizeVisible = true
      this.dialogOptionVisible = false
    },
    saleOption(data) {
      const saleData = this.saleData
      saleData.inPrice = data.inPrice
      saleData.price = data.price
      saleData.shoeNum = data.shoeNum
      saleData.size = data.size
      this.saleMaxnum = data.resultNum
      this.saleData = saleData
      this.dialogSaleVisible = true
      this.dialogOptionVisible = false
    },
    // 点击卖出
    goodsOption(item) {
      const that = this
      const size = item.size.split(',')
      this.formatterSize(size)
      that.dialogOptionVisible = true
      this.goodDetail = item
      getSoldList({ pageSize: 1000, pageIndex: 1, shoeNum: item.shoeNum }).then(res => {
        that.goodSize = res.data.list
      })
      // let addSizeData = that.addSizeData;
      // let saleData = that.saleData;
      // addSizeData.rid = id;
      // saleData.rid = id;
      // this.Loading = true;
      // getGoodsInfo({ id: id }).then(res => {
      //   if (res.code == 0) {
      //     that.goodDetail = res.data[0];
      //   }
      // });
      // getGoodsSize({ id: id }).then(res => {
      //   if (res.code == 0) {
      //     that.goodSize = res.data;
      //     this.Loading = false;
      //     that.dialogOptionVisible = true;
      //   }
      // });
      // this.addSizeData = addSizeData;
      // this.saleData = saleData;
    },
    addGoods() {
      this.dialogSearchVisible = false
      this.dialogAddVisible = true
    },
    hideDialog() {
      this.goodDetail = {}
      this.dialogSizeVisible = false
      this.dialogSaleVisible = false
      this.dialogTableVisible = false
      this.dialogSearchVisible = true
      this.dialogAddVisible = false
      this.dialogOptionVisible = false
      this.dialogSearchVisible = false
    },
    headerClass(row) {
      return 'header_row'
    },
    fetchData(replace = false) {
      this.listLoading = true
      getList({ ...this.p, pageIndex: replace ? 1 : this.p.pageIndex }).then(response => {
        // this.list = response.data.items;
        if (response.code === 0) {
          if (replace) {
            this.list = response.data.list
          } else {
            this.list = this.list.concat(response.data.list)
          }
          this.p.pageIndex = response.data.pageIndex
          this.totalPages = response.data.totalPages
        }
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.scrollWrapper{

}
.goods_wrap {
  display: flex;
  align-items: center;
  margin-right: 50rpx;
}
.goods_img {
  width: 130px;
  height: 80px;
  // border: 1rpx solid #eee;
  border-radius: 8px;
  background: #fff;
  margin-right: 12px;
  margin-left: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.goods_name {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}
.el-button--primary {
  width: 90px;
  height: 32px;
  line-height: 0;
  background: rgba(254, 206, 53, 1) !important;
  box-shadow: 0px 10px 20px 0px rgba(254, 206, 53, 0.45);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border-color: rgba(254, 206, 53, 1);
  margin-bottom: 18px;
  padding: unset;
}
.el-button--primary:hover {
  background-color: #f6a10f !important;
  border-color: #f6a10f;
}
.el-button--primary:focus {
  background-color: #f6a10f !important;
  border-color: #f6a10f;
}
.search-input{
  width: auto;
  height: 40px;
 input{
   border-radius: 2rem;
 }
}
.top_button {
  width: 191px;
  height: 40px;
  background: rgba(34, 34, 34, 1);
  box-shadow: 0px 10px 20px 0px rgba(31, 24, 0, 0.28);
  border-radius: 19px;
  margin-left: 15px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0;
  text-align: center;
  position: relative;
  border: unset;
  &:hover {
    background: #000;
    color: #fff;
  }
  &:focus {
    background: #000;
    color: #fff;
  }
  img {
    position: absolute;
    top: 5px;
    right: 10px;
  }
}
.dashboard-text {
  font-size: 32px;
  font-weight: 600;
  color: rgba(34, 34, 34, 1);
  line-height: 45px;
  margin-bottom: 24px;
}
.app-container {
  margin: 40px 24px 150px;
  padding: unset;
}
.numberCell {
  font-size: 18px;
  font-family: DINAlternate;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.moneyCell {
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  font-family: PingFangSC;
}
.profit_red {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
}
.profit_red_number {
  font-size: 18px;
  font-family: DINAlternate;
  font-weight: 600;
}
.profit_green_number {
  font-size: 18px;
  font-family: DINAlternate;
  font-weight: 600;
}
.fc_red {
  color: rgba(245, 76, 76, 1);
}
.fc_green {
  color: rgba(36, 204, 184, 1);
}
.profit_green {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 600;
} // 日志弹窗
.el-dialog.logs_dialog {
  width: 740px;
  .logs_table_text {
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  padding: 20px;
  .dialog_title {
    margin-bottom: 17px;
    font-size: 24px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
}
.close {
  position: absolute;
  top: 15px;
  right: 22px;
  cursor: pointer;
}
.el-dialog.search_dialog {
  width: 800px;
  .search_wrap {
    align-items: center;
    padding: 20px 40px;
    width: 100%;
    img {
      width: 22px;
      height: 22px;
    }
    &_noData {
      padding-top: 40px;
      text-align: center;
      border-top: 1px solid #eee;
      width: 100%px;
      height: 218px;
      background: rgba(255, 255, 255, 1);
      border-radius: 0px 0px 20px 20px;
      img {
        margin-bottom: 16px;
      }
      .search_tip {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .search_tip_else {
        color: #333333;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &_Data {
      .search_data_item {
        padding: 12px 40px;
        border-top: 1px solid #eee;
      }
      .search_data_img {
        width: 100px;
        height: 60px;
        border-radius: 8px;
        background: #fff;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .search_data_name {
        margin-top: 2px;
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      .search_data_model {
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-top: 14px;
      }
    }
  }
  .search_input input.el-input__inner {
    flex: 1;
    border-radius: 14px;
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border: unset;
  }
}
.el-dialog.add_dialog {
  width: 400px;
  padding: 20px;
  .add_title {
    font-family: PingFangSC;
    font-size: 20px;
    font-weight: 400;
    margin-top: 21px;
    margin-bottom: 8px;
    color: rgba(51, 51, 51, 1);
  }
  .addGoods_msg_input input.el-input__inner {
    width: 360px;
    height: 44px;
    background: rgba(243, 243, 243, 1);
    border-radius: 22px;
    border: unset;
  }
  .addGoods_btton {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    width: 360px;
    height: 56px;
    font-family: PingFangSC;
    background: rgba(254, 206, 53, 1);
    box-shadow: 0px 10px 20px 0px rgba(254, 206, 53, 0.45);
    border-radius: 28px;
    margin-top: 20px;
  }
}
.goods-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.goods-uploader .el-upload:hover {
  border-color: #409eff;
}
.goods-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 119px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 119px;
  display: block;
}
.el-dialog.size_dialog,
.el-dialog.sale_dialog {
  width: 540px;
  padding: 20px;
  .size_wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .size_item {
    width: 82px;
    height: 38px;
    border-radius: 4px;
    background: #f3f3f3;
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 400;
    text-align: center;
    line-height: 38px;
    color: rgba(51, 51, 51, 1);
    margin-top: 16px;
    margin-right: 16px;
    cursor: pointer;
  }

  .sizeInput {
    width: 82px;
    margin-top: 16px;
    margin-right: 16px;
    background: #f3f3f3;
    border-radius: 4px;
  }
  .sizeInput input.el-input__inner {
    color: rgba(51, 51, 51, 1);
    font-family: PingFangSC;
    border: none;
    background: transparent;
    width: 82px;
    height: 38px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    line-height: 38px;
    padding: 0 0;
  }
  .sizeInput_select input.el-input__inner {
    background: rgba(51, 51, 51, 1);
    color: #ffffff;
  }
  .size_item_select {
    background: rgba(51, 51, 51, 1);
    color: #ffffff;
  }
  .sale_peice_input input.el-input__inner {
    width: 266px;
    height: 44px;
    background: rgba(243, 243, 243, 1);
    border-radius: 22px;
    border: unset;
    margin-top: 8px;
  }
  .sale_num_input input.el-input__inner {
    border: unset;
    text-align: center;

    min-width: 64px;
    max-width: 80px;
    height: 32px;
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 32px;
  }
  .addSize_button {
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    width: 500px;
    height: 56px;
    margin-top: 33px;
    background: rgba(254, 206, 53, 1);
    box-shadow: 0px 10px 20px 0px rgba(254, 206, 53, 0.45);
    border-radius: 28px;
    &:hover {
      border: 1px solid rgba(254, 206, 53, 1);
    }
  }
  .add_number_wrap {
    display: flex;
    margin-top: 9px;
    .addsize_number {
      min-width: 64px;
      height: 32px;
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 32px;
      text-align: center;
    }
  }
}
.size_minititle {
  font-size: 20px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 20px;
}
.el-dialog.option_dialog {
  padding: 20px;
  width: 820px;
}
.options_goods_detail {
  display: flex;
  box-sizing: border-box;
  padding-right: 1.8rem;
  .options_img {
    width: 180px;
    height: 119px;
    background: #fff;
    border-radius: 6px;
    margin-right: 12px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .options_name {
    width: 300px;
    font-size: 24px;
    height: 78px;
    font-weight: 600;
    color: rgba(34, 34, 34, 1);
  }
  .options_detail {
    flex: 1;
  }
  .options_model {
    font-size: 18px;
    font-family: DINAlternate;
    font-weight: bold;
    color: rgba(34, 34, 34, 1);
  }
  .addsize_button {
    cursor: pointer;
    width: 118px;
    height: 32px;
    background: rgba(34, 34, 34, 1);
    border-radius: 16px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 32px;
    padding-right: 20px;
    color: rgba(255, 255, 255, 1);
    position: relative;
    img {
      position: absolute;
      top: 3px;
      right: 8px;
      width: 26px;
      height: 26px;
    }
  }
}
.el-dialog.logs_dialog,
.el-dialog.option_dialog,
.el-dialog.add_dialog,
.el-dialog.size_dialog,
.el-dialog.sale_dialog,
.el-dialog.search_dialog {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.14);
  border-radius: 14px;
  .el-dialog__header {
    padding: unset;
  }
  .el-dialog__body {
    padding: unset;
  }
}
.sale_button {
  margin-bottom: unset;
  width: 63px;
  height: 32px;
  background: rgba(254, 206, 53, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.zZindex {
  z-index: 3000 !important;
}
.delectBtn {
  cursor: pointer;
}
.search_wrap_Data {
  height: 500px;
  overflow-y: scroll;
}
.line3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*控制在3行*/
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
