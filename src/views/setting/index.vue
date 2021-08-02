<template>
  <div class="setting-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="text item">
            <el-row>
                <el-col :span='12'>
                    <el-form :model="user" label-width="80px" :rules="formRules" ref="user-changeform">
                        <el-form-item label="编号">
                            {{user.id}}
                        </el-form-item>
                        <el-form-item label="手机">
                            {{user.mobile}}
                        </el-form-item>
                        <el-form-item label="用户名称" prop="name">
                            <el-input size="large" v-model="user.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户介绍" prop="intro">
                            <el-input type="textarea" v-model="user.intro"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="user.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onChangeUser" :loading="changeUserLoading">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :offset="2" :span="4">
                    <label for="file">
                        <el-avatar shape="square" :size="200" fit="cover" :src="user.photo"></el-avatar>
                    </label>
                    <p>点击修改头像</p>
                    <input type="file" hidden ref="file" id="file" @change="onFileChange">
                </el-col>
            </el-row>
        </div>
      </el-card>
      <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible"
        append-to-body
        @opened="onOpenDig"
        @closed="onCloseDig"
        width="30%">
        <div class="image-wrap">
          <img :src="previewImage" class="image-crop" ref="preview-image">
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updataImage" :loading="photoLoading">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import globalBus from '@/utils/global-bus.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { getUserProfile, updataUserPhoto, updataUserProfile } from '@/api/user.js'
export default {
  name: 'Setting',
  data () {
    return {
      user: {},
      dialogVisible: false,
      previewImage: '',
      cropper: null,
      photoLoading: false,
      changeUserLoading: false,
      formRules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入用户介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      this.$refs.file.value = ''
      this.dialogVisible = true
    },
    onOpenDig () {
      const image = this.$refs['preview-image']
      // if (this.cropper) {
      //   this.cropper.replace(this.previewImage)
      //   return
      // }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false
      })
    },
    onCloseDig () {
      this.cropper.destroy()
    },
    updataImage () {
      this.photoLoading = true
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updataUserPhoto(fd).then(res => {
          this.user.photo = res.data.data.photo
          this.dialogVisible = false
          this.loadUserInfo()
          this.photoLoading = true
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          globalBus.$emit('userfile', this.user)
        }).catch(err => {
          this.photoLoading = true
          this.$message({
            type: 'danger',
            message: '更新失败'
          })
          throw err
        })
      })
    },
    onChangeUser () {
      this.$refs['user-changeform'].validate(valid => {
        if (!valid) {
          return
        }
        this.changeUserLoading = true
        const { name, intro, email } = this.user
        updataUserProfile({
          name,
          intro,
          email
        }).then(res => {
          this.changeUserLoading = false
          globalBus.$emit('userfile', this.user)
          this.loadUserInfo()
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        }).catch(err => {
          this.$message({
            type: 'danger',
            message: '更新失败'
          })
          this.changeUserLoading = false
          throw err
        })
      })
    }
  }
}
</script>

<style lang="less">
.image-wrap{
  .image-crop{
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
