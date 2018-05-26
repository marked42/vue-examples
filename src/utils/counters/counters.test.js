import {
  processCounters,
  processCountersResets,
  processCountersSets,
  processCountersIncrements,
  getInnermostCounterValue,
  getNestedCounterValue,
  getCounterString,
  getCountersString,
} from './counters'
import { counterStyles } from './counterStyles'

describe('processCounters', () => {
  it('should return empty object as counters when no parent counters to inherit', () => {
    expect(processCounters({})).toEqual({})
  })

  it('should process counters correctly if inherits counters from parent', () => {
    const operations = {
      inherits: {
        test: [1, 2],
      },
      resets: [
        { name: 'test', value: 3 },
        { name: 'test1', value: 4 },
      ],
      sets: [
        { name: 'test', value: 5 },
        { name: 'test1', value: 6 },
        { name: 'test2', value: 7 },
      ],
      increments: [
        { name: 'test', value: 8 },
        { name: 'test1', value: 9 },
        { name: 'test2', value: 10 },
        { name: 'test3', value: 11 },
      ],
    }

    const result = processCounters(operations)

    expect(result).toEqual({
      test: [1, 2, (3, 5 + 8)], // [1, 2] -> [1, 2, 3] -> [1, 2, 5] -> [1, 2, 5 + 8]
      test1: [6 + 9], // [4] -> [6] -> [6 + 9]
      test2: [7 + 10], // [7] -> [7 + 10]
      test3: [11], // [11]
    })
  })

  it('should process counters correctly if inherits counters from sibling', () => {
    const operations = {
      inherits: {
        test: [1, 2],
      },
      fromParent: false,
      resets: [
        { name: 'test', value: 3 },
        { name: 'test1', value: 4 },
      ],
      sets: [
        { name: 'test', value: 5 },
        { name: 'test1', value: 6 },
        { name: 'test2', value: 7 },
      ],
      increments: [
        { name: 'test', value: 8 },
        { name: 'test1', value: 9 },
        { name: 'test2', value: 10 },
        { name: 'test3', value: 11 },
      ],
    }

    const result = processCounters(operations)

    expect(result).toEqual({
      test: [1, 13], // [1, 2] -> [1, 3] -> [1, 5] -> [1, 5 + 8]
      test1: [6 + 9], // [4] -> [6] -> [6 + 9]
      test2: [7 + 10], // [7] -> [7 + 10]
      test3: [11], // [11]
    })
  })
})

describe('processCountersResets', () => {
  it('should create new counter if not already exist', () => {
    const counters = { test: undefined }

    const result = processCountersResets(counters, [{ name: 'test', value: 1 }])

    expect(result).toEqual({ test: [1] })
  })

  it('should create new counter if not already exist using 0 as default value', () => {
    const counters = { test: undefined }

    const result = processCountersResets(counters, [{ name: 'test' }])

    expect(result).toEqual({ test: [0] })
  })

  it('should create new counter in nested structure if inherits counter from parent', () => {
    const counters = { test: [2] }

    const result = processCountersResets(counters, [{ name: 'test', value: 1 }])

    expect(result).toEqual({ test: [2, 1] })
  })

  it('should reset innermost counter value if inherits counter from previous sibling', () => {
    const counters = { test: [2] }

    const result = processCountersResets(counters, [{ name: 'test', value: 1 }], false)

    expect(result).toEqual({ test: [1] })
  })

  it('should create new counter in nested structure using 0 as default value if inherits counter from parent', () => {
    const counters = { test: [2] }

    const result = processCountersResets(counters, [{ name: 'test' }])

    expect(result).toEqual({ test: [2, 0] })
  })

  it('should reset innermost counter value if inherits counter from previous sibling', () => {
    const counters = { test: [2] }

    const result = processCountersResets(counters, [{ name: 'test' }], false)

    expect(result).toEqual({ test: [0] })
  })

  it('should be able to create multiple new counters at once if inherits counter from parent', () => {
    const counters = { test: [2] }

    const result = processCountersResets(counters, [{name: 'test', value: 10}, {name: 'test1', value: 11}])

    expect(result).toEqual({ test: [2, 10], test1: [11] })
  })

  it('should be able to reset multiple innermost counters at once if inherits counter from parent', () => {
    const counters = { test: [2] }

    const result = processCountersResets(counters, [{name: 'test', value: 10}, {name: 'test1', value: 11}], false)

    expect(result).toEqual({ test: [10], test1: [11] })
  })
})

