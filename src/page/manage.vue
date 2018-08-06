<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark">
                    <router-link :to="{ path: '/manage' }">
					    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    </router-link>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <router-link :to="{ path: '/userList' }">
                            <el-menu-item index="userList" >用户列表</el-menu-item>
                        </router-link>
                        <router-link :to="{ path: '/logList' }">
                            <el-menu-item index="logList" >日志列表</el-menu-item>
                        </router-link>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
