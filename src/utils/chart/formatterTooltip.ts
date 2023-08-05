import { FormatterParams } from '@/types/chart/chart'

export const formatterTooltip = (params: FormatterParams[]) => {
  return params
    .map((item: FormatterParams) => {
      if (item.value > 0) {
        return (
          '<div class="tw-flex tw-no-wrap tw-items-start tw-justify-between tw-w-full">' +
          '<p>' +
          item.marker +
          item.seriesName +
          ': ' +
          '</p>' +
          '<p class="tw-ml-3 tw-font-bold">' +
          item.value +
          '</p>' +
          '</div>'
        )
      }
    })
    .join('')
}
