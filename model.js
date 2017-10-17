const fs = require('fs')
const request = require('superagent')
const cheerio = require('cheerio')

module.exports = {
  async getList (q) {
    const res = await request.get('http://www.zoudupai.com/book/share').query({ kw: q })
    const $ = cheerio.load(res.text)
    const notes = $('#searchresultlist').find('.imBoard')
    const pics = $('#searchresultlist').find('.picUrl')
    const ctxs = $('#searchresultlist').find('.contentsms')
    let list = []
    for(let i = 0; i < notes.length; i++) {
      list.push({
        id: notes[i].attribs.dataid,
        img: 'http://www.zoudupai.com' + pics[i].attribs.src,
        ctx: ctxs[i].children[0].data
      })
    }
    return list
  },
  async getUrl (i) {
    const res = await request.get('http://www.zoudupai.com/note/' + i)
    const $ = cheerio.load(res.text)
    return 'http://www.zoudupai.com' + $('.shw_body').children()[5].attribs.onclick.split("'")[1]
  }
}