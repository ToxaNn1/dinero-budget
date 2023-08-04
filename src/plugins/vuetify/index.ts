import { createVuetify } from 'vuetify'
import { VCard } from 'vuetify/components/VCard'
import { VRating } from 'vuetify/components/VRating'
import { VToolbar } from 'vuetify/components/VToolbar'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { Ripple } from 'vuetify/directives'
import { md2 } from 'vuetify/blueprints'
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable'
import { VChip, VMenu } from 'vuetify/components'
import { fa } from 'vuetify/iconsets/fa'
import { mdi, aliases } from 'vuetify/iconsets/mdi'

export const vuetifyConfig = createVuetify({
  components: {
    VCard,
    VRating,
    VToolbar,
    VDataTable
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi
    }
  },
  // blueprint: md2,
  directives: {
    Ripple
  },
  defaults: {
    VCard: {
      class: ['global-card-styles']
    }
  }
})
