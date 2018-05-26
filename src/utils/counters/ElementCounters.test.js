import {
  findLastElementInDocumentOrder,
  isCountersValid,
  mergeInheritedCounters,
  createElementCounter,
} from './ElementCounter'

describe('findLastElementInDocumentOrder', () => {
  it('should return default value when tree is undefined', () => {
    const tree= undefined

    expect(findLastElementInDocumentOrder(tree)).toEqual({
      counters: {},
      children: [],
    })
  })

  it('should return tree when it has no children', () => {
    const tree = {
      counters: {},
      children: [],
    }

    expect(findLastElementInDocumentOrder(tree) === tree).toEqual(true)
  })

  it('should return last children in document order', () => {
    const tree = {
      counters: {},
      children: [
        {
          counters: {},
          children: [],
        },
        {
          counters: {},
          children: [
            { counters: {}, children: [], },
            { counters: { test: [1, 2, 3], test1: [4, 5, 6] }, children: [], },
          ],
        },
      ]
    }

    expect(findLastElementInDocumentOrder(tree)).toEqual({
      counters: { test: [1, 2, 3], test1: [4, 5, 6] },
      children: [],
    })
  })
})

describe('isCountersValid', () => {
  it('should return false when either counters are not array', () => {
    const counterByName = undefined
    const counterByValue = ''

    expect(isCountersValid(counterByName, counterByValue)).toEqual(false)
  })

  it('should return false when counterByValue is shorter, which means counterByName cannot be its prefix', () => {
    const counterByName = [1, 2, 3]
    const counterByValue = [1, 2]

    expect(isCountersValid(counterByName, counterByValue)).toEqual(false)
  })

  it('should return false when counterByName is not prefix of counterByValue', () => {
    const counterByName = [1, 2, 5]
    const counterByValue = [1, 2, 3, 4]

    expect(isCountersValid(counterByName, counterByValue)).toEqual(false)
  })

  it('should return true when counterByName is prefix of counterByValue', () => {
    const counterByName = [1, 2, 3]
    const counterByValue = [1, 2, 3, 4]

    expect(isCountersValid(counterByName, counterByValue)).toEqual(true)
  })
})

describe('mergeInheritedCounters', () => {
  it.only('should return merged counters correctly', () => {
    const countersByName = {
      test: [1, 2],
      test1: [3, 4, 5],
    }

    const countersByValue = {
      test: [1, 2],
      test1: [3, 4, 6, 7]
    }

    expect(mergeInheritedCounters(countersByName, countersByValue)).toEqual({
      test: [1, 2],
      test1: [3, 4, 6],
    })
  })
})
