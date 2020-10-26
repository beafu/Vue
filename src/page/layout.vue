<template>
<fullscreen ref="full"> 
    <el-container>
      <el-aside :width="asideW">
        <h3 class="lay-title">小U商城后台</h3>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#262a32"
          text-color="#f1f1f1"
          active-text-color="#FFF"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/admin">管理员管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/category">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/huiIndex">会员管理</el-menu-item>
            <el-menu-item index="/lunboIndex">轮播图管理</el-menu-item>
            <el-menu-item index="/miaoIndex">秒杀活动</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <el-button class="el-icon-s-fold" type="primary" @click="tot"></el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">{{this.$route.meta.title}}</el-breadcrumb-item>
              <el-breadcrumb-item>管理中心</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button circle class="el-icon-back" @click="$router.go(-1)"></el-button>
          </div>
          <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">
              admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="fullScreen">
                  <i class="el-icon-full-screen"></i>
                  全屏操作</el-dropdown-item>
              <el-dropdown-item  command="userInfo">
                   <i class="el-icon-user"></i>
                  个人信息</el-dropdown-item>
              <el-dropdown-item  command="logout">
                   <i class="el-icon-switch-button"></i>
                  退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</fullscreen>
</template>

<script>
import Vue from "vue"
//导入全屏预览组件
import fullscreen from "vue-fullscreen"
// 注册组件
Vue.use(fullscreen)
export default {
  data(){
    return{
      isCollapse:false
    }
  },
  computed:{
    //侧边栏的宽度
    asideW(){
      return this.isCollapse?"64px":"226px"
    }
  },
  created(){
     console.log(this.$route.meta.title)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 下拉款的点击事件处理函数
    handleCommand(command){
        this[command]();
    },
    //全屏操作
    fullScreen(){
      console.log(this.$refs.full)
      this.$refs.full.toggle()
    },
    //个人信息
    userInfo(){

    },
    tot(){
      this.isCollapse=!this.isCollapse
    },
    //安全退出
    logout(){
        console.log('logout')
        //删除本地存储中的用户登录信息
        sessionStorage.removeItem('userInfo');
        //重定向到/login登录页面
        this.$router.push("/login")
    }
  },
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  text-align: center;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
  z-index: 1000;
}

.el-aside {
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.lay-title {
  background-color: #444444;
  color: white;
  text-align: center;
  line-height: 60px;
  font-weight: normal;
  letter-spacing: 2px;
  white-space: nowrap;
  overflow: hidden;
}
.el-menu {
  height: calc(100vh - 60px);
}
.el-menu-vertical-demo li {
  text-align: left;
}
.el-menu-item.is-active {
  background: #409eff !important;
  color: #fff;
}
.header-left {
    display: flex;
    align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-breadcrumb{
    font-size: 14px;
    line-height: 1;
}
.el-button--primary{
   margin-right:12px;
}
.el-button.is-circle{
     margin-left:12px;
}
</style>
