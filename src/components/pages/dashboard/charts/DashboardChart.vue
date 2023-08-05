<template>
  <div class="tw-flex tw-flex-col tw-w-full">
    <v-row>
      <v-col>
        <DineroDatePicker v-model="filterChart.from" :label="'From'" />
      </v-col>
      <v-col>
        <DineroDatePicker v-model="filterChart.to" :label="'To'" />
      </v-col>
      <v-col>
        <DineroButton button-content="Apply filters" @click="onApplyFilters" />
        <DineroButton button-content="Reset filters" @click="onResetFilters" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DineroButtonGroup v-model="chartType" :buttons-options="Object.values(KIND_OF_CHART)" />
      </v-col>
      <v-col>
        <DineroButtonGroup v-model="graphicType" :buttons-options="Object.values(TYPE_CHART)" />
      </v-col>
    </v-row>
    <v-row v-if="chartType === KIND_OF_CHART.TOTAL_CHART">
      <v-col>
        <v-chart
          v-if="filteredChartData"
          class="tw-h-[500px] tw-w-full"
          autoresize
          :option="option"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-chart
          v-if="filteredChartData"
          class="tw-h-[500px] tw-w-full"
          autoresize
          :option="categoryOption"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { useSpendingStore } from '@/stores/useSpendingStore'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import DineroDatePicker from '@/components/ui/form/DineroDatePicker.vue'
import DineroButton from '@/components/ui/form/DineroButton.vue'
import dayjs from 'dayjs'
import { useConfigStore } from '@/stores/useConfigStore'
import { CATEGORY_VALUES } from '@/constants/categories'
import DineroButtonGroup from '@/components/ui/form/DineroButtonGroup.vue'
import { chartColorStyles, KIND_OF_CHART, TYPE_CHART } from '@/constants/chart.constants'
import { formatterTooltip } from '@/utils/chart/formatterTooltip'
import { useTableStore } from '@/stores/useTableStore'
import { getMonthNumber } from '@/utils/getMonthNumber'
import { FormatterParams, TYPE_CHART_TYPE } from '@/types/chart/chart'

const configStore = useConfigStore()
const { globalFormModel } = storeToRefs(configStore)

const tableStore = useTableStore()

const { tableData } = storeToRefs(tableStore)

const spendingStore = useSpendingStore()
const { chartData } = storeToRefs(spendingStore)

const filterChart = reactive({
  from: '',
  to: ''
})

const chartType = ref(KIND_OF_CHART.CATEGORY_CHART)
const graphicType = ref<TYPE_CHART_TYPE>(TYPE_CHART.BAR)

const filteredChartData = ref()

const totalSpendings = computed(() => {
  return Array.from(
    filteredChartData.value?.map(() =>
      chartData.value?.reduce((acc, item) => acc + +item?.amount, 0)
    )
  )
})

const categoryChartData = ref([])

const getDatesForMonth = computed(() => {
  const monthNumber = getMonthNumber(globalFormModel.value.globalMonth)
  const now = dayjs().month(monthNumber)
  const startDate = now.startOf('month')
  const endDate = now.endOf('month')

  const dates = []

  let current = startDate

  while (current.isBefore(endDate) || current.isSame(endDate)) {
    const formatted = current.format(globalFormModel.value.globalDateFormat)
    dates.push(formatted)
    current = current.add(1, 'day')
  }
  return dates
})

const getDataForCategoryChart = () => {
  categoryChartData.value = []
  const categoryValues = Object.values(CATEGORY_VALUES)
  for (const category of categoryValues) {
    const filtered = tableData.value.filter((item) => {
      return item.category.value === category
    })
    categoryChartData.value.push({ ['category']: category, ['data']: filtered })
  }
}

watch([() => chartData.value, () => tableData.value], () => {
  filteredChartData.value = chartData.value
  getDataForCategoryChart()
})

const onApplyFilters = () => {
  filteredChartData.value = chartData.value.filter((item) => {
    if (
      dayjs(filterChart.from).format(globalFormModel.value.globalDateFormat) <= item.date &&
      item.date <= dayjs(filterChart.to).format(globalFormModel.value.globalDateFormat)
    ) {
      return item
    }
  })
}

const onResetFilters = () => {
  filteredChartData.value = chartData.value
  getDataForCategoryChart()
  filterChart.from = ''
  filterChart.to = ''
}

const categoryOption = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params: FormatterParams[]) => formatterTooltip(params),
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: getDatesForMonth.value
    },
    yAxis: {
      type: 'value'
    },
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider'
      }
    ],
    legend: {},
    series: categoryChartData.value.map((category, index) => {
      return {
        data: getDatesForMonth.value.map((day) => {
          if (category.data.length === 0) return null

          return category.data.reduce((accumulator, item) => {
            if (day === dayjs(item.date).format(globalFormModel.value.globalDateFormat)) {
              return accumulator + Number(item.amount)
            }
            return accumulator
          }, 0)
        }),
        type: graphicType.value,
        name: category.category,
        smooth: true,
        itemStyle: {
          color: chartColorStyles?.[index]?.itemStyleColor
        },
        areaStyle: {
          color: chartColorStyles?.[index]?.color
        }
      }
    })
  }
})

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      },
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: filteredChartData.value?.map((item) => item?.date)
    },
    yAxis: {
      type: 'value'
    },
    legend: {},
    series: [
      {
        name: 'Total',
        data: filteredChartData.value && totalSpendings.value,
        type: graphicType.value,
        smooth: true,
        itemStyle: {
          color: 'rgb(173,4,57)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(210,182,150)'
            },
            {
              offset: 1,
              color: 'rgb(203,99,134)'
            }
          ])
        }
      },
      {
        name: 'Spending',
        data: filteredChartData.value?.map((item) => item?.amount),
        type: graphicType.value,
        smooth: true,
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        }
      }
    ]
  }
})
</script>
