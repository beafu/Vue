<template>
  <div class="bar">
    <el-card width="100%">
      <v-chart :options="baropation" class="zhu" />
    </el-card>
    <el-card>
      <v-chart :options="shanoption" class="zhu" />
    </el-card>
    <el-card>
      <v-chart :options="lineoptions" class="zhu" />
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import ECharts from "vue-echarts";
// 按需导入绘制对应图表的工具包
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
// 导入提示工具包
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
export default {
  name: "bar",
  data() {
    return {
      echarList: {},
      xData: [],
      yData: [],
      zData:[{value:"",name:""}],
      baropation: {
        title: {
          text: "月度销售业绩统计柱状图",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "销量",
            type: "bar", // 指定图表的形状
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(220, 220, 220, 0.8)"
            // }
          },
        ],
      },
      shanoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "一月" },
              { value: 310, name: "二月" },
              { value: 234, name: "三月" },
              { value: 135, name: "四月" },
              { value: 1548, name: "五月" },
              { value: 335, name: "六月" },
              { value: 310, name: "七月" },
              { value: 234, name: "八月" },
              { value: 135, name: "九月" },
              { value: 1548, name: "十月" },
              { value: 335, name: "十一月" },
              { value: 310, name: "十二月" },
            ],
          },
        ],
      },
      lineoptions: {
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            areaStyle: {},
          },
        ],
      },
    };
  },
  components: {
    "v-chart": ECharts,
  },
  created() {
    this.getcharList();
  },
  methods: {
    async getcharList() {
      const res = await this.$http.get("/api/charts");
      if (res) {
        this.echarList = res.list;

        this.echarList.forEach((element) => {
          this.xData.push(element.month + "月");

          this.yData.push(element.total);
        });
      }
      this.baropation = Object.assign(this.baropation, {
        xAxis: { data: this.xData },
        series: { data: this.yData },
      });
      this.lineoptions=Object.assign(this.lineoptions,{
        xAxis:{data:this.xData},
        series:{data:this.yData}
      })
     this.zData= this.yData.map((value,i,name)=>(
        {value,name:this.xData[i]}
        )
      )
       this.shanoption=Object.assign(this.shanoption,{
        legend:{data:this.xData},
        series:{data:this.zData}
      })
    },
  },
};
</script>
<style scoped>
.zhu {
  width: 100%;
}
</style>
