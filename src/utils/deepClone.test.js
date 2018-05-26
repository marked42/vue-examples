import deepClone from './deepClone'

describe('deepClone', () => {
  it('should clone primitive value correctly', () => {
    const primitiveValues = [
      null,
      undefined,
      true,
      false,
      1,
      NaN,
      Infinity,
      'string',
      Symbol.for('a'),
    ]

    primitiveValues.forEach(value => {
      expect(deepClone(value)).toEqual(value)
    })
  })

  it('should clone array of primitive values correctly', () => {
    const array = [
      null,
      undefined,
      true,
      false,
      1,
      NaN,
      Infinity,
      'string',
      Symbol.for('a'),
    ]

    expect(deepClone(array)).toEqual(array)
  })

  it('should clone object of primitive values corretly', () => {
    const object = {
      1: null,
      2: undefined,
      3: true,
      4: false,
      5: 1,
      6: NaN,
      7: Infinity,
      8: 'string',
      10: Symbol.for('a'),
    }

    expect(deepClone(object)).toEqual(object)
  })

  it('should clone mixed object correctly', () => {
    const object = {
      1: { 3: [4, 5], 6: 7 },
      2: [ { 8: 8 }, [9, 10] ],
    }

    expect(deepClone(object)).toEqual(object)
  })
})
