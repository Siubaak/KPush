const request = require('superagent')
const cheerio = require('cheerio')

module.exports = {
  /**
   * 获取mobi电子书搜索列表
   * 
   * @param {string} q - 查询关键词
   * @return {array} - 返回list数组
   * 
   * list数组元素为mobi对象，包含3个字段，均为string
   * mobi.id - mobi电子书唯一索引，用于查询源下载用url
   * mobi.img - mobi电子书封面图url
   * mobi.ctx - mobi电子书简介
   */
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
  /**
    * 获取mobi电子书下载链接
    * 
    * @param {string} i - mobi电子书索引
    * @return {string} - 返回源中mobi电子书下载链接
    */
  async getUrl (i) {
    const res = await request.get('http://www.zoudupai.com/note/' + i)
    const $ = cheerio.load(res.text)
    return 'http://www.zoudupai.com' + $('.shw_body').children()[5].attribs.onclick.split("'")[1]
  }
}