<template>
  <div class="publishImage-container">
      <div class="publish-image">
          <img :src="value" class="imgpub" @click="onpublishImage" ref="show-image">
      </div>
      <el-dialog
        title="选择封面"
        :visible.sync="dialogVisible"
        append-to-body
        @opened="ondlgopen">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="first">
              <el-radio-group v-model="collect" size="mini" style="padding-bottom: 20px;" @change="onImageChange">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <el-row :gutter="20">
                <el-col :lg="6" :md="8" :sm="12" v-for="(image, index) in images" :key="index" class="image-item" @click.native="selectedIndex = index">
                  <el-image
                    style="width: 150px; height: 120px;"
                    :src="image.url"
                    fit="fill">
                  </el-image>
                  <div class="selected"
                  v-if="selectedIndex === index"></div>
                </el-col>
              </el-row>
              <el-pagination
                :page-size="this.pageSize"
                layout="prev, pager, next"
                :total="this.totalCount"
                :current-page.sync="pageId"
                @current-change="oncurChange">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="second">
              <input type="file" ref="file" @change="onFileChange" id="file">
              <img src="" alt="" ref="pre-view" style="width: 150px; height: 150px; ">
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getImages, uploadImage } from '@/api/image.js'
export default {
  name: 'publishImage',
  // props: ['cover-image'],
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      collect: false,
      images: [],
      pageSize: 10,
      pageId: 1,
      totalCount: 0,
      selectedIndex: null
    }
  },
  methods: {
    onpublishImage () {
      this.dialogVisible = true
    },
    ondlgopen () {
      getImages({
        collect: this.collect,
        page: this.pageId,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onImageChange () {
      this.pageId = 1
      this.selectedIndex = null
      this.ondlgopen()
    },
    oncurChange (page) {
      this.pageId = page
      this.ondlgopen()
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['pre-view'].src = blob
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择图片')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.dialogVisible = false
          this.$emit('input', res.data.data.url)
          // this.$emit('update-cover', res.data.data.url)
          // this.$refs['show-image'].src = res.data.data.url
        })
      } else if (this.activeName === 'first') {
        if (this.selectedIndex === null) {
          this.$message('请选择素材图片')
          return
        }
        this.dialogVisible = false
        this.$emit('input', this.images[this.selectedIndex].url)
      }
    }
  }
}
</script>

<style lang="less">
    .publish-image{
    width: 150px;
    height: 120px;
        .imgpub{
            height: 120px;
            min-width: 100%;
        }
    }
    .image-item {
      position: relative;
    }
    .selected{
      position: absolute;
      top: 15px;
      left: 30px;
      width: 100px;
      height: 100px;
      background: url('./selected.png') no-repeat;
      background-size: cover;
      opacity: 0.5;
    }
</style>