describe('processCounterSets', () => {
  it('should set innermost counter value', () => {
    const counters = { test: [1, 2] }

    const result = processCountersSets(counters, [{ name: 'test', value: 10 }])

    expect(result).toEqual({ test: [1, 10] })
  })

  it('should set innermost counter using 0 as default value if not specified', () => {
    const counters = { test: [1, 2] }

    const result = processCountersSets(counters, [{ name: 'test' }])

    expect(result).toEqual({ test: [1, 0] })
  })

  it("should create new counter and set value as specified or default value if counter doesn't exist", () => {
    const counters = { test: undefined }

    const result = processCountersSets(counters, [{ name: 'test', value: 10 }])

    expect(result).toEqual({ test: [10] })
  })

  it('should be able to set multiple counters at once', () => {
    const counters = {test: [1, 2], test1: [3, 4]}

    const result = processCountersSets(counters, [{name: 'test', value: 10}, {name: 'test1', value: 11}])

    expect(result).toEqual({ test: [1, 10], test1: [3, 11] })
  })
})

describe('processCountersIncrements', () => {
  it('should increment innermost counter', () => {
    const counters = { test: [1, 2]}

    const result = processCountersIncrements(counters, [{name: 'test', value: 2}])

    expect(result).toEqual({test: [1, 4]})
  })

  it('should increment innermost counter using 1 as default increment value', () => {
    const counters = { test: [1, 2]}

    const result = processCountersIncrements(counters, [{name: 'test'}])

    expect(result).toEqual({test: [1, 3]})
  })

  it('should increment multiple innermost counters by specified increment value', () => {
    const counters = { test: [1, 2], test1: [3, 4]}

    const result = processCountersIncrements(counters, [{name: 'test', value: 3}, {name: 'test1', value: 4}])

    expect(result).toEqual({test: [1, 5], test1: [3, 8]})
  })

  it("should create new counter using 0 as default value and then increment it with specified value if counter doesn't exist", () => {
    const counters = { test: undefined }

    const result = processCountersIncrements(counters, [{name: 'test', value: 3} ])

    expect(result).toEqual({test: [3]})
  })
})

describe('getInnermostCounterValue', () => {
  it('should get innermost counter value of specified name', () => {
    const counters = { test: [1, 2] }

    expect(getInnermostCounterValue(counters, 'test')).toEqual(2)
  })

  it("should return 0 as default value when counter doesn't exist", () => {
    const counters = { test: [1, 2] }

    expect(getInnermostCounterValue(counters, 'test1')).toEqual(0)
  })
})

describe('getNestedCounterValue', () => {
  it('should get nested counter value of specifed name', () => {
    const counters = { test: [1, 2] }

    expect(getNestedCounterValue(counters, 'test')).toEqual([1, 2])
  })

  it("should return [0] as default value when counter doesn't exist", () => {
    const counters = { test: [1, 2] }

    expect(getNestedCounterValue(counters, 'test1')).toEqual([0])
  })
})

describe('getCounterString', () => {
  it('should return empty string when style is none', () => {
    const counters = {test: [1, 2]}

    expect(getCounterString(counters, 'test', counterStyles.none)).toEqual('')
  })

  it('should fallback to decimal when style is not supported', () => {
    const counters = {test: [1, 2]}
    const unsupportedStyle = -1

    expect(getCounterString(counters, 'test', unsupportedStyle)).toEqual('2')
  })

  it('should return decimal representation of innermost counter value when style is not specified', () => {
    const counters = {test: [1, 2]}

    expect(getCounterString(counters, 'test')).toEqual('2')
  })

  it('should return decimal representation of innermost counter correctly', () => {
    const counters = {test: [1, 2]}

    expect(getCounterString(counters, 'test', counterStyles.decimal)).toEqual('2')
  })
})

describe('getCountersString', () => {
  it('should return empty string when style is none', () => {
    const counters = {test: [1, 2]}

    expect(getCountersString(counters, 'test', '.', counterStyles.none)).toEqual('')
  })

  it('should fallback to decimal when style is not supported', () => {
    const counters = {test: [1, 2]}
    const unsupportedStyle = -1

    expect(getCountersString(counters, 'test', '.', unsupportedStyle)).toEqual('1.2')
  })

  it('should return decimal representation of counters value when style is not specified', () => {
    const counters = {test: [1, 2]}

    expect(getCountersString(counters, 'test', '.')).toEqual('1.2')
  })

  it('should return decimal representation of counters correctly', () => {
    const counters = {test: [1, 2]}

    expect(getCountersString(counters, 'test', '.', counterStyles.decimal)).toEqual('1.2')
  })
})

describe('processCounters', () => {
})
