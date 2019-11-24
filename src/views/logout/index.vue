<template>
	<div>
	</div>
</template>

<script>
import {
    logout
  } from '@/api/user';
  import { resetRouter } from '@/router'
import { removeToken } from '../../utils/auth'
export default {
	name: 'Logout',
	data() {
		return {};
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true
		}
	},
	methods: {
    logout(){
      logout().then(res=>{
        if (res.code == 0) {
		  this.$router.push({path:'/login'})

          resetRouter()
        }
      })

    }
  },
	created() {
    const that = this;
		that.$confirm('您正在退出系统, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'primary'
		})
			.then(() => {
        resetRouter()
        that.logout()
			})
			.catch(() => {
				that.$router.go(-1);
			});
	}
};
</script>

<style lang="scss" scoped>
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
</style>
