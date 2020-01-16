<template>
  <div class="outWrapper">
    <el-form class="form" label-width="8rem">
      <el-form-item label="请输入实体价格">
        <el-input
          v-model="price"
          clearable
          @input="onPriceChange"
        />
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="onSetPrice">
          确定</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getPrice, setPrice } from '../../api/warehouse'

export default {
  data() {
    return {
      price: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getPrice().then(r => {
        if (r.code === 0) {
          this.price = r.data
        }
      })
    },
    onPriceChange(v) {
      this.price = v
    },
    onSetPrice() {
      setPrice(this.price).then(r => {
        if (r.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.init()
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .outWrapper{
    width: 25vw;
    height: 25vh;
    margin:2rem 0  0 2rem;
    background: #ffffff;
    position: relative;
    box-sizing: border-box;
    padding: 2rem;
    .form{
      margin:2rem auto 0;
      .buttons{
        text-align: center;
      }
    }
  }
</style>
