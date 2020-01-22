import _ from 'lodash'

export interface Context {
  keys: string[]
  options: Options
}

export interface KeyOptions extends OptionsBase {}

export interface ValueOptions extends OptionsBase {
  numeric?: boolean
}

export interface Options {
  key?: KeyOptions
  value?: ValueOptions
}

interface OptionsBase extends ConverterCollection {
  prefix?: string
  suffix?: string
  cb?: (key: string | number, context: Context) => string | number
}

interface ConverterCollection {
  camelCase?: boolean
  capitalize?: boolean
  kebabCase?: boolean
  snakeCase?: boolean
  upperCase?: boolean
}

const deafaultOption = {
  key: {
    prefix: '',
    suffix: ''
  },
  value: {
    prefix: '',
    suffix: '',
    numeric: false
  }
}

export const Enum = (keys: string[], options: Options = deafaultOption) => {
  // prepare
  const _options = { ...deafaultOption, ...options }
  const context = { keys, options: _options }
  const keyConverter = convertCase(_options.key)
  const valueConverter = convertCase(_options.value)
  const _genKey = (key: string | number) => keyConverter(genKey(context)(key))
  const _genValue = (key: string | number) =>
    valueConverter(genValue(context)(key))

  // generate enum
  return Object.freeze(
    keys.reduce(
      (acc: { [key: string]: string | number }, key: string | number) => {
        const keyCallback = _.get(_options, 'key.cb')
        const valueCallback = _.get(_options, 'value.cb')
        const converetedKey = keyCallback ? keyCallback(key, context) : _genKey(key)
        const converetedValue = valueCallback ? valueCallback(key, context) : _genValue(key)
        return {
          ...acc,
          [converetedKey]: converetedValue
        }
      },
      {}
    )
  )
}

const converter = {
  camelCase: _.camelCase,
  capitalize: _.capitalize,
  kebabCase: _.kebabCase,
  snakeCase: _.snakeCase,
  upperCase: _.toUpper
}

const convertCase = (options: KeyOptions | ValueOptions) => (
  target: string | number
) => {
  if ((options as ValueOptions).numeric) {
    if (_.isNaN(Number(target))) {
      console.error('convert case is fail. target is not like number', target)
    }
    return Number(target)
  }
  const convertKey = Object.keys(converter).find(
    (key: string) => options[key as keyof ConverterCollection]
  ) as keyof ConverterCollection | null
  if (convertKey) {
    return converter[convertKey!](target as string)
  }

  return target
}
const genKey = (context: Context) => (key: string | number) => {
  const { prefix = '', suffix = '' } = context.options.key!

  return [prefix, key, suffix].join('')
}

const genValue = (context: Context) => (key: string | number) => {
  const { prefix = '', suffix = '' } = context.options.value!
  return [prefix, key, suffix].join('')
}
