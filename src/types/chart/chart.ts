import { StringOrNumber } from '@/types/global'

export type KIND_OF_CHART = 'Total Chart' | 'Category Chart'
export type TYPE_CHART_TYPE = 'bar' | 'line'

export interface FormatterParams {
  componentType: string
  componentSubType: string
  componentIndex: number
  seriesType: string
  seriesIndex: number
  seriesId: string
  seriesName: string
  name: string
  dataIndex: number
  data: StringOrNumber | null
  color: string
  dimensionNames: string[]
  encode: Record<string, number[]>
  $vars: string[]
  axisDim: string
  axisIndex: number
  axisType: string
  axisId: string
  axisValue: string
  axisValueLabel: string
  marker: string
}
