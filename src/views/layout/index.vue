<template>
  <!-- <div class="layout-container">
    <div>顶部导航栏</div>
    <div>侧边导航栏</div>
    <router-view></router-view>
  </div> -->
  <el-container class="layout-container">
    <el-aside width="auto" class="aside">
      <app-aside class="aside-menu" :is-collapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold': !isCollapse,
              'el-icon-s-unfold': isCollapse
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>仿今日头条后台管理系统</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="onSetting">账号设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import globalBus from '@/utils/global-bus.js'
import AppAside from './components/aside.vue'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  components: {
    AppAside
  },
  created () {
    this.loadProfile()
    globalBus.$on('userfile', data => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    loadProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onSetting () {
      this.$router.push('/setting')
    },
    onLogout () {
      this.$confirm('是否退出当前账号', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="less">
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside{
  .aside-menu{
    height: 100%;
  }
}
.header{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap{
  display: flex;
  align-items: center;
  .avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    }
  }

}
.main{
  background-color: rgb(103, 255, 255);
}
</style>
