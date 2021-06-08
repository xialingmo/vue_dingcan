<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/diancanlog.jpg" alt="" />
        <span>网上点餐管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span> 
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu> 
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-dessert"></i>
              <span>饮品管理</span> 
            </template>
            <el-menu-item index="2-1" v-for="item in menulist" :key="item.tid">
              <template slot="title">
                <i class="el-icon-cold-drink"></i>
                <span>{{item.type_name}}</span>
              </template>
            </el-menu-item>
          </el-submenu> 
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-chicken"></i>
              <span>订单管理</span> 
            </template>
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单详情</span>
              </template>
            </el-menu-item>
          </el-submenu> 
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
   
  },
  async getMenuList() {
    const { data:res } = await this.$http.get("") //请求饮品菜单路径
    if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
    this.menulist = res.data
    console.log(res)
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #545c64;
}

.el-main {
  background-color: #eaedf1;
}
</style>
