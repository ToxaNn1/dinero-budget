import findLayout from '@/router/find-layout'
import { LAYOUT_NAMES } from '@/constants/config'

export async function loadLayoutMiddleware(route: any): Promise<void> {
  const { layoutComponent } = route.meta
  const normalizedLayoutName = layoutComponent || LAYOUT_NAMES.DEFAULT
  const component = await findLayout(normalizedLayoutName)
  route.meta.layoutComponent = component.default
}
