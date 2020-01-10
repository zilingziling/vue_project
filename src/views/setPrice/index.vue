<template>
  <div class="outWrapper">
    <el-form class="form" label-width="8rem">
      <el-form-item label="请输入实体价格">
        <el-input />
      </el-form-item>
      <div class="buttons">
        <el-button type="primary">
          确定</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {

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
