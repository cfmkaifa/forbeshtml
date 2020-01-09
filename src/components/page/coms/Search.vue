<template>
  <div>
    <el-form ref="SearchForm" :model="From" :label-width="Config.SearchWidth">
      <template v-for="(item, index) in SearchData">
        <el-form-item class="fl" :label="item.Title" v-bind:key="index" v-if="item.Type=='select' && item.IsSearch">
          <el-select
            v-model="SelectArr[item.Prop]"
            :placeholder="'请选择'+item.Title"
            class="selebox fl"
            value-key="id"
            @change="selevalSel($event,item.Prop)"
          >
            <el-option :label="'全部'" value></el-option>
            <template v-for="(se) in Sdata">
              <el-option :key="se.id" :label="se.name" :value="se"></el-option>
            </template>
          </el-select>
        </el-form-item>

         <el-form-item class="fl" :label="item.Title" v-bind:key="index" v-else-if="item.Type=='radio' && item.IsSearch">
          <el-select
            v-model="radioArr[item.Prop]"
            :placeholder="'请选择'+item.Title"
            class="selebox fl"
            value-key="code"
            @change="radioSel($event,item.Prop)"
          >
            <el-option :label="'全部'" value></el-option>
            <template v-for="(re) in Rdata">
              <el-option :key="re.code" :label="re.name" :value="re"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item class="fl" :label="item.Title" v-bind:key="index" v-else-if="item.Type=='input' && item.IsSearch">
          <el-input v-model="From[item.Prop]" :placeholder="'请输入'+item.Title" class="seachbox"></el-input>
        </el-form-item>

      </template>
      <el-button class="ml10" type="primary" @click="selectName()">查询</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    Config: Object,
    SearchData: Array,
    Parm: Object,
  },
  data() {
    return {
      Sdata:{},
      Rdata:{},
      loading: false,
      From: {},
      SelectArr: {},
      radioArr: {},
    };
  },
  mounted() {
    let obj = {};
    for (let i = 0; i < this.SearchData.length; i++) {
      if (this.SearchData[i].IsSearch == true) {
        obj[this.SearchData[i].Prop] = "";
      }
    }
    this.From = obj;
  },
  methods: {
    rload() {
      let TsURL = this.getUrl(this.Config.Url, "pagelist");
      this.loading = true;
      this.axios.get(TsURL, { params: this.Parm }).then(res => {
        if (res.data.code == 0) {
          this.loading = false;
          let { result } = res.data;
          this.tabValue = result.records;
          this.Parm.total = result.total;
          this.loading = false;
          this.$emit("SearchUpdate",result.records);
        }
      });
    },
    selevalSel(val, selVal) {
      if(val){this.From[selVal] = val.id;}else{this.From[selVal] = ''}
    },
    radioSel(val, selVal) {
      if(val){this.From[selVal] = val.code;}else{this.From[selVal] = ''}
    },
    selectName() {
      for (let i = 0; i < this.SearchData.length; i++) {
        if (this.SearchData[i].IsSearch == true) {
          if(this.SearchData[i].Type == 'input' && this.From[this.SearchData[i].Prop]){
            this.Parm[this.SearchData[i].Prop]=`*${this.From[this.SearchData[i].Prop]}*`
          }else if(this.SearchData[i].Type == 'select'){
            this.Parm[this.SearchData[i].Prop]=`${this.From[this.SearchData[i].Prop]}`
          }else if(this.SearchData[i].Type == 'radio'){
            console.log(this.From[this.SearchData[i].Prop]);
            this.Parm[this.SearchData[i].Prop]=`${this.From[this.SearchData[i].Prop]}`
          }else{
            this.Parm[this.SearchData[i].Prop]=``
          }
        }
      }
      this.rload();
    },
  }
};
</script>