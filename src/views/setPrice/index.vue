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
    width: 50vw;
    height: 50vh;
    margin:10vh auto 0;
    background: #ffffff;
    border-radius: .5rem;
    position: relative;
    box-sizing: border-box;
    padding: 1rem;
    .form{
      width: 60%;
      margin:6rem auto 0;
      .buttons{
        text-align: center;
      }
    }
  }
</style>
