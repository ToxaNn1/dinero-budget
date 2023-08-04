export const REGEX_MAIL =
  '^(?!.*(?:\\.-|-\\.))[^@]+@[^\\W_](?:[\\w-]*[^\\W_])?(?:\\.[^\\W_](?:[\\w-]*[^\\W_])?)+$'

const rules = {
  required: (v: any) => {
    if (Array.isArray(v) && !v.length) {
      return false
    }
    return v === 0 || !!v || 'Required'
  },

  validatePassword: (password: string): boolean =>
    password.length >= 8 && /^(?=.*[A-Z])/.test(password) && /^(?=.*[0-9])/.test(password),

  requiredDepends: (d: any) => (v: any) => !d || v === 0 || !!v || 'Required',

  requiredDependsOnFalsy: (d: any) => (v: any) => v === 0 || !!v || !!d || 'Required',

  maxLength: (max: number) => (v: string) => !v || v.length <= max || `MinLength ${max}`,

  minLength: (min: number) => (v: string) => !v || v.length >= min || `MinLength ${min}`,

  rangeLength: (min: number, max: number) => (v: string) =>
    !v || (v.length >= min && v.length <= max) || `LengthRange ${min} ${max}`,

  range: (min: number, max: number) => (v: number) =>
    !v || (v >= min && v <= max) || `${min}-${max}`,

  biggerThan:
    (min: number, orEqual = false) =>
    (v: number) =>
      (!v && v !== 0) ||
      (orEqual ? v >= min : v > min) ||
      `MustBeBiggerThan ${orEqual ? min - 1 : min}`,
  lessThan:
    (max: number, orEqual = false) =>
    (v: number) =>
      (!v && v !== 0) ||
      (orEqual ? v <= max : v < max) ||
      `MustBeLessThan ${orEqual ? max - 1 : max}`,

  requiredLength: (length: number) => (v: string) =>
    !v || length === v.length || `Required length ${length}`,

  containerNumber: () => (v: string) =>
    !v || /^[A-Za-z]{4}\d{7}$/.test(v) || 'Please use this format AAAA9999999',

  precision: (precision: number) => (v: number) => {
    if (!v || v.toString().indexOf('.') === -1) {
      return true
    }

    const split = v.toString().split('.')

    if (split.length > 2) {
      return `AllowedPrecision ${precision}`
    }

    return split[split.length - 1].length <= precision || `AllowedPrecision ${precision}`
  },
  alphaNumeric: () => (v: string) => !v || !/[^\dA-Za-z]+/g.test(v) || 'AlphaNumeric',

  email: (v: string) => {
    if (!v) {
      return true
    }
    const regex = new RegExp(REGEX_MAIL)
    return regex.test(v) || 'EmailMustBeValid'
  },

  multipleEmail: (v: string) => {
    if (!v) {
      return true
    }
    const emails = v
      .split(';')
      .map((el) => el.trim())
      .filter((el) => el)

    const regex = new RegExp(REGEX_MAIL)

    for (let i = 0; i < emails.length; i++) {
      if (!regex.test(emails[i])) {
        return 'MultipleEmailMustBeValid'
      }
    }
    return true
  },

  numeric:
    (allowFloatingPoint = false) =>
    (v: any) =>
      !v ||
      (allowFloatingPoint ? !isNaN(v) : Number.isInteger(Number(v))) ||
      'OnlyNumbersAreAllowed'
}

export default rules
