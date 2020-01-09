<template>
  <div>
    <el-dialog
      :title="Config.TitleConfigure+Config.Title"
      :visible.sync="Config.tableShow"
      :before-close="Close"
    >
    <div class="btnbox cf">
      <el-button
        v-for="(item,index) in BottonData"
        v-bind:key="index"
        :type="item.Type"
        @click="BottonClick(item.Onclick)"
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
      >
      <el-table-column v-if='Config.Selection' type="selection" width="40"></el-table-column>
      <template v-for="(item, index) in tableData">
        <el-table-column
          :label="item.Title"
          v-bind:key="index"
          :prop="item.Prop"
          :width="item.Width"
          :sortable="item.Sort===true"
          v-if="item.IsTable && item.Type=='input' || item.IsTable && item.Type=='text' || item.IsTable && item.Type=='date' || item.IsTable && item.Type=='datetime'"
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
          v-if="item.IsTable && item.Type=='select'"
        >
        <template slot-scope="scope" v-if='item.selectArr'>
              <el-tag :type="'primary'" v-if="scope.row[item.Prop]" disable-transitions>{{getSelected(scope.row[item.Prop],item.selectArr,item.sName)}}</el-tag>
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
          <template slot-scope="scope" v-if='item.radioArr'>
              <el-tag v-if="scope.row[item.Prop]" :type="scope.row[item.Prop]==item.TypeSuccess?'success':'primary'" disable-transitions>{{getTag(scope.row[item.Prop],item.radioArr,item.sName)}}</el-tag>
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
              @click="Onclick(item.Onclick,scope.row)"
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
  </el-dialog>

     <a ref='down' href='' download='文件下载' v-show='avshow'></a>
      <el-dialog
        :visible.sync="isShowImageDialog"
        @closed="clearImg"
      >
        <iframe :src="Filesrc" height="500" width="100%"/>
        <!-- <el-carousel indicator-position="outside" height="600px">
        </el-carousel> -->
      </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    Config: Object,
    tableData: Array,
    BottonData: Array,
    tableButton: Array,
    Value: Array,
    Parm: Object,
    Url: String,
    Mod: String
  },
  data() {
    return {
      tabValue:this.Value,
      avshow:false,
      currentPage: 1,
      Scontent:'',
      loading: false,
      multipleSelection: [],
      Filesrc: '',
      isShowImageDialog: false
    };
  },
  watch: {
    tableData(val) {
    },
    immediate:true,
  },
  methods: {
    rload() {
      // if(this.Config.Uid){
      //   this.getData(this,this.Config.Url,this.Config.Uid);
      // }
    },
    Close() {
      this.$emit("FormClose", false);
    },
    clearImg() {
      this.imgs = null
    },
    getValue(val){
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
    Onclick(type,val) {
      // if (type == "handleEdit") {
      //   let TsURL = this.getUrl(this.Config.Url,'query') + `?id=${val.id}`;
      //   this.EditMethod(TsURL,val);
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
      // }
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
      this.axios.get(url, {}).then(res => {
        if (res.data.code == 0) {
          let result = res.data.result;
          if(result.attachs){
             this.isShowImageDialog = true;
             this.Filesrc = this.imgURL +result.attachs[0].filePath;
          }else{
             this.$message.error("您还未上传相关文件");
          }
        }
      });
    },
    EditMethod(url,val) {
      this.axios.get(url, {}).then(res => {
        if (res.data.code == 0) {
          let result = res.data.result;
          this.ruleForm = result;
          this.$emit("FormEdit",result,true);
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
  }
};
</script>