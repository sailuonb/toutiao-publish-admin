<template>
  <div class="fans-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="text item">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="first">
                    <el-row :gutter="20">
                        <el-col :xl="2" :lg="4" :md="6" :sm="8" >
                            <div class="fansList">
                                <img src="http://toutiao-img.itheima.net/FnTkOoeCCdQhd5KfDtJXddtHGrft" class="fansImage">
                                <p>夏洛特</p>
                                <el-button size="small">+关注</el-button>
                            </div>
                        </el-col>
                        <el-col :xl="2" :lg="4" :md="6" :sm="8" v-for="(fan,index) in fans" :key="index">
                            <div class="fansList">
                                <img :src="fan.photo" class="fansImage">
                                <p>{{fan.name}}</p>
                                <el-button size="small">+关注</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="second">
                    <div ref="main" style="width: 600px;height:400px;"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
      </el-card>
  </div>
</template>

<script>
import { getFansInfo } from '@/api/fans.js'
const echarts = require('echarts')
export default {
  name: 'Fans',
  data () {
    return {
      activeName: 'first',
      fans: []
    }
  },
  created () {
    this.loadFansinfo()
  },
  mounted () {
    var myChart = echarts.init(this.$refs.main)
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    myChart.setOption(option)
  },
  methods: {
    loadFansinfo () {
      getFansInfo().then(res => {
        this.fans = res.data.data.results
      })
    }
  }
}
</script>

<style lang="less">
.fansList{
    height: 200px;
    border: 0.5px solid rgba(204, 204, 204, 0.719);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .fansImage{
        widows: 80px;
        height: 80px;
        border-radius: 50%;
    }
}
</style>
