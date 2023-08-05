import findLayout from '@/router/find-layout'
import { LAYOUT_NAMES } from '@/constants/config'
import { RouteParams } from 'vue-router'

export async function loadLayoutMiddleware(route: RouteParams): Promise<void> {
  const { layoutComponent } = route.meta
  const normalizedLayoutName = layoutComponent || LAYOUT_NAMES.DEFAULT
  const component = await findLayout(normalizedLayoutName)
  route.meta.layoutComponent = component.default
}
