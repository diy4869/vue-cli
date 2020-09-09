/*
 * @Author: last order
 * @Date: 2020-04-17 09:24:03
 * @LastEditTime: 2020-05-27 12:55:20
 */ 
module.exports = {
  presets: [
    [
      '@babel/env'
    ]
  ],
  plugins: [
    'transform-react-createelement-to-jsx',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
