<template>
  <div class="publish-container">
      <el-card class="box-card">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <el-card class="box-card">
        <el-form ref="rules-form" :model="article" label-width="60px" :rules="rulesForm">
          <el-form-item label="标题" prop="title">
              <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="350"
            placeholder="请输入文章内容"
            lang="zh"
            ></el-tiptap>
              <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <template v-if="article.cover.type > 0">
              <div class="pub-img">
                <!-- <publish-image
                v-for="(pimage,index) in article.cover.type"
                :key="index"
                @update-cover="onupdatecover(index,$event)"
                :cover-image="article.cover.images[index]"
                > -->
                <publish-image
                v-for="(pimage,index) in article.cover.type"
                :key="index"
                v-model="article.cover.images[index]"
                >
                </publish-image>
              </div>
            </template>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select  placeholder="请选择频道" v-model="article.channel_id">
              <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onPublish(false)">发表</el-button>
              <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import publishImage from './components/publishImage.vue'
import { getArticleChannels, addArticle, getArticle, updataArticle } from '@/api/article.js'
import { uploadImage } from '@/api/image.js'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
export default {
  name: 'Publish',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ],
      rulesForm: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }
        ]
      }
    }
  },
  methods: {
    onPublish (draft = false) {
      this.$refs['rules-form'].validate(valid => {
        if (!valid) {
        } else {
          if (this.$route.query.id) {
            updataArticle(this.$route.query.id, this.article, draft).then(res => {
              this.$message({
                message: `${draft ? '存入草稿' : '发布'}成功`,
                type: 'success'
              })
              // 跳转到内容管理页面
              this.$router.push('/article')
            })
          } else {
            addArticle(this.article, draft).then(res => {
              this.$message({
                message: `${draft ? '存入草稿' : '发布'}成功`,
                type: 'success'
              })
              // 跳转到内容管理页面
              this.$router.push('/article')
            })
          }
        }
      })
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    },
    onupdatecover (index, url) {
      this.article.cover.images[index] = url
    }
  },
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  components: {
    'el-tiptap': ElementTiptap,
    'publish-image': publishImage
  }
}
</script>

<style lang="less">
  .pub-img{
    display: flex;
    justify-content: flex-start;
  }
</style>
