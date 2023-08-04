import { LAYOUT_NAMES } from '@/constants/config'

export default async function (layout: string) {
  switch (layout) {
    case LAYOUT_NAMES.DEFAULT:
      return await import('@/layouts/DefaultLayout.vue')
    case LAYOUT_NAMES.AUTH:
      return await import('@/layouts/EmptyLayout.vue')
    default:
      return await import('@/layouts/DefaultLayout.vue')
  }
}
