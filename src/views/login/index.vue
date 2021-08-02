<template>
  <div class="login-container">
    <div class="login_logo"></div>
    <el-form ref="login-form" class="login-form" :model="user" :rules="formRules">
        <el-form-item prop="mobile">
            <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
            <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
            <el-checkbox v-model="user.agree">我已阅读并同意协议</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onLogin" class="login-button" :loading="isLoading">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      isLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      this.isLoading = true
      login(this.user).then(res => {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push({
          name: 'home'
        })
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('用户名或密码错误')
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="less">
    .login_logo{
        width: 400px;
        height: 57px;
        background: url("./logo_index.png") no-repeat center;
        background-size: 180px;
        background-color: #fff;
        padding-top: 20px;
    }
    .login-container{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("./login_bg.jpg");
        background-size: cover;
    }
    .login-form{
        background-color: #fff;
        padding: 10px 50px 10px 50px;
        min-width: 300px;
        .login-button{
            width: 100%;
        }
    }
</style>
