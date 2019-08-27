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

class Kwai {
  _api = {
    _webUserProfile: id=> `https://live.kuaishou.com/profile/${id}`,
    _webWork: ( user, id ) => `https://live.kuaishou.com/u/${ user }/${ id }`,
    _mWebWork: id => `http://m.gifshow.com/fw/photo/${ id }`
  }

  _headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  }

  request = axios.create({
    timeout: 1000,
    headers: this._headers
  })

  async getUserInfo(ctx={ id: 'harddancemusic', decode: true }) {
    /*
    ** @tips { 获取该用户信息 }
    ** @param {id} - string
    ** @param {decode} - bool // 传递的`id`是否是一个乱码
    */
    const { id, decode } = ctx
    this.request.get(this._api._webUserProfile(id))
      .then(r=> {
        const result = {} 
        const $ = cheerio.load(r.data)
        const _ctx_NickName = $('.user-info-name').text()
        const _ctx_Sex = $('.user-info-name .user-info-sex')[0].attribs.class
        const _ctx_Star = $('')

        const userSex = _ctx_Sex.includes('female') ? 'female' : 'male'
        const nickName = _ctx_NickName.slice(0,_ctx_NickName.indexOf('举报')).trim()      
        console.log('性别: ', userSex, '昵称: ', nickName)
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
    */
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

const TEST = {id: `longjunzhu815`}

console.log(API.getUserInfo( ))