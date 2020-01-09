<template>
  <div>
    <div class="btnbox cf">
      <el-button
        v-for="(item,index) in BottonData"
        v-bind:key="index"
        :type="item.Type"
        @click="BottonClick(item.Onclick)"
        v-show="bottonPower[item.Onclick]"
      >
        <i :class="item.icon"></i>
        {{item.Title}}
      </el-button>
    </div>

    <div class="tabbox">
      <el-table
        v-if="Config"
        ref="multipleTable"
        :size="Config.Size"
        :height="Config.Height"
        :data="getValue(tabValue)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        border
        :header-cell-style="Config.headerStyle"
        @cell-dblclick="openDetails"
      >
      <el-table-column v-if='Config.Selection' type="selection" width="40"></el-table-column>
      <template v-for="(item, index) in tableData">
        <el-table-column
          :label="item.Title"
          v-bind:key="index"
          :prop="item.Prop"
          :width="item.Width"
          :sortable="item.Sort===true"
          v-if="item.IsTable && item.Type=='input' || item.IsTable && item.Type=='number' || item.IsTable && item.Type=='text' || item.IsTable && item.Type=='date' || item.IsTable && item.Type=='datetime' || item.IsTable && item.Type=='surplus'"
        >
          <template slot-scope="scope">
            <div v-if='item.Unit'>
            <span>{{scope.row[item.Prop]}}</span><span>{{item.Unit}}</span>
            </div>
             <div v-else>
              {{scope.row[item.Prop]}}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :label="item.Title"
          v-bind:key="index"
          :prop="item.Prop"
          :width="item.Width"
          :sortable="item.Sort===true"
          v-if="item.IsTable && item.Type=='select' || item.IsTable && item.Type=='selectsearch'"
        >
        <template slot-scope="scope" v-if='item.selectArr'>
              <el-tag :type="'primary'" v-if="scope.row[item.Prop] && item.SaveName" disable-transitions>{{scope.row[item.Prop]}}</el-tag>
              <el-tag :type="'primary'" v-else-if="scope.row[item.Prop]" disable-transitions>{{getSelected(scope.row[item.Prop],item.selectArr,item.sName)}}</el-tag>
        </template>
      </el-table-column>
        <el-table-column
                :label="item.Title"
                v-bind:key="index"
                :prop="item.Prop"
                :width="item.Width"
                :sortable="item.Sort===true"
                v-if="item.IsTable && item.Type=='progress'"
              >
              <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row[item.Prop]?scope.row[item.Prop]:0" status="success"></el-progress>
             </template>
        </el-table-column>
        <el-table-column
          :label="item.Title"
          v-bind:key="index"
          :prop="item.Prop"
          :width="item.Width"
          :sortable="item.Sort===true"
          v-else-if="item.IsTable && item.Type=='radio'"
        >
          <template slot-scope="scope" v-if='item.radioArr '>
              <el-tag v-if="scope.row[item.Prop] && item.ColorTag" :color="item.ColorTag[scope.row[item.Prop]]" style='color:#fff' disable-transitions>{{getTag(scope.row[item.Prop],item.radioArr,item.sName)}}</el-tag>
              <el-tag v-else-if="scope.row[item.Prop]" :type="scope.row[item.Prop]==item.TypeSuccess?'success':'primary'" disable-transitions>{{getTag(scope.row[item.Prop],item.radioArr,item.sName)}}</el-tag>
          </template>
        </el-table-column>
      </template>
        <el-table-column label="操作" :width="Config.ButtonWidth" fixed="right" v-if="Config.ButtonWidth>0" >
          <template slot-scope="scope">
            <el-button
              v-for="(item,index) in tableButton"
              v-bind:key="index"
              :size="item.Size"
              :type="item.Type"
              @click="Onclick(item.Onclick,scope.row,item.OnclickItem)"
              :disabled="OnStatusDisplay(item.StatusDisplay,scope.row,item.StatusNum,item.Smethod)"
              v-show="getBottonPower(item.Onclick,item.OnclickItem)"
            >{{item.Title}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tr mt10">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total,sizes, prev, pager, next"
        :total="Parm.total"
      ></el-pagination>
    </div>
     <a ref='down' href='' download='文件下载' v-show='avshow'></a>
    
      <el-dialog
        :visible.sync="isShowImageDialogPDF"
        @closed="clearImg"
        class='mainpdf'
      >
          <pdf 
            class='pdf'
            :src="Filesrc" 
            :page="currentPage"
            @num-pages="pageCount=$event" 
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler"
            v-loading="pdfloading"
            >
          </pdf>
           <div slot="footer" class="dialog-footer">
            <el-button @click="changePdfPage(0)" :class="{grey: currentPage==1}" >上一页</el-button>
             <span class='pageCount' v-if='pageCount'>{{currentPage}} / {{pageCount}}</span>
            <el-button type="primary" @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</el-button>
          </div>
      </el-dialog>
      
      <el-dialog
        :visible.sync="isShowImageDialog"
        @closed="clearImg"
      >
        <img :src="Filesrc" height="700" width="100%"  >
      </el-dialog>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  props: {
    Config: Object,
    tableData: Array,
    BottonData: Array,
    tableButton: Array,
    Value: Array,
    Parm: Object,
    Url: String,
    Mod: String,
  },
  data() {
    return {
      tabValue:this.Value,
      avshow:false,
      currentPage:'',
      Scontent:'',
      loading: false,
      pdfloading: true,
      multipleSelection: [],
      Filesrc: '',
      isShowImageDialog: false,
      isShowImageDialogPDF: false,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      suffix:'',
      bottonPower:{
        addTab:false,
        handleEdit:false,
        handleDelete:false,
        handleDeleteAll:false,
        handleExamine:false,
        addEquiAll:false,
        handleDown:false,
        handlePreview:false,
        handleAdd:false,
        GetFormVisibleTwo:false,
        GetFormEditTwo:false,
        GetFormVisOne:false,
        GetFormVisTwo:false,
        GetFormVisThree:false,
        GetFormVisFour:false,
        GetFormRelease:false,
      }
    };
  },
  // watch: {
  //   tabValue(val) {
  //     console.log(val);
  //   },
  //   immediate:true,
  // },
  created() {
    this.btnPerms(); //加载按钮权限
  },
  mounted() {
    this.rload();
  },
  methods: {
    rload() {
      // if(this.Config.Uid){
      //   this.getData(this,this.Config.Url,this.Config.Uid);
      // }else{
      //   this.getData(this,this.Config.Url);
      // }
    },
    clearImg() {
      this.imgs = null
    },
    getValue(val){
      // console.log(val);
      this.$emit("getTableValue", val);
      return val;
    },
    getSelected(val,arr,sName) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == val  && sName) {
          return arr[i][sName];
        }else if(arr[i].id == val){
          return arr[i].name;
        }
      }
    },
    getTag(val,arr,sName) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].code == val  && sName) {
          return arr[i][sName];
        }else if(arr[i].code == val){
          return arr[i].name;
        }
      }
    },
    BottonClick(val) {
      // if (val == "addTab") {
      //   this.$emit('GetFormVisible',true)
      // } else if(val == "handleDeleteAll") {
      //   let TsURL = this.getUrl(this.Config.Url,"delall");
      //   this.delall(TsURL);
      // }  else if(val == "addEquiAll") {
      //   this.$emit('addEquiAll',true)
      // }
    },
    openDetails(row){
      // let TsURL = this.getUrl(this.Config.Url,'query') + `?id=${row.id}`;
      // if(this.Config.dblclick){}else{this.EditMethod(TsURL,row,false);}
    },
    Onclick(type,val,item) {
      // if (type == "handleEdit") {
      //   if(item){
      //        this.$emit(item,true,val)
      //   }else{
      //       let TsURL = this.getUrl(this.Config.Url,'query') + `?id=${val.id}`;
      //       this.EditMethod(TsURL,val,true);
      //   }
      // } else if(type == "handleDelete") {
      //   let TsURL = this.getUrl(this.Config.Url,"del");
      //   this.deletes(TsURL,val);
      // } else if(type == "handleExamine"){
      //   let TsURL = this.getUrl(this.Config.Url,'query') + `?id=${val.id}`;
      //   this.EditExamine(TsURL,val);
      // } else if(type == "handleDown"){
      //   let TsURL = this.getUrl(this.Config.Url,'query') + `?id=${val.id}`;
      //   this.handleDown(TsURL);
      // }else if(type == "handlePreview"){
      //   let TsURL = this.getUrl(this.Config.Url,'query') + `?id=${val.id}`;
      //   this.handlePreview(TsURL);
      // }else if (type == "handleAdd") { 
      //   this.$emit(item,true,val)
      // }
    },
    OnStatusDisplay(type,val,num,mod) {
      if(type){
         if(!mod){
            if(parseInt(val[type]) == parseInt(num)) {
                return true;
            }else{
                return false;
            }
         }else{
            if( mod == 'Eqy'){
              if(parseInt(val[type])>=parseInt(num)) {
                  return true;
              }else{
                  return false;
              }
            }
         }
      }else{
        return false;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.Parm.pageSize = val;
      this.rload();
    },
    handleCurrentChange(val) {
      this.Parm.pageNo = val;
      this.rload();
    },
    handleDown(url){
      this.axios.get(url, {}).then(res => {
        if (res.data.code == 0) {
          let result = res.data.result;
          if(result.attachs){
             let fileUrl = this.downloadURL +result.attachs[0].filePath +'&cnName='+result.attachs[0].cnName;
             this.$refs.down.href = fileUrl;
             this.$refs.down.download  = result.attachs[0].filePath;
             this.$refs.down.click();
          }else{
             this.$message.error("您还未上传相关文件");
          }
        }
      });
    },
    handlePreview(url){
      this.Filesrc = '';
      this.axios.get(url, {}).then(res => {
        if (res.data.code == 0) {
          let result = res.data.result;
          if(result.attachs){
             this.Filesrc = this.imgURL + result.attachs[0].filePath;
             if(result.attachs[0].suffix == '.pdf'){
               this.isShowImageDialogPDF = true;
             }else{
               this.isShowImageDialog = true;
             }
          }else{
             this.$message.error("您还未上传相关文件");
          }
        }
      });
    },
    EditMethod(url,val,bshow) {
      this.axios.get(url, {}).then(res => {
        if (res.data.code == 0) {
          let result = res.data.result;
          this.ruleForm = result;
          this.$emit("FormEdit",result,true,bshow);
        }
      });
    },
    EditExamine(url,val) {
      this.axios.get(url, {}).then(res => {
        if (res.data.code == 0) {
          let result = res.data.result;
          this.ruleForm = result;
          this.$emit("DisplayFormEdit",result,true);
        }
      });
    },
    getBottonPower(val,cVal){
        if(cVal){
          // console.log(cVal);
          return this.bottonPower[cVal];
        }else{
          return this.bottonPower[val];
        }
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
        }
    },
    // pdf加载时
    loadPdfHandler (e) {
      this.currentPage = 1 // 加载的时候先加载第一页
      this.pdfloading=false;
    },
    btnPerms() {
      let path = this.$route.path
      var index = path.lastIndexOf("\/");  
      path  = '/'+path.substring(index + 1, path.length);
      this.axios.get('/sys/permission/query-by-user',{}).then(res => {//查询
        if (res.data.code == 200) {
          let result = res.data.result;
          for(let a=0;a<result.length;a++){
            let children = result[a].children;
            if(children){
                children.forEach((item,index,array)=>{
                    switch(item.path) {
                        case path://类型
                        let url = `/sys/permission/query-button-by-user?permissionId=${item.id}`;
                        this.axios.get(url, {}).then(res => {//查询按钮
                          if (res.data.code == 200) {
                              let results = res.data.result;
                              for(let i=0;i<results.length;i++){
                                if(this.bottonPower.hasOwnProperty(results[i].redirect)){
                                      this.bottonPower[results[i].redirect]=results[i].alwaysShow;
                                }
                              }
                          }
                        });
                    break;
                  }
              });
            }
          }
        } else {    
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>
<style>
.pdf{
  position:relative;width: 100%;margin:0 auto;
}
.pageCount{
  padding:0 10px;
}
.el-progress-bar__innerText{
  color:#114a73;
}
</style>