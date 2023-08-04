import dayjs from 'dayjs'

export const convertTimestamp = (timestamp: number, format = 'DD MMMM YYYY'): string => {
  return timestamp ? dayjs(timestamp).format(format) : ''
}
