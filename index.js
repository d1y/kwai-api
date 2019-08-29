#!/usr/bin/env node

'use strict';

/*
 ** create by @d1y
 ** date: 2019-08-27
 ** doc here: `README.md`
 */

const axios = require('axios')
const cheerio = require('cheerio')
const pack = require('./package.json')
const fontCode = require('./lib/decode_font')
const randomAgent = require('./lib/userAgent')

class Kwai {
  _api = {
    _webUserProfile: id => `https://live.kuaishou.com/profile/${id}`,
    _webWork: (user, id) => `https://live.kuaishou.com/u/${user}/${id}`,
    _mWebWork: id => `http://m.gifshow.com/fw/photo/${id}`
  }

  _headers = {
    'user-agent': randomAgent(),
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  }

  request = axios.create({
    timeout: 60000,
    headers: this._headers
  })

  async getUserInfo(ctx = { id: 'harddancemusic', decode: true }) {
    /*
    ** @tips { 获取该用户信息 }
    ** @param {id} - string
    ** @param {decode} - bool // 传递的`id`是否是一个乱码
    */
    const { id, decode } = ctx
    return new Promise((rcv,rjt)=> {
      this.request.get(this._api._webUserProfile(id))
        .then(r => {
          const tmpData = r.data
          console.log(tmpData)
          if (tmpData.includes(`体验快手直播网站完整功能，请使用Chrome浏览器`)) {
            return rjt(`请求失败,可能是请求过多`)
          }
          const $ = cheerio.load(r.data)
          const _ctx_NickName = $('.user-info-name').text()
          const _ctx_Sex = $('.user-info-name .user-info-sex')[0].attribs.class
          const _ctx_Info = $('.user-info-other span')
    
          let ID = id,
            star, city, fans, follow, work
          const fishly = num => {
            const data = _ctx_Info[num].children[0].data.trim()
            return data
          }
          ID = fishly(0);
          star = fishly(1);
          ;(() => {
            const len = _ctx_Info.length
            if (len >= 3) city = _ctx_Info[2].children[0].data
          })()
          const description = $('.user-info-description').text()
    
          const fansText = $('.user-data-item.fans').text()
          const followText = $('.user-data-item.follow').text()
          const workText = $('.user-data-item.work').text()
          fans = fontCode.decode(fansText)
          follow = fontCode.decode(followText)
          work = fontCode.decode(workText)
          const userSex = _ctx_Sex.includes('female') ? 'female' : 'male'
          const nickName = _ctx_NickName.slice(0, _ctx_NickName.indexOf('举报')).trim()
          rcv({
            userSex,
            nickName,
            id,
            star,
            city,
            description,
            fans,
            follow,
            work
          })
        })
        .catch(err=> {
          console.error(`请求失败,可能是请求过多`)
          rjt(err)
        })
    })
  }

  getUserWorks() {
    /*
     ** @tips { 获取用户作品 }
     */
  }

  getPhoto() {
    /*
     ** @tips { 获取作品的信息 }
     ** share by phone: http://m.gifshow.com/s/sY1dktSN
     */
    const url = `http://m.gifshow.com/fw/photo/3xfe786f5ucbbc6`
    this.request.get(url, {
      headers: {
        userAgent: `MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
      }
    }).then(r=> {
      const fs = require('fs')
      fs.writeFileSync('index.html',r.data)
    })
  }

  getRecommendAfter() {
    /*
     ** @tips { 获取推荐视频 }
     */
  }

  static format() {
    return 'fs'
  }

  static version = pack.version
}

const API = new Kwai()

// const TEST = {
//   id: `longjunzhu815` || `YJ3188482088`
// }

// API.getUserInfo(TEST)
//   .then(r=> {
//     console.log(r)
//   })
//   .catch(err=> {
//     throw new Error(err)
//   })

API.getPhoto()