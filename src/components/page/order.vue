<template>
  <div class="wrapper"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
          <div class="title1">
            <el-form ref="form" label-width="120px" class="box_select">
                    <el-form-item label="订单状态" >
                         <el-select v-model="value" placeholder="请选择" class="title1-select">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                    </el-form-item> 
                    <el-form-item label="订单号">
                        <el-input v-model="input" placeholder="订单号" class="dingdan"></el-input>
                    </el-form-item> 
                    <el-form-item>
                       <el-button type="success">搜索订单</el-button>
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
                    label="订单号"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品数量"
                    align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    label="买家信息">
                </el-table-column>
                <el-table-column
                    prop="namechine"
                    align="center"
                    label="卖家信息">
                </el-table-column>
                <el-table-column
                    prop="nameinst"
                    align="center"
                    label="订单总额">
                </el-table-column>
                <el-table-column
                    prop="namedate"
                    align="center"
                    label="下单时间">
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
                        date: '2019111549511011',
                        name: '永久阻燃涤纶长丝×1包/160kg(总价:¥5710.40)',
                        address: '上海让雷智能科技有限公司  13372409463',
                        namechine: '上海缔荣纺织品有限公司  13372409463',
                        namedate:'2019-11-15 11:45:05',
                        nameinst: '5710.40元',
                        tag: '已支付',
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
