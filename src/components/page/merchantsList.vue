<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <div class="box">
          <div class="box-title">
              <h5>商家列表</h5>
          </div>
          <div class="box-content">
              
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
                    <el-form-item label="工厂或供应商" >
                        <el-select v-model="id" placeholder="请选择">
                                <el-option
                                v-for="item in factory"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                                </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="公司名称">
                       <el-input name="password" v-model="company" autoComplete="on" placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账户">
                       <el-input name="account" v-model="account" autoComplete="on" placeholder="登录账户"></el-input>
                    </el-form-item>
            </el-form>

            
              <div>
                 <el-table id="out-table" 
                  :data="channeList"
                  border
                  style="width: 100% ;overflow:auto" >
                
                  <el-table-column
                    label="商家信息" >
                    <template slot-scope="scope">
                        <p><img class="passagewaylogo" :src="scope.row.log" width="20" height="20">{{scope.row.name}}-{{scope.row.channelParams}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="订单数量">
                    <template slot-scope="scope">
                        <p>￥{{scope.row.singleMinLimit}}~￥{{scope.row.singleMaxLimit}}</p>
                    </template>
                  </el-table-column>
                   <el-table-column
                    label="成交总额(元)">
                    <template slot-scope="scope">
                        <p>￥{{scope.row.everyDayMaxLimit}}</p>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    label="修改限额">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small"  @click="updata(scope.row)" >修改</el-button>
                    </template>
                  </el-table-column>
                   <el-table-column
                    prop="remarks"
                    label="描述">
                  </el-table-column> -->
                    <el-table-column
                    label="账号状态">
                    <template slot-scope="scope">
                        <p  :class="'channelActive'+scope.row.status" class="status" >{{ scope.row.status |channelStatus}}</p>
                    </template>
                  </el-table-column>
                    <el-table-column
                    label="工厂或供应商">
                    <template slot-scope="scope">
                        <p>{{ scope.row.extraFee}}</p>
                    </template>
                  </el-table-column>
                    <el-table-column
                    label="开票账户">
                    <template slot-scope="scope">
                        <p>{{ scope.row.withdrawFee }}</p>
                    </template>
                  </el-table-column>
                    <el-table-column
                      label="变更">
                        <template slot-scope="scope">
                          <el-button size="mini"  @click="updateRate('0',scope.row)">修改</el-button>
                          <el-button size="mini"  @click="updateRate('0',scope.row)">冻结</el-button>
                      </template>
                    </el-table-column> 
             
                </el-table>
              </div>
              <div class="paging">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage3"
                  :page-size="100"
                  layout=" total,prev, pager, next, jumper"
                  :total="10000"
                  background>
                </el-pagination>
              </div>
            
          </div>
      </div>
   
      
    </div>  
  </div>

</template>
<script>

export default {
  data() {
    return {
        value:"",
        id:"",
        options:[
            {
                value:"1",
                label:"正常"
            },
            {
                value:"2",
                label:"冻结"
            },
            {
                value:"3",
                label:"资料不全"
            },
            
        ],
        factory:[
          {title:"工厂",id:"1"},
          {title:"供应商",id:"2"}
        ],
        company:"",
        account:"",
        channeList:[],
        currentPage3: 1,
    }
  },
  created() {
    
  },
  methods:{
    updateRate(){

    },
    handleSizeChange(){
      
    },
    handleCurrentChange(){

    }
  }
 
}
</script>
<style type="text/css" scoped>
.box_select{
    width: 100%;
    display: flex;
    flex-wrap: wrap; 
}
.paging{
  margin-top: 10px;
}
</style>
