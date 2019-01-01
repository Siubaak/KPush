const request = require('superagent')
const cheerio = require('cheerio')

module.exports = {
  /**
   * 获取mobi电子书搜索列表
   * 
   * @param {string} query - 查询关键词
   * @return {array} - 返回list数组
   * 
   * list数组元素为mobi对象，包含3个字段，均为string
   * mobi.id - mobi电子书唯一索引，用于查询源下载用url
   * mobi.img - mobi电子书封面图url
   * mobi.desc - mobi电子书描述（标题、简介等）
   */
  async getList(query) {
    const res = await request.get('http://www.pdfbook.cn').query({ s: query })
    const $ = cheerio.load(res.text)
    const $li = $('#main .image_box li')
    const $as = $li.find('strong a')
    const $imgs = $li.find('img')
    const list = []
    for(let i = 0; i < $li.length; i++) {
      list.push({
        id: $as.eq(i).attr('href'),
        img: $imgs.eq(i).attr('src'),
        desc: $as.eq(i).attr('title')
      })
    }
    return list
  },
  /**
    * 获取mobi电子书下载链接
    * 
    * @param {string} id - mobi电子书索引
    * @return {array} - 返回源中mobi电子书下载链接数组
    */
  async getUrls(id) {
    const res = await request.get(id)
    const $ = cheerio.load(res.text)
    const $links = $('#main .post a')
    const list = []
    const listMap = {}
    for(let i = 0; i < $links.length; i++) {
      const url = $links.eq(i).attr('href')
      if (!listMap[url]) {
        list.push({ url, desc: $links.eq(i).text() })
        listMap[url] = true
      }
    }
    return list
  }
}