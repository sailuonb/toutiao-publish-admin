<template>
  <div class="comment-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>评论管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="commentStyle">
            <el-table
            :data="comments"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="total_comment_count"
                label="总评论数">
            </el-table-column>
            <el-table-column
                prop="fans_comment_count"
                label="粉丝评论数">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    {{scope.row.comment_status ? '正常':'关闭'}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <!-- <el-button :type=" scope.row.comment_status ? 'danger':'success' "
                    @click="scope.row.comment_status = !scope.row.comment_status">{{ scope.row.comment_status ? '关闭评论':'开启评论'}}</el-button> -->
                    <el-switch
                    v-model="scope.row.comment_status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="onchangeCommentStatus(scope.row)"
                    :disabled="scope.row.switchLoading">
                    </el-switch>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
            @current-change="onCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[10,20,50]"
            :page-size.sync='pageSize'
            :current-page.sync='pageId'
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalComments">
            </el-pagination>
        </div>
      </el-card>
  </div>
</template>

<script>
import { getArticles, updataCommentStatus } from '@/api/article.js'
export default {
  name: 'Comment',
  data () {
    return {
      comments: [],
      pageSize: 10,
      pageId: 1,
      totalComments: 0
    }
  },
  created () {
    this.onLoadComments()
  },
  methods: {
    onLoadComments () {
      getArticles({
        response_type: 'comment',
        page: this.pageId,
        per_page: this.pageSize
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        results.forEach(comment => {
          comment.switchLoading = false
        })
        this.comments = results
        this.totalComments = totalCount
      })
    },
    onCurrentChange (page) {
      this.pageId = page
      this.onLoadComments()
    },
    onchangeCommentStatus (article) {
      article.switchLoading = true
      updataCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.switchLoading = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启文章评论成功' : '关闭文章评论成功'
        })
      }).catch(error => {
        console.log(error)
        article.switchLoading = false
      })
    },
    handleSizeChange () {
      this.pageId = 1
      this.onLoadComments()
    }
  }
}
</script>

<style>
.commentStyle{
    padding-bottom: 30px;
}
</style>
