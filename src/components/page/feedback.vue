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
                label="姓名"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="联系方式"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="反馈账户">
              </el-table-column>
              <el-table-column
                prop="namechine"
                align="center"
                label="反馈内容">
              </el-table-column>
              <el-table-column
                prop="nameinst"
                align="center"
                label="反馈时间">
              </el-table-column>
              <el-table-column
                prop="tag"
                align="center"
                label="操作"
                filter-placement="bottom-end">
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
                        date: '王婷',
                        name: '17771440402',
                        address: '17771440402',
                        namechine: '测试意见反馈',
                        nameinst: '2019-10-16 18:44:13',
                        tag: '--',
                    }, {
                        date: '王青江',
                        name: '13127823105',
                        address: '13127823105',
                        namechine: '121121212',
                        nameinst: '2019-10-16 18:09:17',
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
