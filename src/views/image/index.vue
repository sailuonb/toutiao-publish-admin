<template>
  <div class="image-container">
      <el-card>
          <div slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>素材管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="action-head">
            <el-radio-group v-model="collect"  size="mini" @change="onImageChange">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button size="mini" type="success" @click="isShow = true">上传素材</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(image,index) in images" :key="index" class="updownImage">
                <el-image
                    style="width: 200px; height: 150px"
                    :src="image.url"
                    fit="cover">
                </el-image>
                <div class="hidden">
                  <div class="floatImage">
                    <el-button type="warning"
                      :icon="image.is_collected ? 'el-icon-star-on': 'el-icon-star-off' "
                      circle @click="oncollectImage(image)"
                      size="small"
                      :loading="image.loading"></el-button>
                    <!-- <i :class="{
                      'el-icon-star-on': image.is_collected,
                      'el-icon-star-off': !image.is_collected
                    }" @click="oncollectImage(image)"></i> -->
                    <!-- <i class="el-icon-delete-solid"></i> -->
                    <el-button
                    type="danger"
                    icon="el-icon-delete-solid"
                    circle
                    size="small"
                    @click="ondeleteImage(image.id)"></el-button>
                  </div>
                </div>
            </el-col>
          </el-row>
          <el-pagination
            layout="prev, pager, next"
            background
            :current-page.sync="pageId"
            :total="totalCount"
            :page-sizes="pageSize"
            @current-change="onCurrentChange">
          </el-pagination>
      </el-card>
      <el-dialog title="上传素材" :visible.sync="isShow" :append-to-body="true" width="400px">
        <el-upload
            v-if="isShow"
            class="upload-demo"
            drag
            action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
            multiple
            name="image"
            :headers = "uploadHeader"
            :on-success="onUploadSuccess"
            >
            <!-- :show-file-list="false"  上面标签的可替换的属性-->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image.js'
export default {
  name: 'ImageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      isShow: false,
      totalCount: 0,
      pageSize: [10],
      pageId: 1,
      uploadHeader: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  created () {
    this.loadImages(1)
  },
  methods: {
    loadImages (page) {
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize[0]
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        results.forEach(image => {
          image.loading = false
        })
        this.images = results
        this.totalCount = totalCount
      })
    },
    onImageChange (value) {
      this.pageId = 1
      this.loadImages(1)
    },
    onUploadSuccess () {
      this.isShow = false
      this.loadImages(1)
    },
    onCurrentChange (page) {
      this.loadImages(page)
      this.pageId = page
    },
    oncollectImage (image) {
      image.loading = true
      collectImage(image.id, !image.is_collected).then(res => {
        image.loading = false
        image.is_collected = !image.is_collected
        this.loadImages(this.pageId)
      })
    },
    ondeleteImage (imageId) {
      this.$confirm('是否删除此素材', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImage(imageId).then(res => {
          this.loadImages(this.pageId)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>

<style>
.action-head{
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
}
.updownImage{
    position: relative;
}
.hidden{
    display: none;
    left: 10px;
    bottom: 3px;
    width:200px;
    height: 40px;
    position: absolute;
    background-color: rgba(204,204,204,.5);
}
.floatImage{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 30px;
}
.updownImage:hover .hidden{
  display: block;
}
</style>
