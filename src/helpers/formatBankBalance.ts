export const formatterBankBalance = (balance = 0) => {
  if (!balance) return 0
  const result = String(balance).split('')
  if (result.length <= 2) {
    result.unshift('0', '.')
    return Number(result.join(''))
  } else {
    result.splice(result.length - 2, 0, '.')
    return Number(result.join(''))
  }
}
