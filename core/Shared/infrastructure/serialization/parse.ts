import camelCase from 'lodash/camelCase'
import cloneDeep from 'lodash/cloneDeep'

export const parse = (target: any) => {
  if (typeof target === 'object') {
    return parseObject(target)
  }

  return camelCase(target)
}

const parseObject = (target: any): any => {
  const clonedTarget = cloneDeep(target)

  if (target instanceof Array) {
    return target.map(element => (element !== null && typeof element === 'object' ? parse(element) : element))
  }

  return Object.keys(clonedTarget).reduce((prev, curr) => {
    if (clonedTarget[curr] !== null && typeof clonedTarget[curr] === 'object') {
      clonedTarget[curr] = parse(clonedTarget[curr])
    }
    return {
      ...prev,
      [camelCase(curr)]: clonedTarget[curr]
    }
  }, {})
}

export const getParamsUrl = (params:string) => {
  const pairs = params.slice(1).split('&')
  const result:any = {}
  pairs.forEach((pair) => {
    const splitted = pair.split('=')
    result[splitted[0]] = decodeURIComponent(splitted[1].replace(/\+/g, ' ') || '')
  })
  return result
}
