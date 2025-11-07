import { staticDictionary } from '../static-dictionary'
export const setWidth = (rowBtns) => {
  let strLen = rowBtns.map(item => staticDictionary[item]).join('').length
  let num = rowBtns.length
  return strLen * 14 + (num * 16) + 36
}
