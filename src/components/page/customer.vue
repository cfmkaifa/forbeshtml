<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="mian">
              <el-form ref="form" label-width="120px" class="box_select">
                    <el-form-item label="账号状态" >
                        <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="公司名称">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-form-item> 
                    <el-form-item label="客户账号">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-form-item> 
                    <el-form-item>
                       <el-button type="success">搜索</el-button>
                    </el-form-item>
            </el-form>
          </div>
          <div class="table">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="ID"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="新闻分类"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    label="新闻来源">
                </el-table-column>
                <el-table-column
                    prop="namechine"
                    align="center"
                    label="新闻标题">
                </el-table-column>
                <el-table-column
                    prop="nameinst"
                    align="center"
                    label="添加时间">
                </el-table-column>
                <el-table-column
                    prop="tag"
                    align="center"
                    label="状态"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.tag === '已启用' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
                    </template>>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作" >
              <template slot-scope="scope">
                <el-button type="danger" plain size="mini">冻结</el-button>
              </template>
            </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
             </el-pagination>
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
                        date: '1',
                        name: '热点关注',
                        address: '370*280',
                        tag: '已启用',
                        namechine: '福布公告',
                        nameinst: 'FUBU Notice',
                    }, {
                        date: '2',
                        name: '暂无图片',
                        address: '370*280',
                        namechine: '福布公告',
                        nameinst: 'FUBU Notice',
                    }, {
                        date: '3',
                        name: '暂无图片',
                        address: '370*280',
                        namechine: '福布公告',
                        nameinst: 'FUBU Notice',
                    }, {
                        date: '4',
                        name: '暂无图片',
                        address: '370*280',
                        namechine: '福布公告',
                        nameinst: 'FUBU Notice',
                    }, {
                        date: '5',
                        name: '暂无图片',
                        address: '370*280',
                        namechine: '福布公告',
                        nameinst: 'FUBU Notice',
                    },
                    {
                        date: '6',
                        name: '暂无图片',
                        address: '370*280',
                        namechine: '福布公告',
                        nameinst: 'FUBU Notice',
                    }
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
    .box_select{
        display: flex;
        justify-content: flex-start
    }   
    .el-input>>> input {
        width: 198px;
    }
    .title1 {
        width: 300px;
        margin-top: 15px;
    }
    .title1-select {
        width: 100%;
    }
    .title2 {
        margin-top: 15px;
        width: 300px;
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
