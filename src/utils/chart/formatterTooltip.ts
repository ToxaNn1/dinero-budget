export const formatterTooltip = (params: any, format = 'DD/MM/YY HH:mm:ss') => {
  return params
    .map((item: any) => {
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
