#!/usr/bin/env node

/*
** 快手`web`端的字体加密信息破解
** create by @d1y 2019-08-27
** 1. 首先下载`.ttf`文件
** 2. 结构字体文件,算出每个字体对于的数字
** 3. 返回一个对象
*/

// 可能随时失效
const digitCode = [
  '곝', // 0
  '믊', // 1
  '첬', // 2
  'ꯍ', // 3
  '꫋', // 4
  '뷊', // 5
  '꾼', // 6
  '쾺', // 7
  '껻', // 8
  '뿮'  // 9
]

// 解密如下
async function init () {
  const axios = require('axios')
  const fs = require('fs')
  const getUrls = require('get-urls');
  const cheerio = require('cheerio')
  // 初始化下载文件
  return new Promise((rcv, rjt)=> {
    axios.get('https://live.kuaishou.com')
      .then(r=> {
        const data = r.data
        const $ = cheerio.load(data)
        const els = $('style')
        const vender = els[0].children[0].data
        const urls = getUrls(vender)
        let state
        urls.forEach(item=> {
          if (item.lastIndexOf('.ttf') >= 0) {
            state = item.slice(0, -2)
            return rcv(state)
          }
        })
      })
      .catch(err=> {
        throw new Error('请求失败🎈')
      })
  })
}

function decode ( str ) {
  const ignore = [ '.', 'w', '4']
  let arr = str.split(''),
      result = [],
      trans = false
  arr.map(( item, index )=>{
    ignore.map(code=> {
      if (item == ignore[1]) trans = true
      if (item == code) result.push(code)
    })
    digitCode.map((code,codeIndex)=> {
      if (item === code) result.push(codeIndex)
    })
  })
  total = result.join('')
  if (trans) {
    let cp = total.split(ignore[1])[0]
    return cp * 10000
  }
  return total
}

// console.log(decode('믊믊.ꯍw'))

if (require.main == module) {
  let args = process.argv,
      flag = /^[A-Za-z0-9]+$/.test(args[2])
  if (args[2] == '--debug') {
    return init().then(r=> {
      console.log(r)
    })
  }
  if (flag) {
    throw new Error('参数错误')
  }
  const [...arr] = args.slice(2)
  arr.forEach(item=> {
    const format = decode(item)
    console.log(`${item}: ${format}`)
  })
}