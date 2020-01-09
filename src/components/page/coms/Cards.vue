<template>
  <div>
    <el-row :gutter="Config.gutter" :style="Config.style" >
      <el-col :span="item.Colspan" v-for="(item,index) in CardsData" v-bind:key="index" >
          <el-card shadow="hover" :style='item.Style' @click.native="topage(item.GoUrl)">
              <p>
              <i-count-up
                      class="font-UnidreamLED f8"
                      :startValue="0"
                      :endValue="item.Num1"
                      :decimals="0"
                      :duration="2"
                      :options="options"
              ></i-count-up>
              <span class='font-UnidreamLED f8'>/</span>
              <i-count-up
                      class="font-UnidreamLED f8"
                      :startValue="0"
                      :endValue="item.Num2"
                      :decimals="0"
                      :duration="2"
                      :options="options"
              ></i-count-up>
              </p>
              <p class='font-UnidreamLED'>{{item.Sub}}</p>
          </el-card>
      </el-col>
    </el-row>
</div>
</template>
<script>
import ICountUp from "vue-countupjs";
export default {
  components: {
    ICountUp
  },
  props: {
    Config: Object,
    CardsData: Array,
  },
  data() {
    return {
       options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        },
    };
  },
  methods: {
    topage(url){
      if(url){
         this.$router.push({path:url});
      }
    }
  }
};
</script>