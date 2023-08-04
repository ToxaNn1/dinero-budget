import { ref } from 'vue'
import { FormItemRule } from 'naive-ui'

export const rulesForForm = () => {
  const getNewRulesForForms = (index = 0): FormItemRule => {
    const commonRules = {
      category: {
        trigger: 'change',
        required: true,
        message: 'Please select category'
      },
      currency: {
        trigger: 'change',
        required: true,
        message: 'Please select currency'
      },
      payType: {
        required: true,
        trigger: 'change',
        message: 'Please select pay type'
      },
      amount: {
        type: 'number',
        required: true,
        trigger: ['blur', 'change'],
        message: 'Please input amount'
      }
    }

    return {
      ...commonRules,
      ...(index === 0 && {
        date: {
          type: 'number',
          required: true,
          trigger: ['change'],
          message: 'Please input date'
        }
      })
    }
  }
  const rules = ref<FormItemRule>({ spendings: [getNewRulesForForms()] })

  return { rules, getNewRulesForForms }
}
