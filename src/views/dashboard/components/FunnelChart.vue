<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from "echarts";

const props = withDefaults(defineProps<{
  id?: string;
  className?: string;
  width?: string;
  height?: string;
}>(), {
  id: 'funnelChart',
  width: '200px',
  height: '200px'
});

const options = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    x: "center",
    y: "bottom",
    data: ["Show", "Click", "Visit", "Inquiry", "Order"],
  },
  series: [
    {
      name: "Funnel",
      type: "funnel",
      left: "10%",
      top: 20,
      bottom: 66,
      width: "80%",
      sort: "descending",
      gap: 2,
      label: {
        show: true,
        position: "inside",
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: "solid",
        },
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 20,
        },
      },
      data: [
        { value: 95, name: "Visit" },
        { value: 60, name: "Inquiry" },
        { value: 40, name: "Order" },
        { value: 90, name: "Click" },
        { value: 100, name: "Show" },
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

<!-- 漏斗图 -->
<template>
  <ElCard>
    <template #header> 订单线索转化漏斗图 </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </ElCard>
</template>