export default function deepClone(source) {
  if (source === null) {
    return source
  }

  const typeString = typeof source
  if (
    typeString === 'undefined' ||
    typeString === 'number' ||
    typeString === 'boolean' ||
    typeString === 'string' ||
    typeString === 'symbol'
  ) {
    return source
  }

  if (Array.isArray(source)) {
    return source.map(value => deepClone(value))
  }

  let result = {}
  Object.keys(source).forEach(key => {
    result[key] = deepClone(source[key])
  })

  return result
}
