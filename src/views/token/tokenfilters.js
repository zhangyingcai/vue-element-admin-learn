/**
 * value
 * @param {(Object|string|number)} value
 * @param {string} tokenDecimal
 * @returns {string}
 */

export function tokenValue(value, tokenDecimal){
  return Number.parseFloat(Number.parseFloat(value / Math.pow(10, tokenDecimal)).toFixed(5))
}

/**
 * value
 * @param {(Object|string|number)} value
 * @returns {string}
 */

export function tokenMoney(value){
  const arr = value.toString().split('.')
  let last = ''
  if (arr.length > 1) {
    last = '.' + arr[1]
  }
  return arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + last
}

/**
 * value
 * @param {(Object|string|number)} value
 * @param {string} address
 * @param {string} tag
 * @returns {string}
 */

export function showTag(value, address='', tag=''){
  let result = value;
  if (value == address){
    if(tag){
      result = tag;
    }
  }
  return result
}