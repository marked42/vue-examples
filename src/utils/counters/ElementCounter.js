import {
  processCounters
} from './counters'

export default class ElementCounter {
  constructor({parent, counters, children}) {
    this.parent = parent
    this.counters = {}
    this.children = []
  }
}

export function findLastElementInDocumentOrder(tree) {
  if (!tree) {
    return { counters: {}, children: [] }
  }

  const hasChildren = Array.isArray(tree.children) && tree.children.length > 0
  if (!hasChildren) {
    return tree
  }

  return findLastElementInDocumentOrder(tree.children[tree.children.length - 1])
}

/**
 * counterByName and counterByValue are array with each element representing a nested counter with same name
 * counterByName: [1, 2, 3]
 * counterByValue: [1, 2, 3, 4]
 * counterByName should be a prefix of counterByValue,

 * @param {Array} counterByName
 * @param {Array} counterByValue
 * @returns false if counterByName is not a prefix of counterByValue
 */
export function isCountersValid(counterByName, counterByValue) {
  if (!Array.isArray(counterByName) || !Array.isArray(counterByValue)) {
    return false
  }

  if (counterByValue.length < counterByName.length) {
    return false
  }

  for (let i = 0; i < counterByName.length; i++) {
    // counterByValue is shorter or values are not equal
    if (counterByName[i] !== counterByValue[i]) {
      return false
    }
  }

  return true
}

export function mergeInheritedCounters(countersByName = {}, countersByValue = {}) {
  const result = {}

  Object.keys(countersByName).forEach(key => {
    const counterByName = countersByName[key]
    const counterByValue = countersByValue[key]

    if (!isCountersValid(counterByName, counterByValue)) {
      console.error(`key: ${key}: countersByName should be a prefix of counterByValue, counterByName: ${JSON.stringify(counterByName)}, counterByValue: ${JSON.stringify(counterByValue)}`)
    } else {
      // inherit counters by name
      result[key] = [...counterByName]

      const lastValueIndex = counterByName.length - 1

      // inherits counters by value
      result[key][lastValueIndex] = counterByValue[lastValueIndex]
    }
  })

  return result
}

export function createElementCounter(config) {
  config = {
    resets: [{ name: 'test1', value: 0 }, { name: 'test2', value: 1 }],
    sets: [{ name: 'test2', value: 2 }, { name: 'test3', value: 3 }],
    increments: [{ name: 'test3', value: 4 }, { name: 'test4', value: 5 }],
    children: [
      {
        resets: [{ name: 'test1', value: 0 }, { name: 'test2', value: 1 }],
        sets: [{ name: 'test2', value: 2 }, { name: 'test3', value: 3 }],
        increments: [{ name: 'test3', value: 4 }, { name: 'test4', value: 5 }],
      },
      {
        resets: [{ name: 'test1', value: 0 }, { name: 'test2', value: 1 }],
        sets: [{ name: 'test2', value: 2 }, { name: 'test3', value: 3 }],
        increments: [{ name: 'test3', value: 4 }, { name: 'test4', value: 5 }],
      }
    ]
  }

  const {
    inherits = {},
    resets = [],
    sets = [],
    increments = [],
    children = [],
  } = config

  const operations = { inherits, resets, sets, increments }

  const parentCounters = processCounters(operations)
  const parentNestedCounters = { counters, children: [] }

  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    let countersToInherit
    if (i === 0) {
      countersToInherit = parentCounters
    } else {
      // inherit counter names from previous sibling
      const previousSibling = parentNestedCounters.children[parentNestedCounters.children.length - 1]
      // inherit counter values from immediately previous element in document order
      const previousElementInDocumentOrder = findLastElementInDocumentOrder(previousSibling)

      countersToInherit = mergeInheritedCounters(previousSibling.counters, previousElementInDocumentOrder.counters)
    }

    const childConfig = { ...child , inherits: countersToInherit, }

    const childNestedCounters = createElementCounter(childConfig)

    parentNestedCounters.children.push(childNestedCounters)
  }

  return parentNestedCounters
}
