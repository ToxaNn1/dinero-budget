import enUS from './en-US/en-US'
import uaUK from './ua-UK/ua-UK'

export enum Locales {
  EnUS = 'en-US',
  UaUK = 'ua-UK'
}

export default {
  [Locales.EnUS]: enUS,
  [Locales.UaUK]: uaUK
}
