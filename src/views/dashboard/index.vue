<script setup lang="ts">
import { ref } from 'vue';
import BarChart from './components/BarChart.vue';
import PieChart from './components/PieChart.vue';
import FunnelChart from './components/FunnelChart.vue';
import PolarBarChart from './components/PolarBarChart.vue';
import { useTransition, TransitionPresets } from "@vueuse/core";

defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

const duration = 5000;
// 收入金额
const amount = ref<number>(0);
const amountOutput = useTransition(amount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
amount.value = 15070;

// 访问数
const visitCount = ref<number>(0);
const visitCountOutput = useTransition(visitCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
visitCount.value = 52600;

//消息数
const messageCount = ref<number>(0);
const messageCountOutput = useTransition(messageCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
messageCount.value = 2690;

// 订单数
const orderCount = ref<number>(0);
const orderCountOutput = useTransition(orderCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
orderCount.value = 1790;
</script>

<template>
  <div class="content">
    <ElRow :gutter="15">
      <ElCol :sm="16" :xs="24">
        <ElRow :gutter="15">
          <ElCol :xs="24" :sm="12" class="card">
            <ElCard>
              <div class="flex-row">
                <span>今日访问数</span>
                <div class="icon"><IconUser class="visit" /></div>
              </div>
              <span class="value">
                {{ Math.round(visitCountOutput) }}
              </span>
              <p>较前日下降了<em class="down">-2.65%</em></p>
            </ElCard>
          </ElCol>

          <ElCol :xs="24" :sm="12" class="card">
            <ElCard>
              <div class="flex-row">
                <span>今日售后处理</span>
                <div class="icon"><IconMessage class="visit" /></div>
              </div>
              <span class="value">
                {{ Math.round(messageCountOutput) }}
              </span>
              <p>较前日增加了<em class="up">1.25%</em></p>
            </ElCard>
          </ElCol>
        </ElRow>
        
        <ElRow :gutter="15">
          <ElCol :xs="24" :sm="12" class="card">
            <ElCard>
              <div class="flex-row">
                <span>今日销售总额</span>
                <div class="icon"><IconLock class="visit" /></div>
              </div>
              <span class="value">
                ${{ Math.round(amountOutput) }}
              </span>
              <p>较前日增加了<em class="up">2.35%</em></p>
            </ElCard>
          </ElCol>

          <ElCol :xs="24" :sm="12" class="card">
            <ElCard>
              <div class="flex-row">
                <span>今日订单总数</span>
                <div class="icon"><IconOrder class="visit" /></div>
              </div>
              <span class="value">
                {{ Math.round(orderCountOutput) }}
              </span>
              <p>较前日增加了<em class="up">1.85%</em></p>
            </ElCard>
          </ElCol>
        </ElRow>
      </ElCol>
      <ElCol :sm="8" :xs="24">
        <PolarBarChart id="polarChart" height="300px" width="100%" class="mb-4" />
      </ElCol>
    </ElRow>

    <!-- Echarts 图表 -->
    <ElRow :gutter="15">
      <ElCol :xs="24" :sm="12" :lg="8" class="mb-4">
        <BarChart id="barChart" height="400px" width="100%" />
      </ElCol>

      <ElCol :xs="24" :sm="12" :lg="8" class="mb-4">
        <PieChart id="pieChart" height="400px" width="100%" />
      </ElCol>

      <ElCol :xs="24" :sm="12" :lg="8" class="mb-4">
        <FunnelChart id="funnelChart" height="400px" width="100%" />
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin-bottom: 15px;
  font-size: 14px;
  .value {
    font-size: 28px;
  }
  p {
    color: #666;
    padding: 0;
    margin: 3px 0 15px 0;
    em {
      font-style: normal;
      padding: 0 5px;
      &.down {
        color: var(--el-color-danger);
      }
      &.up {
        color: var(--el-color-success);
      }
    }
  }
  .icon {
    width: 40px;
    height: 40px;
    background-color: #2469ce;
    border-radius: 50%;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 22px;
      height: 22px;
    }
  }
}
.mb-4 {
  margin-bottom: 15px;
}
</style>