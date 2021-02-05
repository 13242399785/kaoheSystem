<template>
  <div class="page-control clearfix">
    <el-pagination
      @current-change="handleCurrent"
      prev-text='上一页'
      next-text='下一页'
      :current-page="page0"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      page0:1
    }
  },
  methods:{
    handleCurrent(){
      // this.$emit('hand',this.pageSize)
    }
  },
  props:{
    "total":Number,
    "pageSize":Number,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.page-control{text-align: center;margin: 50px 0 70px 0;}
  .page-control .el-pager li.active{background: #f2914a;color: #fff;}
  .page-control .el-pagination--small .btn-next, .el-pagination--small .btn-prev{
    background: #004098;
    color: #fff;
  }
  .page-control .el-pagination button:disabled{background: #d2d2d2;color: #fff;}
  .page-control .btn-prev{margin-right: 10px;}
  .page-control .btn-next{margin-left: 10px;}
</style>
