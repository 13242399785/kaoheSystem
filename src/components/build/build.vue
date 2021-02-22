<template>
  <div class="build-wapper">
    <!-- <p class="top_title" @click="getTree">选择建筑</p> -->
    <div class="tree_select">
      <span class="posi-serch" @click="search"></span>
      <el-input
    placeholder="输入关键字搜索"
    suffix-icon="el-icon-search"
    v-model="buildSearch">
    
  </el-input>
      <!-- <input type="text" v-model="buildSearch"> -->
      <!-- <div class="tree_select_btn" @click="search">查询</div> -->
    </div>
    <el-tree
      :data="tree"
      :style="'height:'+treeHeight+'px;'"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="subjectId"
      ref="tree"
      highlight-current
      :default-expand-all='true'
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
    >
      <span class="custom-tree-node" slot-scope="{ node}">
        <span class="iconfont" :class="levelIcon(node)"></span>
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>

export default {
  props: ["url"],
  data() {
    return {
      treeHeight: 100,
      buildSearch: null, //查找建筑
      tree: [], //树形图数据
      defaultProps: {
        children: "children",
        label: "subjectName"
      },
      expandArr: []
    };
  },
  created(){
    console.log(this.url)
  },
  mounted() {
    var that = this;
    // that.getHeight();
    // setTimeout(function(){
      that.getTree();
    // },2000)
    // window.onresize = function() {
    //   that.getHeight();
    // };
  },
  methods: {
    getHeight() {
      // 获取窗口高度
      var winHeight;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      this.treeHeight = winHeight - 225;
    },
    search() {
      // 查找数据
      this.$refs.tree.filter(this.buildSearch);
    },
    getTree() {
      const that = this;
      if(this.url=='teaching'){//教学
        this.$api.Teaching.getThree().then(res=>{
            var treeArr = res.data.result;
            that.tree = treeArr;
            var currentId = that.tree[0].subjectId;
            that.$nextTick(function() {
              that.$refs.tree.setCurrentKey(currentId);
            });
            that.emitData(currentId, false);
        }).catch((error) => {
          console.error(error);
        })
      }else if(this.url=='training'){//实训
        this.$api.Training.getThree().then(res=>{
            var treeArr = res.data.result;
            that.tree = treeArr;
            var currentId = that.tree[0].subjectId;
            that.$nextTick(function() {
              that.$refs.tree.setCurrentKey(currentId);
            });
            that.emitData(currentId, false);
        }).catch((error) => {
          console.error(error);
        })
      }else{//竞赛
        this.$api.Competition.getThree().then(res=>{
            var treeArr = res.data.result;
            that.tree = treeArr;
            var currentId = that.tree[0].subjectId;
            that.$nextTick(function() {
              that.$refs.tree.setCurrentKey(currentId);
            });
            that.emitData(currentId, false);
        }).catch((error) => {
          console.error(error);
        })
      }
    },
    levelIcon(node) {
      // 设置节点图标
      console.log(node.level)
      var level = node.level;
      var icon = "icon-room text-green";
      if (level === 1) {
        icon = "icon-city text-purple";
      } else if (level === 2) {
        icon = "icon-city2 text-greenBlue";
      } else if (level == 3) {
        icon = "icon-building text-orange";
      } else if (level == 4) {
        icon = "icon-hotel text-red";
      } else if (level == 5) {
        icon = "icon-build text-blue";
      } else if (level == 6) {
        icon = "icon-home text-green";
      }
      return icon;
    },
    nodeChild1(node){//获取首次查询的节点
      if(node.nodes.length>0){
        return this.nodeChild1(node.nodes[0])
      }else{
        return node.text
      }
    },
    filterNode(value, data) {
      console.log(data)
      // 数据查找结果填充
      if (!value) return true;
      return data.subjectName.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      // 点击节点触发事件，向父组件传递当前选中id
      var isRoom = false;
      if (node.level === 6) {
        isRoom = true;
      }
      this.emitData(this.$refs.tree.getCurrentKey(), isRoom);
    },
    emitData(id, isRoom) {
      this.$emit("buildId", id, isRoom);
    }
  }
};
</script>
<style lang="scss">

.content_left{
  min-width: 250px;
  overflow: auto;
  background: #fff;
  .el-tree{
    // color: #fff;
    font-size: 14px;
    
  }
}
.tree_select{
  position: relative;
  .posi-serch{
    position: absolute;
    right: 0;
    width: 34px;
    height: 34px;
    display: inline-block;
    background: none;
    cursor: pointer;
    z-index: 9;
  }
}
  .el-tree{
    font-size: 16px;
    margin-top: 20px;
    .el-tree-node__content{
      height:30px;
    }
    // .el-tree-node__expand-icon.expanded{
    //   transform:rotate(0deg);
    //   -webkit-transform: rotate(0deg);
    // }
    // .el-icon-caret-right:before{
    //   content: "\E602";
    //   font-size:18px;
    //   // color: #83ace1;
    // }
    // .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
    //   content: "\E63c";
    //   font-size:18px;
    //   // color: #83ace1;
      
    // }
    .el-tree-node__expand-icon.is-leaf:before{
        font-size:18px;
      color: #f970b2;
      content: "\E614";
    }
  }

</style>


