# cnstnts

## JavaScript Enumerations helper

Easily define "Plain Object-base" enum helper.

## Install

```
yarn add version-1/cnstnts
```

## How to Use

```javascript
import { Enum } from 'cnstnts'
const fruits = Enum(['apple', 'banana', 'pineapple'])

console.log(fruits)
// {
//   apple: 'apple',
//   banana: 'banana',
//   pineapple: 'pineapple'
//  }
```

```javascript
const fruits = Enum(['hoge_hoge', 'fuga_fuga'], { value: { upperCase: true } })

console.log(fruits)
// {
//   hoge_hoge: 'HOGE_HOGE',
//   fuga_fuga: 'FUGA_FUGA',
//  }
```
