import dayjs from 'dayjs'
import { setUpperFirstLetter } from '@/helpers/setUpperFirstLetter'
//
// export const getCurrentMonthName = (): string => {
//   return setUpperFirstLetter(dayjs().format("MMMM"));
// };

export const getCurrentMonthName = (timestamp?): string => {
  return setUpperFirstLetter(dayjs(timestamp).format('MMMM'))
}
