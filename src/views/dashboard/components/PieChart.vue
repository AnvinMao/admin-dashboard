<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

const props = withDefaults(defineProps<{
  id?: string;
  className?: string;
  width?: string;
  height?: string;
}>(), {
  id: 'pieChart',
  width: '200px',
  height: '200px'
});

const options = {
  grid: {
    left: "0%",
    right: "3%",
    bottom: "20%",
    top: "8%",
    containLabel: true,
  },
  legend: {
    top: "bottom",
    textStyle: {
      color: "#999",
    },
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "产品分类",
      type: "pie",
      radius: ['20%', '70%'],
      center: ["50%", "45%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 5,
        color: function (params: any) {
          //自定义颜色
          const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
          return colorList[params.dataIndex];
        },
      },
      data: [
        { value: 53, name: "家用电器" },
        { value: 37, name: "户外运动" },
        { value: 24, name: "汽车用品" },
        { value: 63, name: "手机数码" },
      ],
    },
  ],
};

onMounted(() => {
  const chart = echarts.init(
    document.getElementById(props.id) as HTMLDivElement
  );
  chart.setOption(options);
  window.addEventListener("resize", () => {
    chart.resize();
  });
});
</script>

<!-- 饼图 -->
<template>
  <ElCard>
    <template #header> 产品分类饼图 </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </ElCard>
</template>