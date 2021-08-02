<template>
  <div class="article-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" label-width="40px" size="small">
            <el-form-item label="状态">
                <el-radio-group v-model="status">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
                <el-radio :label="4">已删除</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select v-model="channelId" placeholder="请选择频道">
                  <el-option label="全部" :value="null"></el-option>
                  <el-option :label="channel.name" :value="channel.id" v-for=" (channel, index) in channels" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker
                    v-model="rangeDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loadArticles(1)" :disabled="loading">查询</el-button>
            </el-form-item>
        </el-form>
      </el-card>
      <el-card class="filter-card">
        <div slot="header" class="clearfix">
            <span>共检索到{{totalCount}}条数据</span>
        </div>
        <el-table
        :data="articles"
        style="width: 100%"
        stripe
        size="small"
        class="list-table"
        v-loading="loading">
        <el-table-column
            label="封面">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="cover"
                lazy>
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
              <!-- <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" class="article-cover">
              <img v-else src="./no-cover.gif" class="article-cover"> -->
            </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题">
        </el-table-column>
        <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="articlesStatus[scope.row.status].type">{{ articlesStatus[scope.row.status].text }}</el-tag>
                <!-- <el-tag type="warning" v-if="scope.row.status === 0">草稿</el-tag>
                <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
                <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
                <el-tag type="info" v-else-if="scope.row.status === 3">审核失败</el-tag>
                <el-tag type="danger" v-else-if="scope.row.status === 4">已删除</el-tag> -->
            </template>
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布时间">
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="$router.push('/publish?id=' + scope.row.id.toString())"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="ondeleteArticle(scope.row.id)"></el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-sizes="pageSize"
        :disabled="loading">
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article.js'
export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      totalCount: 0,
      pageSize: [10],
      status: null,
      channels: [],
      channelId: null,
      rangeDate: null,
      loading: true,
      pageId: 1,
      articlesStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ]
    }
  },
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize[0],
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    ondeleteArticle (articelId) {
      this.$confirm('是否删除当前文章', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articelId).then(res => {
          this.onCurrentChange(this.pageId)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
      this.pageId = page
    }
  }
}
</script>

<style>
.filter-card{
    margin-top: 30px;
}
.list-table{
    margin-bottom: 20px;
}
.article-cover{
  width: 100px;
  background-size: cover;
}
</style>
