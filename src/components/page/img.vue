<template>
  <div class="wrapper"  
    element-loading-background="rgba(0, 0, 0, 0.8)"  >
    <div class="wrapper-content">
      <div class="box">
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
                label="名称"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="图片">
              </el-table-column>
              <el-table-column
                prop="namechine"
                align="center"
                label="链接">
              </el-table-column>
              <el-table-column
                prop="tag"
                align="center"
                label="其他操作"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-button type="danger" plain size="mini">修改</el-button>
                </template>
          </el-table-column>
        </el-table>
      </div>
   
      
    </div>  
  </div>

</template>
<script>
export default {
  data() {
    return {
        tableData: [{
                        date: '1',
                        name: '首页顶部图片(1410*76)',
                        address: '暂无数据',
                        namechine: '#',
                        tag: '--',
                    },
                ]
    };
  },
  created() {

  },
  methods: {
    
  }
};
</script>
<style type="text/css" scoped>
    .main-table {
        width: 100%;
        border: 1px solid #000;
    }
    .el-table__body-wrapper {
        overflow: hidden;
        position: relative;
    }
</style>
