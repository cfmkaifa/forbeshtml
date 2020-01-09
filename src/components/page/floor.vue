<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="title1">
            <el-form ref="form" label-width="120px" class="box_select">
                    <el-form-item label="首页导航管理：" >
                         <el-select v-model="value" placeholder="首页导航管理" class="title1-select">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                    </el-form-item> 
                    <el-form-item>
                       <el-button type="success" icon="el-icon-circle-plus-outline">添加楼层</el-button>
                    </el-form-item>
            </el-form>
          </div>
          <div class="table">
              
          </div>
      </div>
      
    </div>  
  </div>

</template>
<script>
export default {
  data() {
    return {
      options: [{
          value: '选项1',
          label: '测试数据一'
        }, {
          value: '选项2',
          label: '测试数据一'
        }, {
          value: '选项3',
          label: '测试数据一'
        }, {
          value: '选项4',
          label: '测试数据一'
        }, {
          value: '选项5',
          label: '测试数据一'
        }],
        value: '',
        input:'',
        // 表格
         tableData: [{
                date: '化纤',
                name: '竹纤维',
                tag: '已启用',
            }, 
        ],
    };

  },
  created() {

  },
  components: {
    // 'editor': Editor
  },
  mounted(){
       // 页面加载的时候初始化组件
    // tinymce.init({})
  },
  methods: {
    
  }
};
</script>
<style type="text/css" scoped>
    .title1 {
        margin-top: 15px;
    }
    .title1-select {
        width: 180px;
    }
    .dingdan {
      width: 180px;
    }
    .box_select {
      width: 180px;
      display: flex;
    }
    .add {
        width: 100%;
        height: 43px;
        background-color: #F5FAFE;
        margin-top: 30px;
        display: flex;
        flex-direction: row-reverse;
    }
    .table {
        width: 100%;
        margin-top: 15px;
    }
    .pagination {
        width: 100%;
        margin-top: 15px;
        display: flex;
        /* flex-direction: row-reverse; */
    }
</style>
