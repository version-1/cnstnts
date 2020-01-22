import { Enum, Context } from 'src/index'

const input = ['abc_cde', '', 'apple']

describe('Enum', () => {
  test('normal', () => {
    const map = Enum(['ABC', 'CDE', 'EFG'])
    expect(map).toEqual({
      ABC: 'ABC',
      CDE: 'CDE',
      EFG: 'EFG'
    })
  })

  // key
  describe('key', () => {
    test('callback', () => {
      const map = Enum(input, {
        key: {
          camelCase: true,
          cb: (key: string | number, context: Context) => {
            return key + '=' + key
          }
        }
      })
      expect(map).toEqual({
        'abc_cde=abc_cde': 'abc_cde',
        '=': '',
        'apple=apple': 'apple'
      })
    })
    test('prefix', () => {
      const map = Enum(input, {
        key: {
          prefix: 'prefix-'
        }
      })
      expect(map).toEqual({
        'prefix-abc_cde': 'abc_cde',
        'prefix-': '',
        'prefix-apple': 'apple'
      })
    })
    test('suffix', () => {
      const map = Enum(input, {
        key: {
          suffix: '-suffix'
        }
      })
      expect(map).toEqual({
        'abc_cde-suffix': 'abc_cde',
        '-suffix': '',
        'apple-suffix': 'apple'
      })
    })
    describe('camelCase', () => {
      test('normal', () => {
        const map = Enum(input, {
          key: { camelCase: true }
        })
        expect(map).toEqual({
          abcCde: 'abc_cde',
          '': '',
          apple: 'apple'
        })
      })

      test('has other options', () => {
        const map = Enum(input, {
          key: { camelCase: true, capitalize: true, upperCase: true }
        })
        expect(map).toEqual({
          'abcCde': 'abc_cde',
          '': '',
          apple: 'apple'
        })
      })
    })

    describe('capitalize', () => {
      test('normal', () => {
        const map = Enum(input, {
          key: { capitalize: true }
        })
        expect(map).toEqual({
          Abc_cde: 'abc_cde',
          '': '',
          Apple: 'apple'
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            key: { camelCase: true, capitalize: true, upperCase: true }
          })
          expect(map).toEqual({
            abcCde: 'abc_cde',
            '': '',
            apple: 'apple'
          })
        })
        test('has weaker option', () => {
          const map = Enum(input, {
            key: { kebabCase: true, capitalize: true }
          })
          expect(map).toEqual({
            Abc_cde: 'abc_cde',
            '': '',
            Apple: 'apple'
          })
        })
      })
    })

    describe('kebabCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
          key: { kebabCase: true }
        })
        expect(map).toEqual({
          'abc-cde': 'abc_cde',
          '': '',
          apple: 'apple',
          'hang-out': 'hang out',
          'hoge-hoge': 'hogeHoge'
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            key: { kebabCase: true, capitalize: true }
          })
          expect(map).toEqual({
            Abc_cde: 'abc_cde',
            '': '',
            Apple: 'apple'
          })
        })
        test('has weaker option', () => {
          const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
            key: { kebabCase: true, snakeCase: true }
          })
          expect(map).toEqual({
            'abc-cde': 'abc_cde',
            '': '',
            apple: 'apple',
            'hang-out': 'hang out',
            'hoge-hoge': 'hogeHoge'
          })
        })
      })
    })

    describe('snakeCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
          key: { snakeCase: true }
        })
        expect(map).toEqual({
          abc_cde: 'abc_cde',
          '': '',
          apple: 'apple',
          hang_out: 'hang out',
          hoge_hoge: 'hogeHoge'
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(input, {
            key: { kebabCase: true, snakeCase: true }
          })
          expect(map).toEqual({
            'abc-cde': 'abc_cde',
            '': '',
            apple: 'apple'
          })
        })
        test('has weaker option', () => {
          const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
            key: { upperCase: true, snakeCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abc_cde',
            '': '',
            apple: 'apple',
            hang_out: 'hang out',
            hoge_hoge: 'hogeHoge'
          })
        })
      })
    })

    describe('upperCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
          key: { upperCase: true }
        })
        expect(map).toEqual({
          ABC_CDE: 'abc_cde',
          '': '',
          APPLE: 'apple',
          'HANG OUT': 'hang out',
          HOGEHOGE: 'hogeHoge'
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(input, {
            value: { snakeCase: true, upperCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abc_cde',
            '': '',
            apple: 'apple'
          })
        })
      })
    })
  })
  // value
  describe('value', () => {
    test('callback', () => {
      const map = Enum(input, {
        value: {
          camelCase: true,
          cb: (key: string | number, context: Context) => {
            return key + '=' + key
          }
        }
      })
      expect(map).toEqual({
        abc_cde: 'abc_cde=abc_cde',
        '': '=',
        apple: 'apple=apple'
      })
    })
    test('prefix', () => {
      const map = Enum(input, {
        value: {
          prefix: 'prefix-'
        }
      })
      expect(map).toEqual({
        abc_cde: 'prefix-abc_cde',
        '': 'prefix-',
        apple: 'prefix-apple'
      })
    })
    test('suffix', () => {
      const map = Enum(input, {
        value: {
          suffix: '-suffix'
        }
      })
      expect(map).toEqual({
        abc_cde: 'abc_cde-suffix',
        '': '-suffix',
        apple: 'apple-suffix'
      })
    })
    describe('camelCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple'], {
          value: { camelCase: true }
        })
        expect(map).toEqual({
          abc_cde: 'abcCde',
          '': '',
          apple: 'apple'
        })
      })

      test('has numeric options', () => {
        const map = Enum(['100', '1', '-100'], {
          value: { camelCase: true, numeric: true }
        })
        expect(map).toEqual({
          '100': 100,
          '1': 1,
          '-100': -100
        })
      })

      test('has other options', () => {
        const map = Enum(['abc_cde', '', 'apple'], {
          value: { camelCase: true, capitalize: true, upperCase: true }
        })
        expect(map).toEqual({
          abc_cde: 'abcCde',
          '': '',
          apple: 'apple'
        })
      })
    })

    describe('capitalize', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple'], {
          value: { capitalize: true }
        })
        expect(map).toEqual({
          abc_cde: 'Abc_cde',
          '': '',
          apple: 'Apple'
        })
      })

      test('has numeric options', () => {
        const map = Enum(['100', '1', '-100'], {
          value: { camelCase: true, numeric: true }
        })
        expect(map).toEqual({
          '100': 100,
          '1': 1,
          '-100': -100
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            value: { camelCase: true, capitalize: true, upperCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abcCde',
            '': '',
            apple: 'apple'
          })
        })
        test('has weaker option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            value: { kebabCase: true, capitalize: true }
          })
          expect(map).toEqual({
            abc_cde: 'Abc_cde',
            '': '',
            apple: 'Apple'
          })
        })
      })
    })

    describe('kebabCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
          value: { kebabCase: true }
        })
        expect(map).toEqual({
          abc_cde: 'abc-cde',
          '': '',
          apple: 'apple',
          'hang out': 'hang-out',
          hogeHoge: 'hoge-hoge'
        })
      })

      test('has numeric options', () => {
        const map = Enum(['100', '1', '-100'], {
          value: { kebabCase: true, numeric: true }
        })
        expect(map).toEqual({
          '100': 100,
          '1': 1,
          '-100': -100
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            value: { kebabCase: true, capitalize: true }
          })
          expect(map).toEqual({
            abc_cde: 'Abc_cde',
            '': '',
            apple: 'Apple'
          })
        })
        test('has weaker option', () => {
          const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
            value: { kebabCase: true, snakeCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abc-cde',
            '': '',
            apple: 'apple',
            'hang out': 'hang-out',
            hogeHoge: 'hoge-hoge'
          })
        })
      })
    })

    describe('snakeCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
          value: { snakeCase: true }
        })
        expect(map).toEqual({
          abc_cde: 'abc_cde',
          '': '',
          apple: 'apple',
          'hang out': 'hang_out',
          hogeHoge: 'hoge_hoge'
        })
      })

      test('has numeric options', () => {
        const map = Enum(['100', '1', '-100'], {
          value: { snakeCase: true, numeric: true }
        })
        expect(map).toEqual({
          '100': 100,
          '1': 1,
          '-100': -100
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            value: { kebabCase: true, snakeCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abc-cde',
            '': '',
            apple: 'apple'
          })
        })
        test('has weaker option', () => {
          const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
            value: { upperCase: true, snakeCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abc_cde',
            '': '',
            apple: 'apple',
            'hang out': 'hang_out',
            hogeHoge: 'hoge_hoge'
          })
        })
      })
    })

    describe('upperCase', () => {
      test('normal', () => {
        const map = Enum(['abc_cde', '', 'apple', 'hang out', 'hogeHoge'], {
          value: { upperCase: true }
        })
        expect(map).toEqual({
          abc_cde: 'ABC_CDE',
          '': '',
          apple: 'APPLE',
          'hang out': 'HANG OUT',
          hogeHoge: 'HOGEHOGE'
        })
      })

      test('has numeric options', () => {
        const map = Enum(['100', '1', '-100'], {
          value: { upperCase: true, numeric: true }
        })
        expect(map).toEqual({
          '100': 100,
          '1': 1,
          '-100': -100
        })
      })

      describe('has other options', () => {
        test('has stronger option', () => {
          const map = Enum(['abc_cde', '', 'apple'], {
            value: { snakeCase: true, upperCase: true }
          })
          expect(map).toEqual({
            abc_cde: 'abc_cde',
            '': '',
            apple: 'apple'
          })
        })
      })
    })
  })
})
