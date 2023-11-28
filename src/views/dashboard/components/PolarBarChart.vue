<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from "echarts";

const props = withDefaults(defineProps<{
  id?: string;
  className?: string;
  width?: string;
  height?: string;
}>(), {
  id: 'PolarBar',
  width: '200px',
  height: '200px'
});

const options = {
  polar: {
    radius: [30, '80%']
  },
  angleAxis: {
    startAngle: 75,
    max: 8000
  },
  radiusAxis: {
    type: 'category',
    data: ["浙江", "北京", "上海", "广东", "深圳"]
  },
  tooltip: {
    formatter: '{a}<br/>{b}:{c}元'
  },
  series: {
    name: '销售额',
    type: 'bar',
    data: [4000, 7100, 5200, 7300, 4400],
    coordinateSystem: 'polar',
    itemStyle: {
      color: "#2469ce",
    },
    label: {
      show: false,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  }
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

<template>
  <ElCard>
    <div :id="id" :class="className" :style="{ height, width }" />
  </ElCard>
</template>