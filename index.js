'use strict';

/*
** create by @d1y
** date: 2019-08-27
** doc here: `README.md`
*/

const axios = require('axios')
const cheerio = require('cheerio')
const pack = require('./package.json')

class Kwai {
  _api = {
    _webUserProfile: id=> `https://live.kuaishou.com/profile/${id}`,
    _webWork: ( user, id ) => `https://live.kuaishou.com/u/${ user }/${ id }`,
    _mWebWork: id => `http://m.gifshow.com/fw/photo/${ id }`
  }

  _headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  }

  async getUserInfo(ctx={ id: 'harddancemusic', decode: true }) {
    /*
    ** @tips { 获取该用户信息 }
    ** @param {id} - string
    ** @param {decode} - bool
    */
   
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

console.log(API)