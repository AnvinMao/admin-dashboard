<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";

const props = withDefaults(defineProps<{
  id?: string;
  className?: string;
  width?: string;
  height?: string;
}>(), {
  id: 'radarChart',
  width: '200px',
  height: '200px'
});

const options = {
  legend: {
    x: "center",
    y: "bottom",
    data: ["预定数量", "下单数量", "发货数量"],
    textStyle: {
      color: "#999",
    },
  },
  radar: {
    // shape: 'circle',
    radius: "70%",
    indicator: [
      { name: "家用电器" },
      { name: "服装箱包" },
      { name: "运动户外" },
      { name: "手机数码" },
      { name: "汽车用品" },
      { name: "家具厨具" },
    ],
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      itemStyle: {
        borderRadius: 6,
        color: function (params: any) {
          //自定义颜色
          const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
          return colorList[params.dataIndex];
        },
      },
      data: [
        {
          value: [400, 440, 400, 480, 410, 400],
          name: "预定数量",
        },
        {
          value: [300, 350, 300, 400, 370, 300],
          name: "下单数量",
        },
        {
          value: [200, 150, 200, 130, 200, 200],
          name: "发货数量",
        },
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

<!-- 雷达图 -->
<template>
  <ElCard>
    <template #header> 订单状态雷达图 </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </ElCard>
</template>