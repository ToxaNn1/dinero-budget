import * as echarts from 'echarts'
import { TYPE_CHARTS } from '@/types/global'

export const TYPE_CHART = Object.freeze<Record<string, TYPE_CHARTS>>({
  LINE: 'line',
  BAR: 'bar'
})

export const chartColorStyles = [
  {
    itemStyleColor: '#F06292', // Light pink
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#F8BBD0' // Lighter pink
      },
      {
        offset: 1,
        color: '#E91E63' // Darker pink
      }
    ])
  },
  {
    itemStyleColor: '#FFB74D', // Light orange
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#FFE0B2' // Lighter orange
      },
      {
        offset: 1,
        color: '#FF9800' // Darker orange
      }
    ])
  },
  {
    itemStyleColor: '#FFD54F', // Light yellow
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#FFF9C4' // Lighter yellow
      },
      {
        offset: 1,
        color: '#FFC107' // Darker yellow
      }
    ])
  },
  {
    itemStyleColor: '#AED581', // Light green
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#DCEDC8' // Lighter green
      },
      {
        offset: 1,
        color: '#4CAF50' // Darker green
      }
    ])
  },
  {
    itemStyleColor: '#81C784', // Light turquoise
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#B2DFDB' // Lighter turquoise
      },
      {
        offset: 1,
        color: '#009688' // Darker turquoise
      }
    ])
  },
  {
    itemStyleColor: '#64B5F6', // Light blue
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#BBDEFB' // Lighter blue
      },
      {
        offset: 1,
        color: '#3F51B5' // Darker blue
      }
    ])
  },
  {
    itemStyleColor: '#7986CB', // Light purple
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#D1C4E9' // Lighter purple
      },
      {
        offset: 1,
        color: '#673AB7' // Darker purple
      }
    ])
  },
  {
    itemStyleColor: '#BA68C8', // Light violet
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#E1BEE7' // Lighter violet
      },
      {
        offset: 1,
        color: '#9C27B0' // Darker violet
      }
    ])
  },
  {
    itemStyleColor: '#4DB6AC', // Light turquoise
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#B2DFDB' // Lighter turquoise
      },
      {
        offset: 1,
        color: '#009688' // Darker turquoise
      }
    ])
  },
  {
    itemStyleColor: '#9575CD', // Light purple
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#D1C4E9' // Lighter purple
      },
      {
        offset: 1,
        color: '#673AB7' // Darker purple
      }
    ])
  },
  {
    itemStyleColor: '#FF7043', // Light orange
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#FFAB91' // Lighter orange
      },
      {
        offset: 1,
        color: '#FF5722' // Darker orange
      }
    ])
  },
  {
    itemStyleColor: '#81D4FA', // Light blue
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#B3E5FC' // Lighter blue
      },
      {
        offset: 1,
        color: '#03A9F4' // Darker blue
      }
    ])
  },
  {
    itemStyleColor: '#64FFDA', // Light turquoise
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#E0F7FA' // Lighter turquoise
      },
      {
        offset: 1,
        color: '#00BCD4' // Darker turquoise
      }
    ])
  },
  {
    itemStyleColor: '#81C784', // Light green
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#C8E6C9' // Lighter green
      },
      {
        offset: 1,
        color: '#4CAF50' // Darker green
      }
    ])
  },
  {
    itemStyleColor: '#FFD54F', // Light yellow
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#FFF9C4' // Lighter yellow
      },
      {
        offset: 1,
        color: '#FFC107' // Darker yellow
      }
    ])
  },
  {
    itemStyleColor: '#BA68C8', // Light violet
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: '#E1BEE7' // Lighter violet
      },
      {
        offset: 1,
        color: '#9C27B0' // Darker violet
      }
    ])
  }
]
