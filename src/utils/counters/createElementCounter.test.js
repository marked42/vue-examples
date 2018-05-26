import createElementCounter, {
  findLastElementInDocumentOrder,
  isCountersValid,
  mergeInheritedCounters,
} from './createElementCounter'

describe('findLastElementInDocumentOrder', () => {
  it('should return default value when tree is undefined', () => {
    const tree = undefined

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
            { counters: {}, children: [] },
            { counters: { test: [1, 2, 3], test1: [4, 5, 6] }, children: [] },
          ],
        },
      ],
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

  it('should return false when counters are not valid', () => {
    const counterByName = [1, 2, 3]
    const counterByValue = [1, 3, 4, 5]

    expect(isCountersValid(counterByName, counterByValue)).toEqual(false)
  })

  it('should return true when counters are valid', () => {
    const counterByName = [1, 2, 3]
    const counterByValue = [1, 2, 4, 5]

    expect(isCountersValid(counterByName, counterByValue)).toEqual(true)
  })
})

describe('mergeInheritedCounters', () => {
  it('should return merged counters correctly', () => {
    const countersByName = {
      test: [1, 2],
      test1: [3, 4, 5],
    }

    const countersByValue = {
      test: [1, 2],
      test1: [3, 4, 6, 7],
    }

    expect(mergeInheritedCounters(countersByName, countersByValue)).toEqual({
      test: [1, 2],
      test1: [3, 4, 6],
    })
  })
})

describe('createElementCounter', () => {
  it('should create nested counters correctly', () => {
    const config = {
      resets: [{ name: 'test1', value: 0 }, { name: 'test2', value: 1 }],
      children: [
        {
          resets: [{ name: 'test1', value: 2 }, { name: 'test2', value: 3 }],
          children: [
            {
              resets: [{ name: 'test1', value: 4 }, { name: 'test2', value: 5 }],
              children: [],
            },
          ],
        },
        {
          resets: [{ name: 'test1', value: 6 }, { name: 'test2', value: 7 }],
          children: [
            {
              resets: [{ name: 'test1', value: 8 }, { name: 'test2', value: 9 }],
              children: [],
            },
          ],
        },
      ],
    }

    const result = createElementCounter(config)

    expect(result).toEqual({
      counters: {
        test1: [0], // [] -> [0]
        test2: [1], // [] -> [1]
      },
      children: [
        {
          counters: {
            test1: [0, 2], // [0] -> [0, 2]
            test2: [1, 3], // [1] -> [1, 3]
          },
          children: [
            {
              counters: {
                test1: [0, 2, 4], // [0, 2] -> [0, 2, 4]
                test2: [1, 3, 5], // [1, 3] -> [1, 3, 5]
              },
              children: [],
            },
          ],
        },
        {
          counters: {
            test1: [0, 6], // [0, 2] -> [0, 6]
            test2: [1, 7], // [1, 3] -> [1, 7]
          },
          children: [
            {
              counters: {
                test1: [0, 6, 8], // [0, 6] -> [0, 6, 8]
                test2: [1, 7, 9], // [1, 7] -> [1, 7, 9]
              },
              children: [],
            },
          ],
        },
      ],
    })
  })
})
